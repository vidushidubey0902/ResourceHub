import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import Resource from "./models/resourceModel.js";

import noteRoutes from "./routes/noteRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import resourceReportRoutes from "./routes/resourceReportRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://dev-10.vercel.app",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cron.schedule("0 0 1 * *", async () => {
  try {
    await Resource.updateMany({}, { $set: { monthlyViews: 0 } });
    console.log("Monthly views reset to 0");
  } catch (error) {
    console.error("error resetting monthly views:", error);
  }
});

app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/resources/report", resourceReportRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
