
import http from "http";
import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/client.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB();
   
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

startServer();