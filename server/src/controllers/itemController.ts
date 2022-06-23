import e, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import Item from '../models/itemModel';

// @desc    get saved items
// @route   GET /api/items/
// @access  Private
const getSaved = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req['user']._id).populate('saved');
	res.status(200).json(user.saved);
});

// @desc    add saved item
// @route   PUT /api/items/
// @access  Private
const saveItem = asyncHandler(async (req: Request, res: Response) => {
	const { mediaType, id } = req.body;
	const itemExists = await Item.findOne({ id, mediaType });

	if (!itemExists) {
		// if the item doesnt exist in the database, add to database then to the user
		const saveItem = await Item.create(req.body);
		await User.findByIdAndUpdate(req['user']._id, { $push: { saved: saveItem._id } });
		res.status(200).json('Item added to the database and user');
	} else {
		const user = await User.findById(req['user']._id);

		if (user.saved.includes(itemExists._id)) {
			// if the user has already saved the item
			await User.findByIdAndUpdate(user._id, { $pull: { saved: itemExists._id } });
			res.status(200).json('Item removed from the user');
		} else {
			// if the user hasnt saved the item
			await User.findByIdAndUpdate(user._id, { $push: { saved: itemExists._id } });
			res.status(200).json('Item added to the user');
		}
	}
});

export default { getSaved, saveItem };
