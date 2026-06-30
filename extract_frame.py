import cv2
import sys
import shutil

video_path = 'C:/Users/muhammed faris k/.gemini/antigravity-ide/brain/43ec5fbf-a6ef-4286-b9ab-bc7b16705c7e/uploaded_media_1_1782797665473.webm'
output_path = 'c:/colortechniks/public/logo.png'
preloader_path = 'c:/colortechniks/public/preloader-logo.png'

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video")
    sys.exit(1)

# Read the first frame. You might want to grab a later frame if the first one is blank.
# Let's read a few frames just in case.
for i in range(10):
    ret, frame = cap.read()
    if not ret:
        break

if ret:
    # Save frame as PNG
    cv2.imwrite(output_path, frame)
    shutil.copy(output_path, preloader_path)
    print("Successfully saved logos")
else:
    print("Failed to read frame")
cap.release()
