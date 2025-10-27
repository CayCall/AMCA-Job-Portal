import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyUser", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: { type: String, default: "Pending" },
    date: { type: Number, required: true }
})

jobApplicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });
const jobApplication = mongoose.model("JobApplication", jobApplicationSchema)


export default jobApplication