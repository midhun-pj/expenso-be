import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a User document in MongoDB.
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a Schema corresponding to the document interface.
const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Do not return password field by default
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Create and export the model.
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
