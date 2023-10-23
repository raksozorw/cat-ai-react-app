# Overview

This app is built to upload images and send a webcam stream (WIP) to my [cat-ai](https://github.com/raksozorw/cat-ai) API. The API uses a model I've trained to differentiate between images of my two cats, Jarlsberg and Kvarg.

# To Run:

### Setup

Make sure you have node and npm installed and run `npm i` to install dependencies.

### Preview

To run a preview, just run `npm run dev`.

Before uploading images, ensure the [backend](https://github.com/raksozorw/cat-ai) is running on port 80 (recommended), or set Fargate public IP as the `apiUrl` in `useUpload`.

### Test

Unit testing is done with Jest + React Testing Library, simply run `npm run test`

### Deploy

Builds are done automatically by AWS Amplify when changes are made to `main`.

# Selecting an endpoint

If you are running locally, you should be running the backend locally as well, and adjust the endpoint to `http://localhost:80/predict` in the `useUpload` custom hook. If a fargate task is running, you can also connect to that, but the IP is dynamic. A persistent Cloudfront URL is WIP.
