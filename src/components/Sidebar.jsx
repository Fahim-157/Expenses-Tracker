import React, { useMemo } from "react";
import useTracker from "../context/TrackerContext";

export default function Sidebar({ activePage, onNavigate }) {
  const { expenses } = useTracker();
  const totalAmount = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses],
  );
  return (
    <aside className="hidden min-h-[calc(100vh-2rem)] w-72 flex-col rounded-[36px] bg-slate-900/90 p-6 text-slate-100 shadow-2xl shadow-slate-950/40 lg:flex">
      <div className="mb-8">
        <div className="inline-flex rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm uppercase tracking-[0.3em] text-emerald-300">
          expense smart
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-white">
          Expenses Tracker
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Add and review your spending with a clean dashboard experience.
        </p>
      </div>

      <nav className="flex flex-col gap-3">
        <button
          onClick={() => onNavigate("add")}
          className={`rounded-2xl px-5 py-3 text-left text-sm font-semibold transition ${
            activePage === "add"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "bg-slate-950/80 text-slate-200 hover:bg-slate-900"
          }`}
        >
          Add expense
        </button>
        <button
          onClick={() => onNavigate("list")}
          className={`rounded-2xl px-5 py-3 text-left text-sm font-semibold transition ${
            activePage === "list"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "bg-slate-950/80 text-slate-200 hover:bg-slate-900"
          }`}
        >
          Expense list
        </button>
      </nav>

      <div className="mt-10 rounded-3xl bg-slate-950/90 px-5 py-4 shadow-xl shadow-slate-900/40">
        <div className="rounded-3xl bg-slate-950/90 px-5 py-4 shadow-xl shadow-slate-900/40">
          <p className="text-sm text-slate-400">Total expenses</p>
          <p className=" text-3xl font-semibold text-white">
            {expenses.length}
          </p>
          <p className="text-sm text-slate-400">Total amount</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-400">
          ₹{Number(totalAmount).toLocaleString()}
          </p>
        </div>
      </div>
    </aside>
  );
}
