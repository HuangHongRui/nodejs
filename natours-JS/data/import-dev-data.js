const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../models/tourModel");

dotenv.config({ path: "./config.env" });

const data = JSON.parse(fs.readFileSync(`${__dirname}/simple.json`));

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then(() => {
  // console.log(con.connections);
  console.log("Connect is successful.");
});

const importData = async () => {
  try {
    await Tour.create(data);
    console.log("Create is successful.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Delete is successful.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
