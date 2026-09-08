const mongoose = require("mongoose");
const dns = require("dns");

const { mongoUri } = require("./env");

// Use Google's DNS for Node's DNS lookups
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(
      `Database connected successfully: ${conn.connection.host}`
    );
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;