import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false,
            });
        };
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"Company already exists",
                success:false,
            });
        };
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        res.status(201).json({
            message:"Company registered successfully",
            success:true,
            data:company
        });
    } catch (error) {
        console.log(error);
    }
}

// get company
export const getCompany = async (req, res) => {
    try {
       const userId = req.id;
         const companies = await Company.findOne({userId});
         if(!companies){
             return res.status(400).json({
                 message:"Companies not found",
                 success:false,
             });
         };
            res.status(200).json({
                message:"Companies found",
                success:true,
                data:companies
            });
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false,
            });
        }
        res.status(200).json({
            message:"Company found",
            success:true,
            data:company
        });
    } catch (error) {
        console.log(error);
    }
}

// update company
export const updateCompany = async (req, res) => {
    try {
       const {name, website, location, description} = req.body;
       const file = req.file;
       // cloudinary upload...

       const updateData = {name, website, location, description};
       const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
       if(!company){
           return res.status(400).json({
               message:"Company not found",
               success:false,
           });
       }
         res.status(200).json({
              message:"Company updated successfully",
              success:true,
              data:company
         });
    } catch (error) {
        console.log(error);
    }
}