import os
import ffmpeg
import pytesseract

root_path = os.path.dirname(os.path.abspath(__file__))
matches_path = root_path + "/matches/"

def thumbnail(filename):
    file = matches_path + filename
    os.makedirs(root_path+'/thumb', exist_ok=True)
    out, err = (
        ffmpeg
        .input(file)
        .output(root_path+'/thumb/%03d.jpg', format='image2', pix_fmt='rgb0')
        .run()
    )
    return out

for file in os.listdir(matches_path):
    if not file.endswith('.m4v'):
        continue
    thumbnail(file)