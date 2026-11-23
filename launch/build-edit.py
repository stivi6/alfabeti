import json
import subprocess
from pathlib import Path

RAW = Path('launch/raw')
EDIT = Path('launch/edit')
EDIT.mkdir(parents=True, exist_ok=True)

clips = [
    ('intro', '00-intro.webm', 0.18, 5.80),
    ('home', '01-home.webm', 4.98, 10.40),
    ('roadmap', '02-roadmap.webm', 3.54, 7.20),
    ('exercise', '03-exercise.webm', 37.62, 21.50),
    ('montage-numbers', '04-montage-numbers.webm', 3.22, 2.60),
    ('montage-colors', '05-montage-colors.webm', 2.26, 2.50),
    ('montage-articles', '06-montage-articles.webm', 2.54, 2.50),
    ('montage-cafe', '07-montage-cafe.webm', 2.30, 2.50),
    ('results', '08-results.webm', 3.62, 7.00),
    ('review', '09-review.webm', 1.90, 6.70),
    ('reset', '10-reset.webm', 24.58, 6.80),
    ('mobile', '11-mobile.webm', 0.14, 6.80),
    ('outro', '12-outro.webm', 0.18, 6.60),
]

transitions = [0.80, 0.30, 0.30, 0.04, 0.12, 0.12, 0.12, 0.30, 0.30, 0.30, 0.04, 0.80]

# Trim and normalise every scene to a clean 1920x1080 / 25 fps intermediate.
for index, (name, filename, start, duration) in enumerate(clips):
    out = EDIT / f'{index:02d}-{name}.mp4'
    if out.exists():
        continue
    cmd = [
        'ffmpeg', '-y', '-loglevel', 'error',
        '-ss', f'{start:.3f}', '-t', f'{duration:.3f}',
        '-i', str(RAW / filename),
        '-vf', 'fps=25,scale=1920:1080:flags=lanczos,format=yuv420p',
        '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14',
        '-movflags', '+faststart', str(out),
    ]
    subprocess.run(cmd, check=True)
    print('trimmed', out.name)

# Build the chained crossfade graph.
inputs = []
for index, (name, _, _, _) in enumerate(clips):
    inputs += ['-i', str(EDIT / f'{index:02d}-{name}.mp4')]

filters = []
for index in range(len(clips)):
    filters.append(f'[{index}:v]setpts=PTS-STARTPTS[v{index}]')

offsets = []
cumulative = 0.0
current = 'v0'
for index, transition in enumerate(transitions):
    cumulative += clips[index][3]
    offset = cumulative - sum(transitions[:index + 1])
    offsets.append(round(offset, 3))
    output = f'x{index + 1}'
    filters.append(
        f'[{current}][v{index + 1}]xfade=transition=fade:duration={transition}:offset={offset:.3f}[{output}]'
    )
    current = output

filter_graph = ';'.join(filters)
cmd = [
    'ffmpeg', '-y', '-loglevel', 'error', *inputs,
    '-filter_complex', filter_graph,
    '-map', f'[{current}]',
    '-r', '25', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    str(EDIT / 'video.mp4'),
]
subprocess.run(cmd, check=True)

starts = []
clock = 0.0
for index, (name, _, _, duration) in enumerate(clips):
    starts.append({'name': name, 'start': round(clock, 3), 'duration': duration})
    if index < len(transitions):
        clock += duration - transitions[index]

total = sum(clip[3] for clip in clips) - sum(transitions)
print(json.dumps({'starts': starts, 'total': round(total, 3), 'offsets': offsets}, indent=2))
(EDIT / 'timeline.json').write_text(json.dumps({'starts': starts, 'total': round(total, 3)}, indent=2))
print('video written', EDIT / 'video.mp4')
