"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa"; // Loader icon

export default function AddExpense() {
    const [amount, setAmount] = useState("");
    const [label, setLabel] = useState("");
    const [credit, setCredit] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state

    const router = useRouter();

    const [totalAmount, setTotalAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || amount <= 0 || !label || credit === null) {
            alert("All fields are mandatory, and amount must be greater than zero.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount, label, credit }),
            });

            if (res.ok) {
                setTotalAmount((prevTotal) => prevTotal + Number(amount)); // Ensure numeric addition
                router.replace("/");
            } else {
                throw new Error("Failed to create an expense");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle quick fill
    const handleQuickFill = (expenseType) => {
        if (expenseType === "food") {
            setLabel("Food");
            setCredit(false); // Debit
            setAmount(""); // Let user enter amount
        } else if (expenseType === "rent") {
            setLabel("Rent");
            setCredit(false); // Debit
            setAmount(20000);
        } else if (expenseType === "stipend") {
            setLabel("Stipend");
            setCredit(true); // Credit
            setAmount(32500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#09122C] to-[#872341] flex items-center justify-center py-10 px-4 sm:px-6">
            <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl font-sans w-full sm:p-6">
                <h2 className="text-3xl font-semibold text-center text-[#09122C] mb-6 tracking-wide sm:text-xl sm:mb-4">
                    Add New Expense
                </h2>

                {/* Quick Select Buttons */}
                <div className="flex justify-center gap-4 mb-4 sm:gap-2 sm:mb-3 flex-wrap">
                    <button 
                        onClick={() => handleQuickFill("food")}
                        className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300 text-lg sm:text-sm sm:p-2 w-24"
                    >
                        🍔 Food
                    </button>
                    <button 
                        onClick={() => handleQuickFill("rent")}
                        className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300 text-lg sm:text-sm sm:p-2 w-24"
                    >
                        🏠 Rent
                    </button>
                    <button 
                        onClick={() => handleQuickFill("stipend")}
                        className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300 text-lg sm:text-sm sm:p-2 w-24"
                    >
                        💼 Stipend
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-4">
                    {/* Amount Input */}
                    <input
                        type="number"
                        placeholder="Expense Amount"
                        className="border-2 border-[#BE3144] rounded-lg px-6 py-3 text-lg text-[#09122C] focus:outline-none focus:ring-2 focus:ring-[#E17564] transition-all duration-300 ease-in-out transform hover:scale-105 sm:text-base sm:px-4 sm:py-2"
                        onChange={(e) => setAmount(Number(e.target.value))}
                        value={amount}
                    />

                    {/* Label Input */}
                    <input
                        type="text"
                        placeholder="Expense Label"
                        className="border-2 border-[#BE3144] rounded-lg px-6 py-3 text-lg text-[#09122C] focus:outline-none focus:ring-2 focus:ring-[#E17564] transition-all duration-300 ease-in-out transform hover:scale-105 sm:text-base sm:px-4 sm:py-2"
                        onChange={(e) => setLabel(e.target.value)}
                        value={label}
                    />

                    {/* Credit/Debit Selection */}
                    <div className="flex justify-center items-center gap-6 sm:flex-col sm:gap-3">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="credit"
                                value="true"
                                onChange={() => setCredit(true)}
                                checked={credit === true}
                                className="w-5 h-5 sm:w-4 sm:h-4"
                            />
                            <span className="text-lg font-semibold text-[#E17564] sm:text-base">Credit</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="credit"
                                value="false"
                                onChange={() => setCredit(false)}   
                                checked={credit === false}
                                className="w-5 h-5 sm:w-4 sm:h-4"
                            />
                            <span className="text-lg font-semibold text-[#E17564] sm:text-base">Debit</span>
                        </div>
                    </div>

                    {/* Submit Button with Loader */}
                    <button
                        type="submit"
                        className="flex justify-center items-center bg-[#E17564] text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#BE3144] active:scale-95 sm:text-base sm:px-4 sm:py-2"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" /> Processing...
                            </>
                        ) : (
                            "Add Expense"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
