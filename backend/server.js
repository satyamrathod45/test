import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";

dotenv.config();

/*
----------------------------------------
Database Connection
----------------------------------------
*/
connectDB();

/*
----------------------------------------
Express App
----------------------------------------
*/
const app = express();

/*
----------------------------------------
Middleware
----------------------------------------
*/
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

/*
----------------------------------------
Health Route
----------------------------------------
*/
app.get("/", (req, res) => {
  res.send("LifeLine API Running 🚑");
});

/*
----------------------------------------
Create HTTP Server
----------------------------------------
*/
const server = http.createServer(app);

/*
----------------------------------------
Socket.IO Setup
----------------------------------------
*/
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }
});

/*
----------------------------------------
Make Socket Global
Controllers will use global.io
----------------------------------------
*/
global.io = io;

/*
----------------------------------------
Socket Connection
----------------------------------------
*/
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  /*
  Join tracking room for a request
  */

  socket.on("joinRequestRoom", (requestId) => {

    socket.join(requestId);

    console.log(`Socket ${socket.id} joined request room ${requestId}`);

  });

  /*
  Donor sending location
  */

  socket.on("donorLocationUpdate", (data) => {

    const { requestId, latitude, longitude } = data;

    io.to(requestId).emit("donorLocationUpdate", {
      latitude,
      longitude
    });

  });

  /*
  Disconnect
  */

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id);

  });

});

/*
----------------------------------------
Routes
----------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/request", requestRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/document", documentRoutes);

app.use("/api/donor", donorRoutes);


/*
----------------------------------------
Server Start
----------------------------------------
*/

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});