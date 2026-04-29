import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURI(dbname) {
  // Pull the MongoDB credentials from environment variables
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  // Construct the connection string
  const connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}.zlzipce.mongodb.net/`;

  if (!MONGO_USER || !MONGO_PWD || !MONGO_CLUSTER) {
    console.error(
      "Error: One or more MongoDB environment variables are not defined in .env",
    );
    return "";
  }

  // Ensure there is exactly one slash between the URI and the dbname
  const baseURI = connection_string.endsWith("/")
    ? connection_string
    : `${connection_string}/`;

  const finalURI = `${baseURI}${dbname}?retryWrites=true&w=majority`;

  console.log("Connecting to MongoDB database:", dbname);
  return finalURI;
}

// Mongoose 6+ does not need useNewUrlParser or useUnifiedTopology
mongoose
  .connect(getMongoURI("users"))
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.log("Connection Error:", error));

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function getUsers(name, job) {
  if (name === undefined && job === undefined) {
    return userModel.find();
  } else if (name && !job) {
    return findUserByName(name);
  } else if (job && !name) {
    return findUserByJob(job);
  } else {
    return userModel.find({ name: name, job: job });
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function removeUser(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  removeUser,
};
