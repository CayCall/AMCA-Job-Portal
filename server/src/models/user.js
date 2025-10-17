import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: {
        type: String, required: true, unique: true, trim: true, lowercase: true,
        validate: {
            validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Invalid email format"
        }
    },
    image: { type: String, default: null, trim: true },
    resume: { type: String, default: null, trim: true },
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

const User = mongoose.model("User", userSchema);

export default User;

