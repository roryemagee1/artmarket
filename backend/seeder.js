import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

async function importData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".yellow.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1);
  }
}

switch(process.argv[2]) {
  case undefined:
    console.log(`You must pass a flag to backend/seeder.  Pass "-h" for help.`);
    break;
  case "-h":
    console.log(`-d: Destroys data on MongoDB server.\n-i: Imports default data to MongoDB server.`);
    break;
  case "-d":
    destroyData();
    break;
  case "-i":
    importData();
    break;
  default:
    console.log(`You must pass a flag to backend/seeder.js.  Pass "-h" for help.`);
    break;
}




