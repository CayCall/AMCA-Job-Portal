import mongoose from 'mongoose'

const connectDB = () => {
    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI)
    .then(()=>{console.log("Database has been connected.")})
    .catch(err => console.error(`DB connection error: ${err}`))
}
    
export default connectDB


