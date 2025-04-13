# SYNAPSE - Conversion Uplift Predictor

SYNAPSE is an interactive web application that predicts conversion uplift based on marketing metrics and visualizes feature impacts. It consists of a React frontend and Flask backend powered by machine learning models.

![SYNAPSE Demo]

## 🧠 About the Project

SYNAPSE uses uplift modeling techniques to predict the causal impact of marketing actions. Unlike traditional prediction models that only forecast outcomes, uplift models identify the incremental impact of treatments by modeling:

- **Treatment Effect**: The difference in outcomes between treated and control groups
- **Feature-specific Contributions**: How each variable influences the treatment effect
- **Actionable Insights**: Identifying which factors most effectively drive conversion uplift

Our implementation uses separate ML models for treated and control populations, with SHAP (SHapley Additive exPlanations) values to quantify feature contributions.

## 🚀 Features

- **Interactive Metric Input**: Adjust 12 different marketing features plus visit/exposure flags
- **Real-time Prediction**: Get instant uplift predictions as you modify inputs
- **Visualization**: See how each feature contributes positively or negatively to the uplift
- **Before vs After Comparison**: Track changes in predictions as you modify values
- **Dark/Light Mode**: UI adapts to your preference

## ⚙️ Tech Stack

- **Frontend**:

  - React with modern hooks
  - Chart.js for data visualization
  - Tailwind CSS for responsive styling
  - Axios for API communication

- **Backend**:
  - Flask API
  - Scikit-learn models
  - SHAP for model explanations
  - Joblib for model serialization

## 📋 Installation

### Prerequisites

- Node.js (v14+)
- Python (3.8+)
- pip and npm

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 API Endpoints

### `/uplift` (POST)

Calculates the uplift prediction based on feature inputs.

**Input Format**:

```json
[0.5, 0.3, 0.7, 0.2, 0.8, 0.6, 0.4, 0.9, 0.1, 0.5, 0.3, 0.7, 1, 0]
```

Where the first 12 values are feature metrics (f0-f11) and the last two are binary flags (visit, exposure).

**Response Format**:

```json
{
  "prediction": 0.15,
  "feature_contributions": {
    "feature1": 0.03,
    "feature2": -0.01,
    ...
  }
}
```

### `/health` (GET)

Checks if the models are loaded correctly.

## 📈 Usage

1. Fill in your marketing metrics in the left panel
2. Toggle the visit/exposure flags as needed
3. Click "Predict Conversion Uplift" or let the real-time prediction work
4. Analyze feature contributions in the visualization
5. Adjust inputs to see how changes affect the prediction

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
