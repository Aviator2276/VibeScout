import os
import math
import ffmpeg
import pytesseract
from PIL import Image, ImageOps
import re

# ffmpeg, ffprobe, & tesseract is required.

# Use ratios to work with different video resolutions

#TODO: remove cropping when caleb pushes new vid code
redX = 640
redY = 970
redW = 180
redH = 100

blueX = 1100
blueY = 970
blueW = 180
blueH = 100

root_path = os.path.dirname(os.path.abspath(__file__))
matches_path = root_path + "/matches/"

def crop_video(filename):
    file = matches_path + filename
    probe = ffmpeg.probe(file)
    video_info = next((stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
    width = int(video_info['width'])
    height = int(video_info['height'])

    os.makedirs(root_path+'/'+filename.rsplit('.',1)[0]+'/'+'blue/', exist_ok=True)
    os.makedirs(root_path+'/'+filename.rsplit('.',1)[0]+'/'+'red/', exist_ok=True)

    contrast = 255 #all values either 255 or 0
    fps = 15 
    sat = 0 #remove color
    fmat = 'image2'
    pix_fmt = 'gray'
    out = [None,None]
    out[0], err = (
        ffmpeg
        .input(file)
        .crop(redX, redY, redW, redH)
        .filter('fps', fps=15)
        .filter('eq', **{'contrast': 255})
        .filter('hue', s=0)
        #.output('pipe:', format='image2pipe', pix_fmt='rgb0')
        #.run(capture_stdout=True)
        .output(root_path+'/'+filename.rsplit('.',1)[0]+'/red/%03d.jpg', format=fmat, pix_fmt=pix_fmt)
        .run()
    )
    out[1], err = (
        ffmpeg
        .input(file)
        .crop(blueX, blueY, blueW, blueH)
        .filter('fps', fps=15)
        .filter('eq', **{'contrast': 255})
        .filter('hue', s=0)
        #.output('pipe:', format='image2pipe', pix_fmt='rgb0')
        #.run(capture_stdout=True)
        .output(root_path+'/'+filename.rsplit('.',1)[0]+'/blue/%03d.jpg', format=fmat, pix_fmt=pix_fmt)
        .run()
    )
    return out #output isnt used lol

for file in os.listdir(matches_path):
    if not file.endswith('.m4v'):
        continue
    result = crop_video(file) 
    intlist = {'red':[],'blue':[]}
    for image_file in os.listdir(root_path+'/'+file.rsplit('.',1)[0]+'/red'):
        #OCR on red phoe toes
        image = Image.open(root_path+'/'+file.rsplit('.',1)[0]+'/red/'+image_file)
        text = pytesseract.image_to_string(image,lang='eng' ,config=r'--oem 3 --psm 8 -c tessedit_char_whitelist= 0123456789')
        intlist['red'].append(re.sub(r'\D', "", text))        

    for image_file in os.listdir(root_path+'/'+file.rsplit('.',1)[0]+'/blue'):
        #OCR on blue phoe toes
        image = Image.open(root_path+'/'+file.rsplit('.',1)[0]+'/blue/'+image_file)
        text = pytesseract.image_to_string(image,lang='eng' ,config=r'--oem 3 --psm 8 -c tessedit_char_whitelist= 0123456789')
        intlist['blue'].append(re.sub(r'\D', "", text))

