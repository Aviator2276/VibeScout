import os
import math
import ffmpeg
import pytesseract
from PIL import Image, ImageOps
import re

# ffmpeg, ffprobe, & tesseract is required.

# Use ratios to work with different video resolutions
base_x = 640
base_y = 360
ratio_crop_x = 240 / base_x
ratio_crop_y = 40 / base_y
ratio_pos_x = 200 / base_x
ratio_pos_y = 320 / base_y
root_path = os.path.dirname(os.path.abspath(__file__))
matches_path = root_path + "/matches/"

def crop_video(filename):
    file = matches_path + filename
    probe = ffmpeg.probe(file)
    video_info = next((stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
    width = int(video_info['width'])
    height = int(video_info['height'])
    w = math.floor(ratio_crop_x * width)
    h = math.floor(ratio_crop_y * height)
    x = math.floor(ratio_pos_x * width)
    y = math.floor(ratio_pos_y * height)
    os.makedirs(root_path+'/'+filename.rsplit('.',1)[0], exist_ok=True)
    out, err = (
        ffmpeg
        .input(file)
        .crop(x, y, w, h)
        .filter('fps', fps=15)
        #.output('pipe:', format='image2pipe', pix_fmt='rgb0')
        #.run(capture_stdout=True)
        .output(root_path+'/'+filename.rsplit('.',1)[0]+'/%03d.jpg', format='image2', pix_fmt='rgb0')
        .run()
    )
    return out

for file in os.listdir(matches_path):
    if not file.endswith('.m4v'):
        continue
    result = crop_video(file)
    for image_file in os.listdir(root_path+'/'+file.rsplit('.',1)[0]):
        image = Image.open(root_path+'/'+file.rsplit('.',1)[0]+'/'+image_file)
        text = pytesseract.image_to_string(image, config=r'--oem 3 --psm 11 -c tessedit_char_whitelist= :0123456789')
        numbers_int = re.sub(r'[a-z\n]', '', text.lower())
        print(numbers_int)
