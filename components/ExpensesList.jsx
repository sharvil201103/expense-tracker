import RemoveBtn from "./RemoveBtn";

const getExpenses = async () => {
    try {
        const res = await fetch('https://expense-tracker-bq7nd6nvh-sharvilkarwas-projects.vercel.app//api/expenses', {
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error("Failed to fetch expenses");
        }
        return res.json();
    } catch (error) {
        console.log("Error: ", error);
    }
};

export default async function ExpensesList() {
    const { expenses } = await getExpenses();

    // Sort the expenses array to show the latest expense at the top
    const sortedExpenses = expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            {sortedExpenses.map((e) => {
                // Format label with first letter uppercase
                const formattedLabel = e.label
                    .toLowerCase()
                    .replace(/^\w/, (c) => c.toUpperCase());

                // Determine emoji based on amount and credit/debit status
                let emoji = "";
                if (!e.credit && e.amount > 5000) {
                    emoji = "😡";
                } else if (!e.credit && e.amount <= 5000) {
                    emoji = "😢";
                } else if (e.credit && e.amount <= 5000) {
                    emoji = "💵";
                } else if (e.credit && e.amount > 5000) {
                    emoji = "💰💰";
                }

                return (
                    <div
                        key={e._id}
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start bg-white rounded-xl shadow-lg"
                    >
                        <div>
                            <h2
                                className={`font-bold text-2xl ${
                                    e.credit ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {formattedLabel} {emoji}
                            </h2>
                            <div className="text-black">
                                {e.amount} {e.credit ? "Credit" : "Debit"}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <RemoveBtn id={e._id} />
                        </div>
                    </div>
                );
            })}
        </>
    );
}
