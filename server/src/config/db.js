import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect("mongodb+srv://calebcalvin9_db_user:zQnFG8HiBEVSqPYg@amca-job-portal.8gx8lax.mongodb.net/amca_portal?retryWrites=true&w=majority")
    .then(()=>{console.log("Database has been connected.")})
    .catch(err => console.error(`DB connection error: ${err}`))
}
    
export default connectDB


