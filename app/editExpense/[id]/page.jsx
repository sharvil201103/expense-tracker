import EditExpenseForm from "@/components/EditExpenseForm";

const getExpenseById = async (id) => {
    try {
        const res = await fetch(`https://expense-tracker-bq7nd6nvh-sharvilkarwas-projects.vercel.app//api/expenses/${id}`, {
            cache: "no-store"
        })
        if (!res.ok) {
            throw new Error("Failed to fetch expense");
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function EditExpense({ params }) {
    const { id } = params;
    const { expense } = await getExpenseById(id);
    const { amount, label, credit } = expense;
    return <EditExpenseForm id={id} amount={amount} label={label} credit={credit} />
}
