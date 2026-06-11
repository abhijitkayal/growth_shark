import mongoose from "mongoose";
import dns from "node:dns";

// Force Google DNS
dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const connectToDatabase = async () => {
  try {
    console.log("Using DNS Servers:", dns.getServers());

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    const conn = await mongoose.connect(mongoUri, {
      // optional mongoose options can be added here
    });

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed"
    );
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Code:", error.code);
  }
};

export default connectToDatabase;