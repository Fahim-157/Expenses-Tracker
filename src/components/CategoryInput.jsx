import React, { useState } from "react";

export default function CategoryInput({ onAdd }) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = categoryName.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setCategoryName("");
  };

  return (
    <div className="grid gap-3 rounded-3xl border border-slate-700 bg-slate-950/80 p-4">
      <label htmlFor="new-category" className="block text-sm font-medium text-slate-200">
        New category name
      </label>
      <div className="flex gap-2">
        <input
          id="new-category"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
          placeholder="e.g. Entertainment"
          className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 transition cursor-pointer hover:bg-emerald-400"
        >
          Add
        </button>
      </div>
    </div>
  );
}
