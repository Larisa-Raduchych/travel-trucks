"use client";

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import css from "./Filters.module.css";

// що передаємо при Search
export interface FilterValues {
  location: string;
  form: string;
  transmission: string;
  engine: string;
}

interface FiltersProps {
  onSearch: (filters: FilterValues) => void;
}

const FORMS = [
    { value: "alcove", label: "Alcove" },
    { value: "panel_van", label: "Panel van" },
    { value: "integrated", label: "Integrated" },
    { value: "semi_integrated", label: "Semi integrated" },
];
const ENGINES = [
    { value: "diesel", label: "Diesel" },
    { value: "petrol", label: "Petrol" },
    { value: "hybrid", label: "Hybrid" },
    { value: "electric", label: "Electric" },
];
const TRANSMISSIONS = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
];

export default function Filters({ onSearch }: FiltersProps) {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");

  const handleSearch = () => {
    onSearch({ location, form, transmission, engine });
  };

  const handleClear = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");
    onSearch({ location: "", form: "", transmission: "", engine: "" });
  };

  return (
    <aside className={css.filters}>
      {/* Location */}
      <div className={css.group}>
        <label className={css.label}>Location</label>
        <div className={css.inputWrapper}>
    <FaMapMarkerAlt className={css.mapIcon} />
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="City"
      className={css.input}
    />
  </div>
      </div>

      {/* Camper form */}
      <div className={css.group}>
        <h3 className={css.title}>Vehicle type</h3>
        {FORMS.map((f) => (
          <label key={f.value} className={css.radio}>
            <input
              type="radio"
              name="form"
              checked={form === f.value}
              onChange={() => setForm(f.value)}
            />
            {f.label}
          </label>
        ))}
      </div>

      {/* Engine */}
      <div className={css.group}>
        <h3 className={css.title}>Engine</h3>
        {ENGINES.map((e) => (
          <label key={e.value} className={css.radio}>
            <input
              type="radio"
              name="engine"
              checked={engine === e.value}
              onChange={() => setEngine(e.value)}
            />
            {e.label}
          </label>
        ))}
      </div>

      {/* Transmission */}
      <div className={css.group}>
        <h3 className={css.title}>Transmission</h3>
        {TRANSMISSIONS.map((t) => (
          <label key={t.value} className={css.radio}>
            <input
              type="radio"
              name="transmission"
              checked={transmission === t.value}
              onChange={() => setTransmission(t.value)}
            />
            {t.label}
          </label>
        ))}
      </div>

      {/* Кнопки */}
      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
      <button className={css.clearBtn} onClick={handleClear}>
        <FaXmark />
  Clear filters
      </button>
    </aside>
  );
}