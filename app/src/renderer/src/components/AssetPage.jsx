import { useState } from "react";
import { load, save } from "../../../data/repo";
import { recalculateAllStats } from "../../../data/calculations";

const fieldsForCategory = {
  "real-estate": ["location", "value"],
  vehicle: ["make", "model", "year", "value"],
  business: ["businessName", "value"],
  "savings-account": ["accountName", "bankName", "value"],
  "checking-account": ["accountName", "bankName", "value"],
  "retirement-account": ["accountName", "accountType", "value"],
  "other": ["description", "value"],
};

export default function AssetPage({ onAdded }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({});

  function handleFieldChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if (!name.trim() || !category) {
      alert("Please fill Asset Name and Category.");
      return;
    }

    const db = load();
    if (!db) {
      alert("Error: No data found. Please refresh the app.");
      return;
    }

    const asset = {
      id: crypto.randomUUID(),
      type: category,
      name,
      createdAt: Date.now(),
      ...formData,
    };

    // Convert "value" to cents if present
    if (asset.value) {
      asset.valueCents = Math.round(Number(asset.value) * 100);
      delete asset.value;
    } else {
      // If no value provided, set to 0
      asset.valueCents = 0;
    }

    // Ensure assets array exists
    if (!db.assets) {
      db.assets = [];
    }

    db.assets.push(asset);

    // Recalculate all monthly stats and net worth
    const updatedData = recalculateAllStats(db);
    save(updatedData);
    alert("Asset added!");

    // refresh parent or clear fields
    onAdded?.();
    setName("");
    setCategory("");
    setFormData({});
  }

  const dynamicFields = fieldsForCategory[category] ?? [];

  return (
    <div className="form-wrapper">
      <h2>Add Asset</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="form-row">
          <div className="form-col">
            <label>Asset Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFormData({});
              }}
            >
              <option value="">Select Category</option>
              <option value="real-estate">Real Estate</option>
              <option value="vehicle">Vehicle</option>
              <option value="business">Business</option>
              <option value="savings-account">Savings Account</option>
              <option value="checking-account">Checking Account</option>
              <option value="retirement-account">Retirement Account</option>
              <option value="other">Other Asset</option>
            </select>
          </div>

          <div className="form-col">
            <label>Asset Name</label>
            <input
              placeholder="Name of asset"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic fields */}
        {dynamicFields.length > 0 && (
          <div className="form-row">
            {dynamicFields.map((field) => (
              <div key={field} className="form-col">
                <label style={{ textTransform: "capitalize" }}>
                  {field === "accountName" ? "Account Name" :
                   field === "bankName" ? "Bank Name" :
                   field === "accountType" ? "Account Type" :
                   field === "businessName" ? "Business Name" :
                   field === "make" ? "Make" :
                   field === "model" ? "Model" :
                   field === "year" ? "Year" :
                   field === "location" ? "Location" :
                   field === "description" ? "Description" :
                   field}
                </label>
                <input
                  type={
                    field === "year" || field === "value"
                      ? "number"
                      : "text"
                  }
                  step={field === "value" ? "0.01" : undefined}
                  placeholder={
                    field === "accountName" ? "e.g., Primary Savings" :
                    field === "bankName" ? "e.g., Chase Bank" :
                    field === "accountType" ? "e.g., 401(k), IRA" :
                    field === "businessName" ? "e.g., My Business LLC" :
                    field === "make" ? "e.g., Toyota" :
                    field === "model" ? "e.g., Camry" :
                    field === "year" ? "e.g., 2020" :
                    field === "location" ? "e.g., 123 Main St, City, State" :
                    field === "description" ? "Description of asset" :
                    `Enter ${field}`
                  }
                  value={formData[field] || ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Value field - always show */}
        <div className="form-row">
          <div className="form-col">
            <label>Value (USD)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.value || ""}
              onChange={(e) => handleFieldChange("value", e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
}
