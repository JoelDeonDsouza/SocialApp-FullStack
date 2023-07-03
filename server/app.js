//# inital dependencies #//
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
// node //
import path from "path";
import { fileURLToPath } from "url";

// * Middle ware configuration *//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
// Server configuration //
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "26mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "26mb", extended: true }));
app.use(cors());
// Storages configuration //
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// controller //
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
// Routes //
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// Auth verification //
import { verifyToken } from "./middleware/auth.js";

// # Code storage #//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// controller //
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
// route //
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// * MongoDB configuration * //
const PORT = process.env.PORT_BASE_CONNECTION_STRING;
mongoose
  .connect(process.env.DATA_BASE_CONNECTION_STRING)
  .then(() => {
    console.log("Expi Data Base is Connection is Successfull on port " + PORT);
  })
  .catch((err) => console.log(err));

// Development Phase
app.listen(process.env.PORT_BASE_CONNECTION_STRING, () => {
  console.log("Server running");
});
