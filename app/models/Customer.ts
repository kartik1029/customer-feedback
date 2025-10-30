import mongoose, { Schema, Document, models } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  email: string;
  location: string;
  foodItem: string;
  rating: number;
  feedback: string;
  createdAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  foodItem: { type: String, required: true },
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Customer =
  models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;
