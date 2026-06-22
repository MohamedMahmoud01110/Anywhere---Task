const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful");
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.error("DB connection error:", err);
  }
});

// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection");
  server.close(() => process.exit(1));
});

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception");
  process.exit(1);
});
