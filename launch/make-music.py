import json
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 48000
DUR = 85.36
N = int(SR * DUR)
rng = np.random.default_rng(19)
timeline = json.loads(open('launch/edit/timeline.json').read())
starts = {item['name']: item['start'] for item in timeline['starts']}


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def adsr(n, attack, release, curve=1.6):
    env = np.ones(n)
    a = min(n, int(attack * SR))
    r = min(n, int(release * SR))
    if a:
        env[:a] = np.linspace(0, 1, a) ** curve
    if r:
        env[-r:] *= np.linspace(1, 0, r) ** curve
    return env


def lowpass(x, cutoff, order=2):
    sos = signal.butter(order, cutoff / (SR / 2), btype='low', output='sos')
    return signal.sosfilt(sos, x)


def highpass(x, cutoff, order=2):
    sos = signal.butter(order, cutoff / (SR / 2), btype='high', output='sos')
    return signal.sosfilt(sos, x)


def bandpass(x, low, high, order=2):
    sos = signal.butter(order, [low / (SR / 2), high / (SR / 2)], btype='band', output='sos')
    return signal.sosfilt(sos, x)


def pan_gains(p):
    return np.sqrt((1 - p) / 2), np.sqrt((1 + p) / 2)


def add_at(bus, start, sig):
    i = max(0, int(round(start * SR)))
    j = min(len(bus), i + len(sig))
    if j > i:
        bus[i:j] += sig[:j - i]


# ---------------------------------------------------------------- harmony
chords = [
    ('Am9', 33, [57, 60, 64, 67, 71]),
    ('Fmaj9', 29, [53, 57, 60, 64, 67]),
    ('Cmaj9', 36, [60, 64, 67, 71, 74]),
    ('G6/9', 31, [55, 59, 62, 64, 69]),
]
segments = []
for i, start in enumerate(np.arange(0, 78.76, 6.0)):
    name, root, notes = chords[i % 4]
    segments.append((float(start), 6.0, root, notes, name))
segments.append((78.76, 6.60, 36, [60, 64, 67, 71, 74], 'Cmaj9'))

# A slow sidechain envelope that breathes with the soft pulse.
duck = np.ones(N)

# ---------------------------------------------------------------- pad
pad = np.zeros((N, 2))
for start, dur, root, notes, name in segments:
    length = dur + 3.2
    t = np.arange(int(length * SR)) / SR
    env = adsr(len(t), 1.7, 3.0)
    for j, note in enumerate(notes):
        f = midi(note)
        vib = 1 + 0.0018 * np.sin(2 * np.pi * (0.13 + j * 0.017) * t + j)
        osc = (
            np.sin(2 * np.pi * f * vib * t + rng.uniform(0, 6.28))
            + 0.30 * np.sin(2 * np.pi * 2 * f * vib * t + rng.uniform(0, 6.28))
            + 0.10 * np.sin(2 * np.pi * 3 * f * vib * t + rng.uniform(0, 6.28))
        )
        detune = np.sin(2 * np.pi * f * 1.0015 * t + rng.uniform(0, 6.28))
        sig = (osc + 0.35 * detune) * env
        p = [-0.48, 0.34, -0.12, 0.46, 0.08][j % 5]
        gl, gr = pan_gains(p)
        add_at(pad[:, 0], start, sig * gl)
        add_at(pad[:, 1], start, sig * gr)
pad[:, 0] = lowpass(pad[:, 0], 1650)
pad[:, 1] = lowpass(pad[:, 1], 1650)
pad /= max(1e-9, np.max(np.abs(pad))) / 0.75

