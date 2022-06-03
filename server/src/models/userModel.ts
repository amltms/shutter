import mongoose, { Schema } from 'mongoose';

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
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', UserSchema);
