const Sequelize = require('sequelize');
const db = require('./database');

const Book = db.define('book', {
  barcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  subtitle: {
    type: Sequelize.STRING
  },
  authors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

module.exports = Book;
