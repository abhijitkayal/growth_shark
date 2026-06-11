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

    const conn = await mongoose.connect(
      "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/blog?retryWrites=true&w=majority&appName=HACKETHIC"
    );

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