import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        contact: {
            type: String, //FIXME
            required: [true, "Contact number is required"],
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters long"],
            maxlength: [15, "Password must be at most 15 characters long"]
        },
        role: {
            type: String,
            default: "customer"
        }
        ,
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }
        ]
    },

    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);  //* rounds of security

        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error)
    }
})

//LEARN : Mongoose provide you the functionality to add custom methods to models
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;

