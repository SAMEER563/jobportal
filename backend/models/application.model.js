import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        require: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'accepted', 'rejected'],
        default: 'applied'
    },
    resume: {
        type: String,
        require: true
    }
}, { timestamps: true });
export const Application = mongoose.model('Application', applicationSchema);