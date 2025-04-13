import React from "react";
import {
  FiBarChart,
  FiTrendingUp,
  FiTrendingDown,
  FiInfo,
} from "react-icons/fi";

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  const upliftPercentage = (prediction.prediction * 100).toFixed(2);
  const isPositive = upliftPercentage > 0;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
        <FiBarChart className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
        Prediction Results
      </h2>

      <div className="flex flex-col items-center justify-center mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Predicted Conversion Uplift
        </p>
        <div className="flex items-center justify-center">
          {isPositive ? (
            <FiTrendingUp className="w-8 h-8 text-green-500 dark:text-green-400 mr-2" />
          ) : (
            <FiTrendingDown className="w-8 h-8 text-red-500 dark:text-red-400 mr-2" />
          )}
          <div
            className={`text-5xl font-bold ${
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {upliftPercentage}%
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex items-start">
          <div className="mr-2 mt-1">
            <FiInfo className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {isPositive
              ? "Positive uplift indicates improved conversion performance. This suggests that your marketing strategies are effective at converting potential customers."
              : "Negative uplift indicates decreased conversion performance. Consider reviewing and adjusting your current marketing strategies to improve conversion rates."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
