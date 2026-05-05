import React, { useEffect, useMemo, useState } from "react";
import useTracker from "../context/TrackerContext";
import CategoryFilter from "./CategoryFilter";

export default function ExpenseList() {
  const { expenses, setExpenses } = useTracker();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 5;

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") return expenses;
    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredExpenses.length / itemsPerPage));
  const currentItems = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    () => setCurrentPage(1);
  }, [selectedCategory, filteredExpenses.length]);

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleToggleEdit = (id) => {
    setExpenses((prev) =>
      prev.map((expense) => ({
        ...expense,
        updating: expense.id === id ? !expense.updating : false,
      })),
    );
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.updating ? { ...expense, [name]: value } : expense,
      ),
    );
  };

  const totalAmount = useMemo(
    () => filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [filteredExpenses],
  );

  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-950/90 p-10 text-center text-slate-300 shadow-xl shadow-slate-950/20">
        <h2 className="mb-3 text-3xl font-semibold text-white">No expenses yet</h2>
        <p className="text-slate-400">Add your first expense to start tracking your spending.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 fade-in">
      <div className="flex flex-col gap-4 rounded-3xl bg-slate-950/90 p-5 shadow-2xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/70">Expense history</p>
        </div>

        <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/20">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400">
            <tr>
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {currentItems.map((expense, index) => {
              const rowIndex = (currentPage - 1) * itemsPerPage + index + 1;
              return (
                <tr key={expense.id} className="transition hover:bg-slate-900/70">
                  <td className="px-4 py-4 font-medium text-slate-300">{rowIndex}</td>
                  <td className="px-4 py-4 text-slate-300">{expense.date}</td>

                  {expense.updating ? (
                    <>
                      <td className="px-4 py-4">
                        <input
                          name="title"
                          value={expense.title}
                          onChange={handleFieldChange}
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 outline-none"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          name="category"
                          value={expense.category}
                          onChange={handleFieldChange}
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 outline-none"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          name="description"
                          value={expense.description}
                          onChange={handleFieldChange}
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 outline-none"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          name="amount"
                          type="number"
                          value={expense.amount}
                          onChange={handleFieldChange}
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 outline-none"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-4 text-slate-300">{expense.title}</td>
                      <td className="px-4 py-4 text-slate-300">{expense.category}</td>
                      <td className="px-4 py-4 text-slate-300">{expense.description}</td>
                      <td className="px-4 py-4 text-emerald-300">${Number(expense.amount).toLocaleString()}</td>
                    </>
                  )}

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleToggleEdit(expense.id)}
                        className="rounded-2xl bg-emerald-500 px-3 py-2 text-[0.8rem] font-semibold text-slate-950 transition hover:bg-emerald-400"
                      >
                        {expense.updating ? "Save" : "Edit"}
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="rounded-2xl bg-rose-500 px-3 py-2 text-[0.8rem] font-semibold text-white transition hover:bg-rose-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-900/80 text-slate-400">
            <tr>
              <td className="px-4 py-4 font-semibold" colSpan={5}>
                Total
              </td>
              <td className="px-4 py-4 font-semibold text-emerald-300">
                ${totalAmount.toLocaleString()}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-slate-950/90 p-4 shadow-xl shadow-slate-950/20">
          <div className="text-slate-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-700"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
