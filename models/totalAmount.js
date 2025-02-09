import mongoose, { Schema } from "mongoose";

const totalAmountSchema = new Schema({
    amount: { type: Number, default: 0.0 } // Store amount as a number
});

const TotalAmount = mongoose.models.TotalAmount || mongoose.model("TotalAmount", totalAmountSchema);

export default TotalAmount;
