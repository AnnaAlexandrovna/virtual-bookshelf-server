import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongod = new MongoMemoryServer();

export const connect = async () => {
  await mongod.start();
  const uri = await mongod.getUri();
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  mongoose.disconnect();
  await mongoose.connect(uri, connectionOptions);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for(let key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
