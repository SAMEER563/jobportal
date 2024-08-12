import {Application} from '../models/application.model.js';
import { Job } from '../models/job.model.js';


//apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required ",
                success:false,
            });
        };

        // check if user has already applied for the job
        const existingApplication = await Application.findOne({job: jobId, user: userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false,
            });
        };

        // check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false,
            });
        };

        // create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        res.status(200).json({
            message:"Application submitted successfully",
            success:true,
            data:newApplication
        });
    
    } catch (error) {
        console.log(error);
        
    }
};



// get applied jobs
export const getAppliedJobs  = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: 'job',
            options: { sort: { 'createdAt': -1 } },
            populate: {
                path: 'company',
                options: { sort: { 'createdAt': -1 } },
            }
        })
        if(!application){
            return res.status(400).json({
                message:"Applications not found",
                success:false,
            });
        };
        res.status(200).json({
            message:"Applications found",
            success:true,
            data:application
        });
    } catch (error) {
        console.log(error);
        
    }
};



// get applicants
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate('applications').sort({createdAt: -1});
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false,
            });
        };
        const applicants = await Application.find({job: jobId}).populate('applicant').sort({createdAt: -1});
        if(!applicants){
            return res.status(400).json({
                message:"Applicants not found",
                success:false,
            });
        };
        res.status(200).json({
            message:"Applicants found",
            success:true,
            data:applicants
        });
    } catch (error) {
        console.log(error);
        
    }
}; 



// update application status
export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const status = req.body.status;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false,
            });
        };
        // check if application exists
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(400).json({
                message:"Application not found",
                success:false,
            });
        };
        // update application status
        application.status = status.toLowerCase();
        await application.save();
        res.status(200).json({
            message:"Application status updated successfully",
            success:true,
            data:application
        });
    } catch (error) {
        console.log(error);
        
    }
};
