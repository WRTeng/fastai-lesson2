# Cat/Dog Classifier Web Interface

A web interface for a cat/dog image classifier built with FastAI and Gradio.

## Live Demo

Visit the [GitHub Pages site](https://[your-username].github.io/[repo-name]) to try the classifier.

## Local Development

1. Start the Gradio server:
   ```bash
   jupyter notebook notebooks/server.ipynb
   ```
   Run all cells in the notebook to start the server.

2. Open `ui/index.html` in your web browser to use the interface locally.

## Project Structure

- `notebooks/`: Contains Jupyter notebooks for training and serving the model
- `ui/`: Contains the web interface files
  - `index.html`: Main interface
  - `app.js`: JavaScript code for handling predictions

## Note

The Gradio server URL in `app.js` needs to be updated whenever you restart the server. The new URL can be found in the notebook output after running the server.
