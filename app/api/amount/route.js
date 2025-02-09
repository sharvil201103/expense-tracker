import connectMongoDB from "@/libs/mongodb";
import TotalAmount from "@/models/totalAmount";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();

    let totalAmount = await TotalAmount.findOne();

    if (!totalAmount) {
        totalAmount = await TotalAmount.create({ amount: 0 });
    }

    return NextResponse.json({ totalAmount }, { status: 200 });
}

export async function DELETE() {
    await connectMongoDB();

    await TotalAmount.deleteMany();

    return NextResponse.json({ message: "deleted" }, { status: 200 });
}