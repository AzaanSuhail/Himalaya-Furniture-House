import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { redis } from "../db/redis.js";

dotenv.config();

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}

//* Storing tokens to the redis database
const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

//& Sending & storing access token and refresh token to the cookies
const setCookies = (res, accessToken, refreshToken) => {

	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signup = async (req, res) => {
    const { name, email, contact, password } = req.body;
    console.log(email);

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(
                400
            ).send(
                {
                    success: false,
                    message: "User already exists"
                }
            )
        }
        console.log("Debugging") //FIXME
        const user = new User({ name, email, contact, password });
        await user.save();

        //NOTE : Authentication
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);


        res.status(
            200
        ).send(
            {
                success: true,
                message: "User created successfully",
                name: user.name,
                email: user.email,
                contact: user.contact
            }
        )

        console.log("User created successfully✅");
    }
    catch (error) {
        console.log("Error in signup controller❌", error);
        res.status(
            500
        ).send(
            {
                success: false,
                message: "Error in signup controller❌",
                error
            }
        )
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(
                400
            ).send(
                {
                    success:false,
                    message:"User does not exist❌",
                }
            )
        }

        //~ If exists then first compare password & then send the tokens and save in the redis too
        if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id);

			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}

    } catch (error) {
        console.log("Error in login controller ❌", error);

        res.status(
                    500
                ).send(
                    {
                        success: false,
                        message: "Error in login controller ❌",
                        error:error.message
                    }
                )
    }
}


export const logout=async(req,res)=>{
    try {
        //LEARN: Delete refresh token from the redis database and clear the cookies
        const refreshToken=req.cookies.refreshToken;

        if(refreshToken){
            const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json(
            {
            success:true,
            message:"User logged out successfully ✅"
            }
        );


    } catch (error) {
        console.log("Error in logout controller❌", error);

        res.status(
            500
        ).send(
            {
                success: false,
                message: "Error in logout controller❌",
                error:error.message
            }
        )
    }
}


//* this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller❌", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};