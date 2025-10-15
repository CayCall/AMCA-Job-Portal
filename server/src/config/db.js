import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect("mongodb+srv://calebcalvin9_db_user:zQnFG8HiBEVSqPYg@amca-job-portal.8gx8lax.mongodb.net/?retryWrites=true&w=majority&appName=amca-job-portal")
    .then(()=>{console.log("Database has been connected.")})
    .catch(err => console.error(`DB connection error: ${err}`))
}
    
export default connectDB