# ---------------------------------------------------------------- bass
bass = np.zeros((N, 2))
for start, dur, root, notes, name in segments:
    length = dur + 1.8
    t = np.arange(int(length * SR)) / SR
    f = midi(root)
    env = adsr(len(t), 0.5, 1.7)
    lfo = 1 + 0.06 * np.sin(2 * np.pi * 0.22 * t)
    sig = (np.sin(2 * np.pi * f * t) + 0.28 * np.sin(2 * np.pi * 2 * f * t) + 0.08 * np.sin(2 * np.pi * 3 * f * t)) * env * lfo
    sig = np.tanh(sig * 1.4) * 0.8
    add_at(bass[:, 0], start, sig)
    add_at(bass[:, 1], start, sig)
bass[:, 0] = lowpass(bass[:, 0], 180)
bass[:, 1] = lowpass(bass[:, 1], 180)
bass /= max(1e-9, np.max(np.abs(bass))) / 0.55

# ---------------------------------------------------------------- pluck
pluck = np.zeros((N, 2))
pattern = [0, 2, 4, 1, 3, 2, 4, 1, 0, 3, 2, 4, 1, 2, 4, 3]
step = 60 / 80 / 2  # eighth note at 80 bpm
pluck_start, pluck_end = 5.0, 83.4
for seg_start, dur, root, notes, name in segments:
    if seg_start >= pluck_end:
        continue
    high = [n + 12 for n in notes]
    for k in range(16):
        t0 = seg_start + k * step
        if t0 < pluck_start or t0 >= pluck_end:
            continue
        if k in (7, 15):
            continue
        note = high[pattern[k] % len(high)]
        f = midi(note) * (1 + rng.uniform(-0.0007, 0.0007))
        length = 0.85
        t = np.arange(int(length * SR)) / SR
        amp = np.exp(-t / 0.24) * (1 - np.exp(-t / 0.004))
        sig = (np.sin(2 * np.pi * f * t) + 0.20 * np.sin(2 * np.pi * 2 * f * t) + 0.05 * np.sin(2 * np.pi * 3 * f * t)) * amp
        sig *= rng.uniform(0.72, 1.0)
        p = rng.uniform(-0.34, 0.34)
        gl, gr = pan_gains(p)
        add_at(pluck[:, 0], t0 + rng.uniform(-0.006, 0.006), sig * gl)
        add_at(pluck[:, 1], t0 + rng.uniform(-0.006, 0.006), sig * gr)

pluck[:, 0] = lowpass(pluck[:, 0], 4300)
pluck[:, 1] = lowpass(pluck[:, 1], 4300)

# A soft ping-pong delay for the plucks.
delay = np.zeros_like(pluck)
d1 = int(0.375 * SR)
d2 = int(0.75 * SR)
delay[d1:, 1] += pluck[:-d1, 0] * 0.26
delay[d1:, 0] += pluck[:-d1, 1] * 0.19
delay[d2:, 0] += pluck[:-d2, 0] * 0.11
delay[d2:, 1] += pluck[:-d2, 1] * 0.08
delay[:, 0] = lowpass(delay[:, 0], 3000)
delay[:, 1] = lowpass(delay[:, 1], 3000)

# Level automation for the arpeggio.
def gain_curve(points):
    xs = np.array([p[0] for p in points], dtype=float)
    ys = np.array([p[1] for p in points], dtype=float)
    return np.interp(np.arange(N) / SR, xs, ys)

pluck_gain = gain_curve([
    (0, 0), (4.9, 0), (5.0, 0.55), (15.0, 0.62), (22.0, 0.78),
    (43.4, 0.92), (52.9, 0.52), (59.5, 0.38), (66.0, 0.22),
    (72.7, 0.80), (78.7, 0.55), (83.0, 0.25), (85.36, 0),
])
pluck *= pluck_gain[:, None] * 0.72
delay *= pluck_gain[:, None] * 0.72

# ---------------------------------------------------------------- kick
kick = np.zeros((N, 2))
kick_gain = gain_curve([
    (0, 0), (4.9, 0), (5.0, 0.45), (15.0, 0.58), (22.0, 0.88),
    (43.4, 1.0), (52.9, 0.0), (72.7, 0.0), (72.76, 0.62),
    (78.7, 0.32), (79.5, 0.0), (85.36, 0),
])
kick_times = []
t0 = 5.0
while t0 < 52.9:
    kick_times.append(t0)
    t0 += 0.75
