import mongoose, { Document, Schema, Types } from 'mongoose';

// Define an interface representing an Expense document in MongoDB.
export interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
  category: string;
  user: Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

// Create a Schema corresponding to the document interface.
const ExpenseSchema: Schema = new Schema<IExpense>(
  {
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
      min: [0, 'Amount must be positive'],
    },
    date: {
      type: Date,
      required: [true, 'Please add a date'],
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'],
      default: 'Other',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Create and export the model.
const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;
