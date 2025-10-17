import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, trim: true, minlength: 2 },
    email: {
        type: String, required: true, unique: true, trim: true, lowercase: true,
        validate: {
            validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Invalid email format"
        }
    },
    imageUrl: { type: String, default: null, trim: true },
    resumeUrl: { type: String, default: null, trim: true },
},
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

