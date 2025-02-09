import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
    {
        amount: { type: Number, required: true, min: 1 }, 
        label: { type: String, required: true }, 
        credit: { type: Boolean, required: true } 
    },
    {
        timestamps: true
    }
);

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
