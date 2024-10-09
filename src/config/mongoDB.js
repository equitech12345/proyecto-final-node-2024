import { connect } from "mongoose";
console.log('MONGODB_URI', process.env.MONGO_URI)
async function connectDB() {
    await connect(process.env.MONGO_URI)
}
connectDB()
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Error connecting to MongoDB'))
