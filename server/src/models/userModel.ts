import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	saved: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please add a name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
		saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<User>('User', UserSchema);
