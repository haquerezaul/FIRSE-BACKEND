 import { asyncHandler } from "../utils/asyncHandler.js";
 import { ApiError } from "../utils/ApiError.js";
 import { User } from "../models/user.model.js";
 import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body;
    console.log("email", email);

    if ([username, email, fullname, password].some((field)=>
        field?.trim() === "" )
) {
        throw new ApiError("All fields are required", 400);
    }

    const existedUser=  User.findOne({
        $or: [
            { username: username },
            { email: email },
        ],
    })
    if (existedUser) {
        throw new ApiError("User already exists", 400);
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError("Avatar is required", 400);
    }

     const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError("Avatar is required", 400);
    }

    const user = await User.create({
        username: username.tolowerCase(),
        email,
        fullname,
        password,
        avatar : avatar.url,
        coverImage: coverImage?.url ||"",

    });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError("Something went wrong while registering", 404);
    }
    return res.status(201).json(
        new ApiResponse(201, "User created successfully", {
            user: createdUser,
        })
    );
})
 
    export{registerUser}