import React, { useEffect, useMemo, useState } from "react";
import { TrackerProvider } from "./context/TrackerContext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Sidebar from "./components/Sidebar";

export default function ExpensesTracker() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expensesList")) || [];
  });
  const [activePage, setActivePage] = useState("add");

  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expenses));
  }, [expenses]);

  const totalAmount = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses],
  );

  return (
    <TrackerProvider value={{ expenses, setExpenses }}>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex h-screen max-w-350 gap-6 px-4 py-5 xl:px-8">
          <Sidebar activePage={activePage} onNavigate={setActivePage} />

          <main className="flex w-full flex-col gap-6">
            {/* <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    Expense tracker dashboard
                  </p>
                  <h1 className="mt-2 text-4xl font-semibold text-white">
                    Keep your spending smart and simple
                  </h1>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-3xl bg-slate-950/90 px-5 py-4 shadow-xl shadow-slate-900/40">
                    <p className="text-sm text-slate-400">Total expenses</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {expenses.length}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 px-5 py-4 shadow-xl shadow-slate-900/40">
                    <p className="text-sm text-slate-400">Total amount</p>
                    <p className="mt-2 text-3xl font-semibold text-emerald-400">
                      ${totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 px-5 py-4 shadow-xl shadow-slate-900/40">
                    <p className="text-sm text-slate-400">Current view</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {activePage === "add" ? "Add Expense" : "Expense List"}
                    </p>
                  </div>
                </div>
              </div>
            </section> */}

            <section className="flex flex-col gap-6">
              <div className="rounded-3xl min-h-[calc(100vh-5vh)] border border-slate-800 bg-slate-900/80 p-6 pb-0 shadow-2xl shadow-slate-900/20">
                {activePage === "add" ? <ExpenseForm /> : <ExpenseList />}
              </div>
            </section>
          </main>
        </div>
      </div>
    </TrackerProvider>
  );
}
