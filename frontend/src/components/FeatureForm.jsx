import React, { useState } from "react";
import { FiList, FiBarChart2 } from "react-icons/fi";

const initialFormData = {
  feature1: 0,
  feature2: 0,
  feature3: 0,
  feature4: 0,
  feature5: 0,
  feature6: 0,
  feature7: 0,
  feature8: 0,
  feature9: 0,
  feature10: 0,
  feature11: 0,
  feature12: 0,
  feature13: 1, // Visit
  feature14: 1, // Exposure
};

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

// Boolean features that only accept 0 or 1
const booleanFeatures = ["feature13", "feature14"];

const FeatureForm = ({ onSubmit, onChange }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = parseFloat(value) || 0;

    // For Visit and Exposure, constrain to 0 or 1
    if (booleanFeatures.includes(name)) {
      newValue = Math.min(1, Math.max(0, Math.round(newValue)));
    }

    const newFormData = {
      ...formData,
      [name]: newValue,
    };

    setFormData(newFormData);

    // Call onChange for instant prediction if provided
    if (onChange) {
      onChange(newFormData);
    }
  };

  const handleBooleanClick = (name, value) => {
    const newFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(newFormData);

    // Call onChange for instant prediction if provided
    if (onChange) {
      onChange(newFormData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
        <FiList className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
        Enter Feature Values
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(initialFormData).map((feature) => (
            <div key={feature} className="mb-4 group">
              <label
                htmlFor={feature}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center"
              >
                {featureLabels[feature]}
              </label>

              {booleanFeatures.includes(feature) ? (
                <div className="flex space-x-2 mt-1">
                  <button
                    type="button"
                    onClick={() => handleBooleanClick(feature, 0)}
                    className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                      formData[feature] === 0
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBooleanClick(feature, 1)}
                    className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                      formData[feature] === 1
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    1
                  </button>
                </div>
              ) : (
                <input
                  type="number"
                  id={feature}
                  name={feature}
                  value={formData[feature]}
                  onChange={handleChange}
                  step="0.01"
                  className="input-field"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="btn-primary flex items-center justify-center"
          >
            <FiBarChart2 className="w-5 h-5 mr-2" />
            Predict Conversion Uplift
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeatureForm;
