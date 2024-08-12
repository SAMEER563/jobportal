import express from "express";
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    website: {
        type: String,
       
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
   
    location: {
        type: String,
        
    },
    logo: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        
    }
},{timestamps:true});
export const Company = mongoose.model('Company', companySchema);