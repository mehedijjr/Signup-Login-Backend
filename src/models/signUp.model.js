import { getCollection } from "../config/db.js";

const getUserCollection = () => {
  return getCollection("myProject");
};

export const findByEmail = async (email) => {
  const collection = getUserCollection();

  return await collection.findOne({ email });
};

export const createUser = async (userData) => {
  const collection = getUserCollection();
  return await collection.insertOne({
    ...userData,
    createdAt: new Date(),
  });
};
