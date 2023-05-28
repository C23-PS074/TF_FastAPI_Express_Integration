const express = require("express");
const multer = require("multer");
const tf = require("@tensorflow/tfjs-node");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

const cors = require("cors");
app.use(cors());



// Load the pre-trained model from an h5 file
async function loadModel() {
  const modelPath = path.resolve("./dummy_model_cats_vs_dogs/v1/model.json");
  const model = await tf.loadLayersModel(`file://${modelPath}`);
  console.log("Model loaded");
  return model;
}

// Preprocess the image to (244, 244) dimensions
async function preprocessImage(imagePath) {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(150, 150);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, 150, 150);
  const input = tf.browser.fromPixels(canvas).toFloat();
  const normalized = input.div(tf.scalar(255));
  const preprocessed = normalized.expandDims();
  return preprocessed;
}

// Handle the image upload and prediction
// Handle the image upload and prediction
app.post("/predict", upload.single("image"), async (req, res) => {
  try {
    const { path: imagePath } = req.file;

    // Load the model
    const model = await loadModel();

    // Preprocess the image
    const preprocessedImage = await preprocessImage(imagePath);

    // Make the prediction
    const prediction = model.predict(preprocessedImage);

    // Get the predicted class (0 for cat, 1 for dog)
    const predictedClass = tf.argMax(prediction, 1).dataSync()[0];

    // Define the class labels
    const labels = ["cat", "dog"];

    // Return the image and its prediction
    const result = {
      image: req.file,
      prediction: labels[predictedClass],
      p: prediction,
      pred: predictedClass,
    };

    res.json(result);
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "An error occurred during prediction." });
  }
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});