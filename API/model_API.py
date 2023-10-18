from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
import base64
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
import math

app = FastAPI()

class ReceiveImage(BaseModel):
    image:str


@app.get('/')
async def model_endpoint():
    return {"Hi there": "You reached the endpoint!"}

@app.post('/')
async def predit_depression(item:ReceiveImage):
    image = preprocess_image(item.image)
    model = tf.keras.models.load_model("model.tf")
    all_prediction = model.predict(np.array([image]))
    prediction = all_prediction[0]
    print(prediction)
    print(type(prediction))
    print("")
    print("The probability of depression is:")

    if prediction[0]< 0.01:
        print("<0.01")
        return {"prediction":"<0.01"}
    else:
        print(prediction[0])
        result = math.floor(prediction[0] * 100) / 100
        return {"prediction":str(result)}
    

def preprocess_image(encoded_image):
    
    # Load the face detection algorithm
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Decode the base64-encoded image data
    decoded_image_data = base64.b64decode(encoded_image)
    # Load the image from the decoded data
    image = Image.open(BytesIO(decoded_image_data))
    # Convert the image to a numpy array
    img_array = np.array(image)
    
    # convert numpy array to PIL image
    image = Image.fromarray(img_array)

    # convert image to grayscale
    grayscale_image = image.convert('L')

    # convert grayscale image back to numpy array
    gray_image = np.array(grayscale_image)
    
    # Detect the faces in the image
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.3, minNeighbors=5)
    # Crop and replace the faces
    if len(faces) > 0:
        (x, y, w, h) = faces[0]
        cropped_image = gray_image[y:y+h, x:x+w]
        resized_image = cv2.resize(cropped_image, (100, 100))
    # If no face is detected, grayscale and resize the image
    else:
        resized_image = cv2.resize(gray_image, (100, 100))

    normalized_image = resized_image / 255.0    
    final_image = np.expand_dims(normalized_image, axis=-1)

    return final_image