t0 = 72.76
while t0 < 78.7:
    kick_times.append(t0)
    t0 += 0.75

for hit in kick_times:
    if kick_gain[min(N - 1, int(hit * SR))] <= 0.001:
        continue
    length = 0.55
    t = np.arange(int(length * SR)) / SR
    f = 84 * np.exp(-t / 0.045) + 41
    phase = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(phase) * np.exp(-t / 0.17)
    click = bandpass(rng.normal(0, 1, len(t)), 900, 5200) * np.exp(-t / 0.006) * 0.18
    sig = (body + click) * kick_gain[min(N - 1, int(hit * SR))]
    add_at(kick[:, 0], hit, sig)
    add_at(kick[:, 1], hit, sig)
    # Duck the pad and bass around each hit.
    length = 0.85
    td = np.arange(int(length * SR)) / SR
    amount = 0.20 * np.exp(-td / 0.24)
    i = int(hit * SR)
    j = min(N, i + len(amount))
    duck[i:j] *= (1 - amount[:j - i])

kick[:, 0] = lowpass(kick[:, 0], 190)
kick[:, 1] = lowpass(kick[:, 1], 190)
kick /= max(1e-9, np.max(np.abs(kick))) / 0.75
pad *= duck[:, None]
bass *= duck[:, None]

# ---------------------------------------------------------------- shaker
shaker = np.zeros((N, 2))
shaker_gain = gain_curve([
    (0, 0), (15.0, 0), (15.1, 0.45), (22.0, 0.7), (43.4, 0.9),
    (52.9, 0.28), (59.5, 0.12), (66.0, 0), (72.7, 0), (72.76, 0.55),
    (78.7, 0.2), (79.4, 0), (85.36, 0),
])
shaker_times = []
t0 = 15.1
while t0 < 52.9:
    shaker_times.append(t0 + 0.1875)
    t0 += 0.375
t0 = 72.76
while t0 < 78.6:
    shaker_times.append(t0 + 0.1875)
    t0 += 0.375

for hit in shaker_times:
    g = shaker_gain[min(N - 1, int(hit * SR))]
    if g <= 0.001:
        continue
    length = 0.13
    t = np.arange(int(length * SR)) / SR
    sig = rng.normal(0, 1, len(t)) * np.exp(-t / 0.026)
    sig = bandpass(sig, 4200, 10500) * g * rng.uniform(0.7, 1.0) * 0.16
    p = 0.28 if rng.random() > 0.5 else -0.28
    gl, gr = pan_gains(p)
    add_at(shaker[:, 0], hit, sig * gl)
    add_at(shaker[:, 1], hit, sig * gr)

# ---------------------------------------------------------------- chimes
chimes = np.zeros((N, 2))
chime_points = [
    (0.30, [81, 88]),
    (5.00, [72, 79, 84]),
    (15.10, [76, 83]),
    (22.00, [72, 79]),
    (43.46, [74, 81, 86]),
    (52.90, [72, 79, 84]),
    (66.00, [67, 74]),
    (72.76, [69, 76, 81]),
    (78.76, [72, 79, 84, 88]),
]
for when, notes in chime_points:
    for k, note in enumerate(notes):
        f = midi(note)
        length = 2.6
        t = np.arange(int(length * SR)) / SR
        amp = np.exp(-t / 0.9) * (1 - np.exp(-t / 0.006))
        sig = (np.sin(2 * np.pi * f * t) + 0.22 * np.sin(2 * np.pi * 2 * f * t)) * amp
        p = [-0.5, 0.4, -0.15, 0.5][k % 4]
        gl, gr = pan_gains(p)
        sig *= 0.055
        add_at(chimes[:, 0], when + k * 0.035, sig * gl)
        add_at(chimes[:, 1], when + k * 0.035, sig * gr)

