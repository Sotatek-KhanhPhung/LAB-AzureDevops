// import express from "express";
// import cors from "cors";
// import db from "./app/models/index.js";
// import tutorialRoutes from "./app/routes/tutorial.routes.js";
 
// const app = express();
 
// const corsOptions = {
//     origin: "http://localhost:5173",
// };
 
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
 
// // Simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to the Tutorial Application." });
// });
 
// // Routes
// tutorialRoutes(app);
 
// // Sync database
// db.sequelize.sync().then(() => {
//     console.log("Synced db.");
// });
 
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import tutorialRoutes from "./app/routes/tutorial.routes.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map(x => x.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed"));
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Tutorial Application." });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

tutorialRoutes(app);

db.sequelize.sync()
  .then(() => console.log("Synced db."))
  .catch(err => console.error("DB sync error:", err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});