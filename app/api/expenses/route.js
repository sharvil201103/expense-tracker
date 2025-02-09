import connectMongoDB from "@/libs/mongodb";
import Expense from "@/models/expense";
import TotalAmount from "@/models/totalAmount";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { amount, label, credit } = await request.json();

    if (!amount || !label || credit === undefined) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongoDB();
    await Expense.create({ amount, label, credit });

    let totalAmount = await TotalAmount.findOne();

    if (!totalAmount) {
        totalAmount = await TotalAmount.create({ amount: 0 });
    }

    let amnt = totalAmount.amount;

    // Update the totalAmount based on credit or debit

    console.log(credit);

    if (credit==true) {
        totalAmount.amount = amnt + amount;  // Add amount for credit
        console.log("bunty")
    } else {
        totalAmount.amount = amnt - amount;  // Subtract amount for debit
    }

    // Save the updated totalAmount
    await totalAmount.save();

    return NextResponse.json({ message: "Expense created", amnt: totalAmount.amount }, { status: 201 });
}


export async function GET() {
    await connectMongoDB();
    const expenses = await Expense.find();

    return NextResponse.json({ expenses });
}

export async function DELETE(request) {
    await connectMongoDB();
    await Expense.deleteMany();
    return NextResponse.json({ message: "deleted all" });
}
