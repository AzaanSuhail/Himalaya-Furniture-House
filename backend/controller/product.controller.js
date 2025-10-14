import Product from "../models/product.model.js";
import User from "../models/user.model.js"; // Import User model
import cloudinary from "../db/cloudinary.js";
import mongoose from "mongoose";

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

// Fetch products by category (case-insensitive match)
export const getProductsByCategory = async (req, res) => {
	try {
		const { slug } = req.params;
		if (!slug) return res.status(400).json({ message: 'Category slug is required' });

		// match case-insensitive; allow partial match so stored categories like "Dining Room" match slug 'dining-room'
		const regex = new RegExp(slug.replace(/-/g, '\\s*'), 'i');
		const products = await Product.find({ category: { $regex: regex } });

		res.json({ products });
	} catch (error) {
		console.log('Error in getProductsByCategory controller ❌', error);
		res.status(500).json({ message: 'Server error', error: error.message });
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

// Update product (admin)
export const updateProduct = async (req, res) => {
	try {
		const updates = req.body;

		// If image is present as base64 or url, attempt to upload to cloudinary
		if (updates.image?.startsWith('data:')) {
			try {
				const cloudinaryResponse = await cloudinary.uploader.upload(updates.image, { folder: 'products' });
				updates.image = cloudinaryResponse.secure_url;
			} catch (err) {
				console.log('Cloudinary upload failed for update', err.message);
			}
		}

		const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
		if (!product) return res.status(404).json({ message: 'Product not found' });

		res.json({ message: 'Product updated', product });
	} catch (error) {
		console.log('Error in updateProduct controller❌', error.message);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);
        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }
        const wishlist = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to wishlist' });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);
        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();
        const wishlist = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
};
