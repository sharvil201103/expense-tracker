"use client";
import { useEffect, useState } from "react";

const getTotalAmount = async () => {
    try {
        const res = await fetch("https://expense-tracker-bq7nd6nvh-sharvilkarwas-projects.vercel.app//api/amount", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch expenses");
        }
        const data = await res.json();
        return data.totalAmount.amount;
    } catch (error) {
        console.log("Error: ", error);
        return 0;
    }
};

export default function TotalAmount() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalAmount = async () => {
            try {
                const total = await getTotalAmount();
                setTotalAmount(total);
            } catch (err) {
                setError("There was an error fetching the total amount.");
            }
        };

        fetchTotalAmount();
    }, []);

    // Conditional styling based on the amount
    const amountStyle = totalAmount < 0 ? "text-red-600" : "text-green-600";

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border border-slate-200 my-6 flex justify-between items-center gap-6 transition-all duration-300 ease-in-out transform hover:scale-105">
            <h2 className="font-bold text-2xl text-[#BE3144]">Total Amount</h2>
            
            {error ? (
                <div className="text-red-600 text-lg">{error}</div>
            ) : (
                <div className={`text-xl font-semibold ${amountStyle}`}>{totalAmount}</div>
            )}
        </div>
    );
}
