import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Use a specific type for the cached object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalAny = global as unknown as { mongoose?: MongooseCache };
const cached: MongooseCache = globalAny.mongoose || { conn: null, promise: null };

// Force mongoose to use the database name from the URI, not from model definition
const options = {
  bufferCommands: false,
  dbName: undefined // Let the URI control the db name
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => mongooseInstance);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

globalAny.mongoose = cached;
