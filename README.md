# TF_FastAPI_Express_Integration

Description: <br>
In this repository I tried to practice how to **deploy machine learning model**.

There are two possible way that I have tried, that is deploy it in express.js using tensorflow.js or deploy it natively using FastAPI.

In this model I was using cat vs dogs dataset and model (we can replace it later with fracture dataset). I tried using fracture dataset and model but there is incompatibility between BatchNormalization() layer in python tensorflow vs tensorflow.js.

Between FastAPI - Vue-Project //Running Fine <br>
Between Express - Vue-Project //There are still error, that is express.js always return 'cats' even if the model is correct when I tried it in python.

# How to replicate

## Clone Project
```
git clone https://github.com/C23-PS074/TF_FastAPI_Express_Integration.git
chdir TF_FastAPI_Express_Integration
```

## Build & Install

```
chdir vue-project
npm install

chdir ..
chdir express
npm install

note: pastikan sebelum install @tensorflow/tfjs-node visual studio + 'Desktop development with C++' telah terinstall
solusi installnya ada di sini: https://github.com/tensorflow/tfjs/blob/master/tfjs-node/WINDOWS_TROUBLESHOOTING.md
atau kirim pesan error nya di discord juga gak masalah.

pip install fastapi tensorflow tensorflow.keras uvicorn pillow
```

## Running
```
chdir express
node app.js

chdir ..
chdir vue-project
npm run dev

chdir ..
chdir fastapi
python main.py

Notes: when you running express, make sure fastapi is shutdown and when running fastapi make sure express is shutdown.
```
