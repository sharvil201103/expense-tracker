"use client";

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id }) {

    const router = useRouter();

    const removeExpense = async () => {
        const confirmed = confirm("Are you sure you want to delete this expense?");
        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
                method: "DELETE"
            });
        }
        router.refresh();
    }

    return (
        <button onClick={removeExpense} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}