# ---------------------------------------------------------------- risers + impacts
fx = np.zeros((N, 2))

def add_riser(at, length=2.2, gain=0.055):
    t = np.arange(int(length * SR)) / SR
    env = (t / length) ** 2.4
    noise = rng.normal(0, 1, len(t))
    noise = bandpass(noise, 500, 5200) * env * gain
    sweep = np.sin(2 * np.pi * (170 * t + (820 / (2 * length)) * t ** 2)) * env * gain * 0.55
    p = -0.15
    gl, gr = pan_gains(p)
    add_at(fx[:, 0], at - length, (noise + sweep) * gl)
    add_at(fx[:, 1], at - length, (noise + sweep) * gr)


def add_impact(at, gain=0.16):
    t = np.arange(int(0.9 * SR)) / SR
    f = 64 * np.exp(-t / 0.11) + 33
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.34)
    dust = lowpass(rng.normal(0, 1, len(t)), 500) * np.exp(-t / 0.12) * 0.35
    sig = (boom + dust) * gain
    add_at(fx[:, 0], at, sig)
    add_at(fx[:, 1], at, sig)


for when, gain in [(5.0, 0.13), (15.1, 0.08), (22.0, 0.13), (43.46, 0.19), (52.9, 0.12), (72.76, 0.13), (78.76, 0.17)]:
    add_riser(when, gain=gain * 0.38)
    add_impact(when, gain=gain)
add_impact(0.28, 0.10)
add_riser(66.0, length=1.8, gain=0.018)
add_impact(66.0, 0.06)

# ---------------------------------------------------------------- reverb
def make_ir(seconds=2.2):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = np.zeros((n, 2))
    for ch in range(2):
        noise = rng.normal(0, 1, n)
        ir[:, ch] = noise * np.exp(-t / 0.52)
        for delay, gain in [(0.011, 0.5), (0.019, 0.4), (0.031, 0.32), (0.047, 0.24), (0.071, 0.18)]:
            i = int((delay + ch * 0.003) * SR)
            if i < n:
                ir[i, ch] += gain
        ir[:, ch] = lowpass(ir[:, ch], 5200)
    ir /= np.sqrt(np.sum(ir ** 2) / 2)
    return ir * 0.9

ir = make_ir()
wet = pad * 0.28 + pluck * 0.18 + delay * 0.22 + chimes * 0.9 + fx * 0.22
reverb = np.zeros((N, 2))
for ch in range(2):
    conv = signal.fftconvolve(wet[:, ch], ir[:, ch], mode='full')[:N]
    reverb[:, ch] = conv

# ---------------------------------------------------------------- mix
mix = (
    pad * 0.62
    + bass * 0.50
    + pluck * 0.34
    + delay * 0.20
    + kick * 0.43
    + shaker * 0.52
    + chimes * 0.80
    + fx * 0.75
    + reverb * 0.17
)

# Gentle bus shaping.
for ch in range(2):
    mix[:, ch] = highpass(mix[:, ch], 27)
    mix[:, ch] = lowpass(mix[:, ch], 15500)
mix = np.tanh(mix * 1.25) / 1.25

# Fade in and out.
fade_in = int(1.0 * SR)
mix[:fade_in] *= np.linspace(0, 1, fade_in)[:, None] ** 1.5
fade_out_start = int(82.2 * SR)
fade_len = N - fade_out_start
mix[fade_out_start:] *= np.linspace(1, 0, fade_len)[:, None] ** 2.2

# Normalise and write.
mix /= max(1e-9, np.max(np.abs(mix))) / 0.87
wavfile.write('launch/edit/music.wav', SR, (mix * 32767).astype(np.int16))
print('wrote launch/edit/music.wav', mix.shape, 'peak', float(np.max(np.abs(mix))))
