// Initialize Gradio client with the correct endpoint
const client = new window.gradio.Client("https://f4b271e3755c527535.gradio.live");

// DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('previewImage');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const predictions = document.getElementById('predictions');

// Handle drag and drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImage(file);
    }
});

// Handle file input
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleImage(file);
    }
});

// Handle image preview and prediction
async function handleImage(file) {
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);

    // Show loading
    loading.classList.add('active');
    results.classList.add('hidden');

    try {
        // Convert file to base64
        const base64 = await fileToBase64(file);
        
        // Make prediction
        const result = await client.predict(base64);
        
        // Display results
        displayResults(result);
    } catch (error) {
        console.error('Error:', error);
        predictions.innerHTML = `
            <div class="p-4 bg-red-100 text-red-700 rounded">
                Error: ${error.message}
            </div>
        `;
    } finally {
        loading.classList.remove('active');
        results.classList.remove('hidden');
    }
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
}

// Display prediction results
function displayResults(result) {
    predictions.innerHTML = '';
    
    // Sort predictions by probability
    const sortedPredictions = Object.entries(result)
        .sort(([,a], [,b]) => b - a);
    
    sortedPredictions.forEach(([label, probability]) => {
        const percentage = (probability * 100).toFixed(1);
        const barWidth = percentage + '%';
        
        predictions.innerHTML += `
            <div class="p-4 bg-gray-50 rounded">
                <div class="flex justify-between mb-1">
                    <span class="font-medium">${label}</span>
                    <span>${percentage}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${barWidth}"></div>
                </div>
            </div>
        `;
    });
} 