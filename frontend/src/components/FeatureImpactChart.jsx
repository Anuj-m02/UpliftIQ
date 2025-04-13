import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FiBarChart2, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const featureLabels = {
  feature1: "Feature 1",
  feature2: "Feature 2",
  feature3: "Feature 3",
  feature4: "Feature 4",
  feature5: "Feature 5",
  feature6: "Feature 6",
  feature7: "Feature 7",
  feature8: "Feature 8",
  feature9: "Feature 9",
  feature10: "Feature 10",
  feature11: "Feature 11",
  feature12: "Feature 12",
  feature13: "Visit",
  feature14: "Exposure",
};

const FeatureImpactChart = ({ featureContributions }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  if (!featureContributions) return null;

  // Sort contributions by absolute value for better visualization
  const sortedFeatures = Object.entries(featureContributions).sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1])
  );

  const labels = sortedFeatures.map(
    ([feature]) => featureLabels[feature] || feature
  );
  const values = sortedFeatures.map(([_, value]) => value);

  // Determine colors based on positive or negative contribution and dark mode
  const backgroundColors = values.map((value) =>
    value >= 0
      ? isDarkMode
        ? "rgba(59, 130, 246, 0.4)"
        : "rgba(59, 130, 246, 0.6)"
      : isDarkMode
      ? "rgba(239, 68, 68, 0.4)"
      : "rgba(239, 68, 68, 0.6)"
  );
  const borderColors = values.map((value) =>
    value >= 0
      ? isDarkMode
        ? "rgba(96, 165, 250, 1)"
        : "rgba(37, 99, 235, 1)"
      : isDarkMode
      ? "rgba(248, 113, 113, 1)"
      : "rgba(220, 38, 38, 1)"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Feature Contribution",
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Feature Impact on Conversion Uplift",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
        color: isDarkMode ? "#e5e7eb" : "#374151",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `Contribution: ${(value * 100).toFixed(2)}%`;
          },
        },
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        backgroundColor: isDarkMode
          ? "rgba(31, 41, 55, 0.9)"
          : "rgba(17, 24, 39, 0.8)",
        padding: 12,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Contribution to Prediction",
          font: {
            size: 14,
            weight: "medium",
          },
          padding: {
            top: 10,
          },
          color: isDarkMode ? "#d1d5db" : "#374151",
        },
        grid: {
          color: isDarkMode
            ? "rgba(75, 85, 99, 0.2)"
            : "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          callback: function (value) {
            return (value * 100).toFixed(0) + "%";
          },
          color: isDarkMode ? "#9ca3af" : "#4b5563",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#4b5563",
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  // Get top positive and top negative contributors
  const positiveContributors = sortedFeatures
    .filter(([_, value]) => value > 0)
    .slice(0, 3);

  const negativeContributors = sortedFeatures
    .filter(([_, value]) => value < 0)
    .slice(0, 3);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
        <FiBarChart2 className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
        Feature Impact Analysis
      </h2>

      <div className="h-[450px] mb-8">
        <Bar data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
            <FiTrendingUp className="w-4 h-4 mr-1" />
            Top Positive Contributors
          </h3>
          <ul className="space-y-2">
            {positiveContributors.length > 0 ? (
              positiveContributors.map(([feature, value]) => (
                <li
                  key={feature}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-800 dark:text-gray-300">
                    {featureLabels[feature]}
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +{(value * 100).toFixed(2)}%
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                No positive contributors found
              </li>
            )}
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-100 dark:border-red-800">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center">
            <FiTrendingDown className="w-4 h-4 mr-1" />
            Top Negative Contributors
          </h3>
          <ul className="space-y-2">
            {negativeContributors.length > 0 ? (
              negativeContributors.map(([feature, value]) => (
                <li
                  key={feature}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-800 dark:text-gray-300">
                    {featureLabels[feature]}
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {(value * 100).toFixed(2)}%
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                No negative contributors found
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeatureImpactChart;
