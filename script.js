document.addEventListener("DOMContentLoaded", function () {
    fetchDiseaseData();
    fetchDiseaseImage();
    // logVisitor(); // Log visitor details when page loads

    // Auto-refresh data every 1 second
    setInterval(() => {
        fetchDiseaseData();
        fetchDiseaseImage();
    }, 100);
});
const API_BASE_URL = "https://1b7a-2409-4081-ab09-7325-cb28-515-1b4-bc0e.ngrok-free.app"; // Update this

// Function to fetch disease data from API
async function fetchDiseaseData() {
    try {
        const response = await fetch(`${API_BASE_URL}/get_disease_data`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; MyCustomAgent/1.0)",
                "ngrok-skip-browser-warning": "true"
            }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Received Data:", data);
        
        const diseaseParts = data.disease.split("___");
        document.getElementById("plant-name").textContent = diseaseParts[0] || "Unknown Plant";
        document.getElementById("disease-name").textContent = diseaseParts[1] || "No disease detected";
        document.getElementById("confidence").textContent = data.confidence
            ? `Confidence: ${(data.confidence * 100).toFixed(2)}%`
            : "-";
    } catch (error) {
        console.error("Error fetching disease data:", error);
    }
}



// Function to fetch the latest detected disease image
async function fetchDiseaseImage() {
    try {
        const response = await fetch(`${API_BASE_URL}/latest_image?` + new Date().getTime(), {
            cache: "no-store",
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const blob = await response.blob(); // Convert response to a Blob object
        const imgUrl = URL.createObjectURL(blob); // Create an object URL for the image

        const imgElement = document.getElementById("prediction-frame");
        imgElement.src = imgUrl; // Set the image source
    } catch (error) {
        console.error("Error fetching disease image:", error);
    }
}
