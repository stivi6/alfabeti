import subprocess, sys, json

path = sys.argv[1]
w, h = 48, 27
p = subprocess.run(
    ['ffmpeg', '-v', 'error', '-i', path, '-an', '-vf', f'scale={w}:{h}', '-r', '25', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
    capture_output=True,
)
data = p.stdout
size = w * h * 3
frames = [data[i:i + size] for i in range(0, len(data) - size + 1, size)]
reds = []
for idx, frame in enumerate(frames):
    r = sum(frame[0::3]) / (w * h)
    g = sum(frame[1::3]) / (w * h)
    b = sum(frame[2::3]) / (w * h)
    if r > 170 and g < 80 and b < 100:
        reds.append(idx)
print(json.dumps({
    'file': path,
    'fps': 25,
    'markerStart': round(reds[0] / 25, 3) if reds else None,
    'markerEnd': round((reds[-1] + 1) / 25, 3) if reds else None,
    'redFrames': reds,
    'duration': round(len(frames) / 25, 3),
}))
