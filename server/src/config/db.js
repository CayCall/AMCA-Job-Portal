import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Database has been connected.")})
    .catch(err => console.error(`DB connection error: ${err}`))
}
    
export default connectDB


