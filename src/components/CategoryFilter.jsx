import React from "react";
import useTracker from "../context/TrackerContext";

export default function CategoryFilter({ onChange, selectedCategory }) {
  const { expenses } = useTracker();
  const categories = [
    "All",
    ...Array.from(new Set(expenses.map((expense) => expense.category).filter(Boolean))).sort(),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
      <label htmlFor="filter" className="text-slate-400">
        Filter by category
      </label>
      <select
        id="filter"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-slate-700 bg-slate-950/90 px-3 py-2 text-slate-100 outline-none transition duration-200 focus:border-emerald-400"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
