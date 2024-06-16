// middlewares/auth.js
const connectDB = require('../db');
const { ObjectId } = require('mongodb');

const auth = (requiredPermissions) => {
  return async (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(403).send('Not authenticated');
    }

    const userId = req.session.user.id;
    try {
      const db = await connectDB();
      const usersCollection = db.collection('users');
      const rolesCollection = db.collection('roles');
      console.log(req.session.user._id);
      const user = await usersCollection.findOne({ id: userId });
      if (!user) {
        return res.status(403).send('User not found');
      }

      const role = await rolesCollection.findOne({ id: user.role.id });
      if (!role) {
        return res.status(403).send('Role not found');
      }

      const hasPermission = requiredPermissions.every(permission => role.permissions.includes(permission));
      if (!hasPermission) {
        return res.status(403).send('Insufficient permissions');
      }
      console.log(user)
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  };
};

module.exports = auth;