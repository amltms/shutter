import mongoose, { Schema } from 'mongoose';

export interface Item extends Document {
	media_type: string;
	id: number;
}

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

export default mongoose.model<Item>('Item', ItemSchema);
