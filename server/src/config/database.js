import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
}

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export default async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            //dbName:"amca_portal",
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
            console.log("[Mongo] connected");
            return m;
        }).catch((e) => {
            console.error("[Mongo] connection error:", e?.message);
            throw e;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
