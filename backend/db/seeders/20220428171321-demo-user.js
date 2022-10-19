'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = 'Everswole';
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
   return queryInterface.bulkInsert(options, [
     {
       email: 'demo@user.com',
       username: 'Demo User',
       hashedPassword: bcrypt.hashSync('password')
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
   return queryInterface.bulkDelete(options, null, {});
  }
};
