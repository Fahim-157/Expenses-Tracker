import React, { useEffect, useState } from "react";
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

  return (
    <TrackerProvider value={{ expenses, setExpenses }}>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex h-screen max-w-350 gap-6 px-4 py-5 xl:px-8">
          <Sidebar activePage={activePage} onNavigate={setActivePage} />

          <main className="flex w-full flex-col gap-6">
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
