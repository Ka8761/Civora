import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
 // Load environment variables from .env file

const MONGODB_URI = process.env.MONGODB_URI;
console.log("ALL ENVS:", process.env);
console.log("SPECIFIC URI:", process.env.MONGODB_URI);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
