import connectMongoDB from "@/libs/mongodb";
import Expense from "@/models/expense"; 
import TotalAmount from "@/models/totalAmount";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newAmount: amount, newLabel: label, newCredit: credit } = await request.json();

    if (!amount || !label || credit === undefined) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongoDB();

    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
        return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    let totalAmount = await TotalAmount.findOne();
    if (totalAmount) {
        // Reverse the effect of the old expense
        totalAmount.amount -= existingExpense.credit ? existingExpense.amount : -existingExpense.amount;
        // Apply the effect of the updated expense
        totalAmount.amount += credit ? amount : -amount;
        await totalAmount.save();
    }

    // Update the expense
    await Expense.findByIdAndUpdate(id, { amount, label, credit });

    return NextResponse.json({ message: "Expense updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    
    await connectMongoDB();
    const expense = await Expense.findOne({ _id: id });

    if (!expense) {
        return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ expense }, { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await connectMongoDB();

    // Find the expense before deletion
    const expense = await Expense.findById(id);
    if (!expense) {
        return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    // Adjust the total amount before deleting the expense
    let totalAmount = await TotalAmount.findOne();
    if (totalAmount) {
        // Correct logic here: subtract amount if it's a credit, and add if it's a debit
        totalAmount.amount += expense.credit ? -expense.amount : expense.amount;
        await totalAmount.save();
    }

    await Expense.findByIdAndDelete(id);

    return NextResponse.json({ message: "Expense deleted" }, { status: 200 });
}