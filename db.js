//db.js
const { MongoClient } = require('mongodb');
const dotenv = require("dotenv").config();
const logger = require("./middlewares/logger");

let db;

const connectDB = async () => {
  if (db) return db;
  try {
    const client = new MongoClient(process.env.MONGODB);
    await client.connect();
    db = client.db();
    logger.info('Connected to MongoDB');
    return db;
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

const initializeRoles = async () => {
  const db = await connectDB();
  const rolesCollection = db.collection('roles');

  const collectionInfo = await db.listCollections({ name: 'roles' }).next();
  if (collectionInfo) {
    logger.info('Roles collection already exists');
    return;
  }

  const roles = [
    { name: 'admin', id: 1, permissions: ['read', 'write', 'delete'] },
    { name: 'user', id: 2, permissions: ['read'] }
  ];


  await rolesCollection.insertMany(roles);
  logger.info('Roles initialized');
};

initializeRoles().catch(console.error);

module.exports = connectDB;

