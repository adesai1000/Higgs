import { useState } from "react";
import { load, save } from "../../../data/repo";

const fieldsForCategory = {
  crypto: ["symbol", "quantity"],
  business: ["category", "value"],
  luxury: ["category", "value"],
  vehicle: ["model", "year", "value"],
  "real-estate": ["location", "value"],
};

export default function AssetPage({ onAdded }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({});

  function handleFieldChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if (!name.trim() || !category) return;

    const db = load();

    const asset = {
      id: crypto.randomUUID(),
      type: category,
      name,
      createdAt: Date.now(),
      ...formData,
    };

    console.log("Before save:", db.assets);
    console.log("New asset:", asset);

    // Convert "value" to cents if present
    if (asset.value) {
      asset.valueCents = Math.round(Number(asset.value) * 100);
      delete asset.value;
    }

    db.assets.push(asset);
    save(db);
    alert("Asset added!");

    // refresh parent or clear fields
    onAdded?.();
    setName("");
    setCategory("");
    setFormData({});
  }

  const dynamicFields = fieldsForCategory[category] ?? [];

  return (
    <div style={{ padding: 20, maxWidth: 450 }}>
      <h2>Add Asset</h2>

      {/* Dropdown: Asset Category */}
      <label>Asset Category</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setFormData({});
        }}
      >
        <option value="">Select Category</option>
        <option value="crypto">Crypto</option>
        <option value="business">Business</option>
        <option value="luxury">Luxury</option>
        <option value="vehicle">Vehicle</option>
        <option value="real-estate">Real Estate</option>
      </select>

      {/* Common field */}
      <label>Asset Name</label>
      <input
        placeholder="Name of asset"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Dynamic fields */}
      {dynamicFields.map((field) => (
        <div key={field}>
          <label style={{ textTransform: "capitalize" }}>{field}</label>
          <input
            type={
              field === "quantity" || field === "year" || field === "value"
                ? "number"
                : "text"
            }
            placeholder={`Enter ${field}`}
            value={formData[field] || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Add Asset
      </button>
    </div>
  );
}
