from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained model
model = load_model("model.h5")
labels = ["cat", "dog"]

# Preprocess the image
def preprocess_image(image):
    image = image.resize((150, 150))
    image = np.array(image)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# Handle the image upload and prediction
@app.post("/predict")
async def predict(image: UploadFile):
    try:
        content = await image.read()
        img = Image.open(io.BytesIO(content))
        img = img.convert("RGB")
        img = preprocess_image(img)

        # Make the prediction
        prediction = model.predict(img)
        #predicted_class = np.argmax(prediction, axis=1)[0]
        

        if (prediction[0] < 0.5):
            predicted_class = 'cats'
        else:
            predicted_class = 'dog'

        #predicted_label = labels[predicted_class]


        return {"prediction": predicted_class}

    except Exception as e:
        return {"error": str(e)}

# Start the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000)
