import axios from "axios";

const API_URL = "http://localhost:5000"; // Flask running on this port

export const getPrediction = async (features) => {
  try {
    console.log("Original feature data:", features);

    // Transform to ordered array for backend
    const transformedArray = [];

    for (let i = 1; i <= 12; i++) {
      // Ensure we're sending numeric values (not strings) and handle any NaN values
      const value = parseFloat(features[`feature${i}`]);
      transformedArray.push(isNaN(value) ? 0 : value);
    }

    // Add boolean features (visit and exposure)
    // Ensure these are either 0 or 1 integers
    const visit = parseInt(features["feature13"]) === 1 ? 1 : 0;
    const exposure = parseInt(features["feature14"]) === 1 ? 1 : 0;

    transformedArray.push(visit);
    transformedArray.push(exposure);

    console.log("Sending transformed array:", transformedArray);

    const response = await axios.post(`${API_URL}/uplift`, transformedArray, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    console.log("Backend response:", response.data);

    // Check if response contains non-zero values
    if (
      response.data &&
      response.data.prediction === 0 &&
      Object.values(response.data.feature_contributions || {}).every(
        (val) => val === 0
      )
    ) {
      console.warn(
        "Received all zeros response from backend - this may indicate a problem"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.error || "Server error");
    } else if (error.request) {
      throw new Error(
        "Server not responding. Please check if the backend is running."
      );
    } else {
      throw error;
    }
  }
};

// Mock version for testing without backend
export const getMockPrediction = () => ({
  prediction: 0.82,
  feature_contributions: {
    feature1: 0.1,
    feature2: -0.03,
    feature3: 0.25,
    feature4: -0.05,
    feature5: 0.08,
    feature6: 0.12,
    feature7: -0.02,
    feature8: 0.07,
    feature9: -0.01,
    feature10: 0.05,
    feature11: 0.04,
    feature12: 0.03,
    feature13: 0.02,
    feature14: 0.01,
  },
});
