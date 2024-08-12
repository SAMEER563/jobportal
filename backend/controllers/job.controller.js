import { Job } from "../models/job.model.js";


// post job by admin
export const postJob = async (req, res) => {
    try {
        const {title, description, salary, location, jobType, experience, position, requirements,  companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !salary || !location || !requirements|| !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });
        };
        const job = await Job.create({
            title,
            description,
            salary: parseInt(salary),
            location,
            jobType,
            experienceLevel: experience,
            requirements: requirements.split(','),
            position,
            company: companyId,
            created_by: userId
        });
        res.status(201).json({
            message:"Job created successfully",
            success:true,
            data:job
        });

    } catch (error) {
        console.log(error);
        
    }

}
// get all jobs by keyword for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: { $regex: keyword, $options: 'i'}},
                {location: { $regex: keyword, $options: 'i'}},
                {jobType: { $regex: keyword, $options: 'i'}}, 
            ]
        };
        const jobs = await Job.find(query).populate('company').sort({createdAt: -1});
        if(!jobs){
            return res.status(400).json({
                message:"Jobs not found",
                success:false,
            });
        };
        res.status(200).json({
            message:"Jobs found",
            success:true,
            data:jobs
        });
    } catch (error) {
        console.log(error);
        
    }
}

// get job by id
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false,
            });
        }
        res.status(200).json({
            message:"Job found",
            success:true,
            data:job
        });
    } catch (error) {
        console.log(error);
        
    }
}

// job status by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId});
        if(!jobs){
            return res.status(400).json({
                message:"Jobs not found",
                success:false,
            });
        }   
        res.status(200).json({
            message:"Jobs found",
            success:true,
            data:jobs
        });
    } catch (error) {
        console.log(error);
        
    }
}

// update job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const {title, description, salary, location, jobType, experience, position, requirements} = req.body;
        
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false,
            });
        }
        if(title) job.title = title;
        if(description) job.description = description;
        if(salary) job.salary = salary;
        if(location) job.location = location;
        if(jobType) job.jobType = jobType;
        if(experience) job.experienceLevel = experience;
        if(position) job.position = position;
        if(requirements) job.requirements = requirements.split(',');

      
        await job.save();
        res.status(200).json({
            message:"Job updated successfully",
            success:true,
            data:job
        });
    } catch (error) {
        console.log(error);
        
    }
}