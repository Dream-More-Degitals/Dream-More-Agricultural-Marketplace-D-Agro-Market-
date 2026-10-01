import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
    console.error("Please configure MONGO_URI in your .env file or Render dashboard.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // If running in development without live MongoDB, log helpful guidance
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Database Notice] To use MongoDB Atlas, set MONGO_URI=mongodb+srv://... in backend/.env");
    }
    throw error;
  }
};

export default connectDB;