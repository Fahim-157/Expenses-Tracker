import React, { useMemo, useState } from "react";
import useTracker from "../context/TrackerContext";
import CategoryInput from "./CategoryInput";

const defaultCategories = ["Travel", "Food", "Shopping", "Utilities"];

const createExpenseTemplate = (category) => ({
  title: "",
  amount: "",
  category,
  description: "",
  date: new Date().toISOString().split("T")[0],
  id: Date.now(),
  updating: false,
});

export default function ExpenseForm() {
  const { setExpenses } = useTracker();
  const [categories, setCategories] = useState(defaultCategories);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [expenseData, setExpenseData] = useState(() =>
    createExpenseTemplate(defaultCategories[0]),
  );
  const [itemAdded, setItemAdded] = useState(false);
  const categoryOptions = useMemo(
    () => [...new Set(categories)].filter(Boolean),
    [categories],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = (newCategory) => {
    const label = newCategory.trim();
    console.log(newCategory);
    defaultCategories.unshift(newCategory)
    
    if (!label) return;
    const formatted = label.charAt(0).toUpperCase() + label.slice(1);
    setCategories((prev) => [formatted, ...prev.filter((item) => item !== formatted)]);
    setExpenseData((prev) => ({ ...prev, category: formatted }));
    setShowCategoryInput(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextExpense = { ...expenseData, id: Date.now(), updating: false };
    setExpenses((prev) => [...prev, nextExpense]);
    setExpenseData(createExpenseTemplate(categoryOptions[0] || "Travel"));
    setItemAdded(true);
    window.setTimeout(() => setItemAdded(false), 1200);
  };

  return (
    <div className="fade-in flex flex-col gap-3">
      <div className="mb-6 flex flex-col gap-3 rounded-3xl bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/70">
            Add a new expense
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Track your spending with ease
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Fill in the expense details and save them instantly. Use categories to keep your budget organized.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-3xl bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20 lg:grid-cols-[1.4fr_0.9fr]"
      >
        <div className="grid gap-4">
          <label className="block text-sm font-medium text-slate-200" htmlFor="title">
            Expense name
          </label>
          <input
            id="title"
            name="title"
            value={expenseData.title}
            onChange={handleChange}
            required
            placeholder="Enter a title"
            className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
          />

          <label className="block text-sm font-medium text-slate-200" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Add a short description"
            className="min-h-27.5 rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
          />
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={expenseData.amount}
              onChange={handleChange}
              required
              placeholder="0.00"
              className="w-full rounded-3xl border mt-1.5 border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={expenseData.category}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "Add Category") {
                  setShowCategoryInput(true);
                  setExpenseData((prev) => ({ ...prev, category: defaultCategories[0] }));
                } else {
                  setExpenseData((prev) => ({ ...prev, category: value }));
                  setShowCategoryInput(false);
                }
              }}
              className="w-full rounded-3xl border border-slate-700 mt-2 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="Add Category">+ Add new category</option>
            </select>
          </div>

          {showCategoryInput && (
            <CategoryInput onAdd={handleAddCategory} />
          )}

          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={expenseData.date}
              onChange={handleChange}
              className="w-full rounded-3xl mt-1.5 border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="mt-auto rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-400"
          >
            Save expense
          </button>
        </div>
      </form>

      {itemAdded && (
        <div className="mt-0.5 rounded-3xl bg-emerald-500/15 px-5 py-4 text-center text-emerald-200 shadow-inner shadow-emerald-500/10">
          Expense added successfully.
        </div>
      )}
    </div>
  );
}
