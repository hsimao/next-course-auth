import { MongoClient } from "mongodb";

const mongodbConnectUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iekg0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  const client = await MongoClient.connect(mongodbConnectUrl);
  return client;
}
