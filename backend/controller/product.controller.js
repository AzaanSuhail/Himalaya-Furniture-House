import Product from "../models/product.model.js";
import {redis} from "../db/redis.js";
import cloudinary from "../db/cloudinary.js";
import User from "../models/user.model.js";

export const getAllProducts = async (req, res) => {
    try {
       const products = await Product.find({}); // find all products
		res.json({ products });

        console.log("All products fetched successfully ✅");
    } catch (error) {
        console.log("Error in getHomeProducts controller ❌", error);
        res.status(500).send({
            success: false,
            message: "Error in getHomeProducts controller ❌",
            error,
        });
    }
};


export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller❌", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloudinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller❌", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Add product to user's wishlist
export const addToWishlist = async (req, res) => {
	try {
		const userId = req.user._id;
		const { productId } = req.body;

		const product = await Product.findById(productId);
		if (!product) return res.status(404).json({ message: 'Product not found' });

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		// prevent duplicates
		if (user.wishlist && user.wishlist.includes(productId)) {
			return res.status(200).json({ message: 'Product already in wishlist' });
		}

		user.wishlist = [...(user.wishlist || []), productId];
		await user.save();

		res.json({ success: true, message: 'Added to wishlist', wishlist: user.wishlist });
	} catch (error) {
		console.log('Error in addToWishlist controller❌', error.message);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Remove product from user's wishlist
export const removeFromWishlist = async (req, res) => {
	try {
		const userId = req.user._id;
		const { productId } = req.body;

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		user.wishlist = (user.wishlist || []).filter(id => id.toString() !== productId.toString());
		await user.save();

		res.json({ success: true, message: 'Removed from wishlist', wishlist: user.wishlist });
	} catch (error) {
		console.log('Error in removeFromWishlist controller❌', error.message);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Get user's wishlist (populated)
export const getWishlist = async (req, res) => {
	try {
		const userId = req.user._id;

		const user = await User.findById(userId).populate('wishlist');
		if (!user) return res.status(404).json({ message: 'User not found' });

		res.json({ success: true, wishlist: user.wishlist });
	} catch (error) {
		console.log('Error in getWishlist controller❌', error.message);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};
