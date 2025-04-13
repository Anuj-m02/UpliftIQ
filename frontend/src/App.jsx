import { useState } from "react";
import FeatureForm from "./components/FeatureForm";
import PredictionResult from "./components/PredictionResult";
import FeatureImpactChart from "./components/FeatureImpactChart";
import DarkModeToggle from "./components/DarkModeToggle";
import { getPrediction } from "./utils/api";
import { FiBarChart, FiAlertCircle, FiActivity } from "react-icons/fi";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previousPrediction, setPreviousPrediction] = useState(null);

  const handleSubmit = async (featureData) => {
    setLoading(true);
    setError(null);

    // Store previous prediction for comparison
    if (prediction) {
      setPreviousPrediction(prediction);
    }

    try {
      console.log("Submitting feature data:", featureData);

      // Call the actual API endpoint
      const result = await getPrediction(featureData);
      setPrediction(result);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError(`Failed to get prediction: ${err.message}`);
      // Don't use mock data, just show the error
    } finally {
      setLoading(false);
    }
  };

  const handleInstantPredict = (featureData) => {
    // Optional: For real-time prediction as user changes inputs
    // Currently not implemented to avoid too many API calls
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Conversion Uplift Predictor
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enter your marketing metrics below to predict conversion uplift and
            analyze feature impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1 space-y-6">
            <FeatureForm
              onSubmit={handleSubmit}
              onChange={handleInstantPredict}
            />

            {/* Loading and Error States */}
            {loading && (
              <div className="card mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-2"></div>
                <p className="text-blue-600 dark:text-blue-400">
                  Analyzing your data...
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                <div className="flex items-center">
                  <FiAlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              </div>
            )}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2 space-y-8">
            {prediction ? (
              <>
                {/* Prediction Results */}
                <PredictionResult prediction={prediction} />

                {/* Before vs After Comparison - Only show if we have a previous prediction */}
                {previousPrediction && (
                  <div className="card">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                      <FiActivity className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                      Before vs After Comparison
                    </h2>
                    <div className="flex justify-around">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Previous
                        </p>
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                          {(previousPrediction.prediction * 100).toFixed(2)}%
                        </p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Current
                        </p>
                        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                          {(prediction.prediction * 100).toFixed(2)}%
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Difference
                        </p>
                        <p
                          className={`text-2xl font-semibold ${
                            prediction.prediction >
                            previousPrediction.prediction
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {(
                            (prediction.prediction -
                              previousPrediction.prediction) *
                            100
                          ).toFixed(2)}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feature Impact Chart */}
                <FeatureImpactChart
                  featureContributions={prediction.feature_contributions}
                />
              </>
            ) : (
              <div className="card flex flex-col items-center justify-center h-64">
                <FiBarChart className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Submit the form to see prediction results and feature impact
                  analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
