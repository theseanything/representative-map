import json
import requests
import shutil
import os
import face_recognition
from PIL import Image


def download_image(url, filepath):
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        with open(filepath, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)


with open('./senators.json') as f:
    senator_data = json.load(f)


def crop(x, y, size):
    top, left, bottom, right = (y - size, x - size, y + size, x + size)
    if top < 0:
        bottom += abs(top)
        top = 0
    if bottom > 320:
        top -= bottom - 320
        bottom = 320
    if left < 0:
        right += abs(left)
        left = 0
    if right > 320:
        left -= right - 320
        right = 320
    return (top, left, bottom, right)


for senator in senator_data["senators"]:
    filepath = './headshots/full/{}.jpg'.format(senator["district"])
    cropped_filepath = './headshots/cropped/{}.jpg'.format(senator["district"])
    if not os.path.isfile(filepath):
        print(f"Downloading {filepath}")
        download_image(senator["headshot"], filepath)

    image = face_recognition.load_image_file(filepath)
    face_locations = face_recognition.face_locations(image)

    face_location = face_locations[0]
    top, right, bottom, left = face_location

    x = ((right - left) // 2) + left
    y = ((bottom - top) // 2) + top

    top, left, bottom, right = crop(x, y, 100)

    cropped_img = Image.fromarray(image[top:bottom, left:right])
    cropped_img.save(cropped_filepath, 'jpeg')

    # if image not downloaded
    # download
    # detect face
    # crop
