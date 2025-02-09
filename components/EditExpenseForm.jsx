"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditExpenseForm({ id, label, amount, credit }) {

    const [newLabel, setNewLabel] = useState(label);
    const [newAmount, setNewAmount] = useState(amount);
    const [newCredit, setNewCredit] = useState(credit);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://expense-tracker-bq7nd6nvh-sharvilkarwas-projects.vercel.app//api/expenses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ newLabel, newAmount, newCredit })
            });
            if (!res.ok) {
                throw new Error("Failed to update expense");
            }
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                type="text" 
                placeholder="Expense Label"
                className="border border-slate-500 px-8 py-2" 
                onChange={(e) => setNewLabel(e.target.value)} 
                value={newLabel} 
            />
            <input 
                type="number" 
                placeholder="Expense Amount"
                className="border border-slate-500 px-8 py-2" 
                onChange={(e) => setNewAmount(e.target.value)} 
                value={newAmount} 
            />
            <div className="flex gap-2">
                <label>
                    <span>Type</span>
                    <select 
                        value={newCredit ? 'Credit' : 'Debit'} 
                        onChange={(e) => setNewCredit(e.target.value === 'Credit')}
                        className="border border-slate-500 px-8 py-2"
                    >
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </label>
            </div>
            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Update Expense
            </button>
        </form>
    );
}
