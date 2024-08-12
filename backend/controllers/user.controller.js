import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const{fullname, email, password, phoneNumber, role} = req.body;
        if(!fullname || !email || !phoneNumber ||!password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });

        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false,
            });
        };
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({
          fullname,
          email,
          phoneNumber,
          password:hashedPassword,
          role,
      });
        res.status(201).json({
            message:"User created successfully",
            success:true,
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    };
};
    


    export const login = async (req, res) => {
        try {
            const {email, password, role} = req.body;
            if(!email || !password ||!role){
                return res.status(400).json({
                    message:"All fields are required",
                    success:false,
                });
            };
            // check if user exists
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"Incorrect email or password",
                    success:false,
                });
            };
            // check if password is correct
            const isPassword = await bcrypt.compare(password, user.password);
            if(!isPassword){
                return res.status(400).json({
                    message:"Invalid password",
                    success:false,
                });
            };
            // check if role is correct
            if(user.role !== role){
                return res.status(400).json({
                    message:"Invalid role",
                    success:false,
                });
            };

            // create token
          const tokenData = {
            userId:user._id,
          }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "7d" });

         const  userData = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }

            return res.status(200).cookie("token", token, {maxAge: 7*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({ message: `Welcome ${user.fullname}`, user: userData, success: true });

        } catch (error) {
          console.log(error);
        }
    
    };



    export const logout = async (req, res) => {
        try {
          return res.status(200).clearCookie("token", "", {maxAge:0}).json({ message: "Logged out successfully", success: true });
        } catch (error) {
            res.status(500).json({
                message:"Internal server error",
                success:false,
            });
        }
    };

    export const updateProfile = async (req, res) => {
        try {
            const {fullname, email, phoneNumber, bio, skills} = req.body;
            const file = req.file;
        
     
             // cloudinary upload....
           let skillsArray;
            if(skills){
             skillsArray = skills.split(",");
            }
             const userId = req.id;
            let user = await User.findById(userId);
            if(!user){
                return res.status(400).json({
                    message:"User not found",
                    success:false,
                });
            };
           if(fullname) user.fullname = fullname;
            if(email) user.email = email;
            if(phoneNumber) user.phoneNumber = phoneNumber;
            if(bio) user.profile.bio = bio;
            if(skills) user.profile.skills = skillsArray;

         
            
           
            


            // resume comes later...

            await user.save();

            user = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
            return res.status(200).json({
                message:"Profile updated successfully",
                success:true,
            });
        } catch (error) {
            res.status(500).json({
                message:"Internal server error",
                success:false,
            });
        }
    }

    // get all users profile
    export const getAllUsers = async (req, res) => {
        try {
            const users = await User.find({});
            return res.status(200).json({
                message:"All users fetched successfully",
                success:true,
                users,
            });
        } catch (error) {
            res.status(500).json({
                message:"Internal server error",
                success:false,
            });
        }
    }

   