# Cat/Dog Classifier Web App

A beautiful web application that uses AI to classify images as either cats or dogs. Built with HTML, JavaScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 📸 Image preview before prediction
- 🤖 AI-powered classification
- 📊 Confidence score display
- 🎯 Real-time predictions

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Start the local server:
```bash
python server.py
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage

1. Click the upload area or drag an image
2. Preview your image
3. Click "Predict" to get the AI's classification
4. View the result with confidence score

## Technical Details

- Uses Gradio's API for predictions
- Serves files through a Python HTTP server with CORS support
- Implements base64 image encoding for API communication

## License

MIT License 