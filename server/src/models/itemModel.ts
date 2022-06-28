import mongoose, { Schema } from 'mongoose';

const ItemSchema: Schema = new Schema(
	{
		media_type: {
			type: String,
			required: [true, 'Please add media type'],
		},
		id: {
			type: Number,
			required: [true, 'Please add an item id'],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Item', ItemSchema);
