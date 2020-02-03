const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('customers').select('id', 'username', 'password',"email","location");
}

function findBy(filter) {
  return db('customers').where(filter);
}

async function add(user) {
  const [id] = await db('customers').insert(user);

  return findById(id);
}

function findById(id) {
  return db('customers')
    .where({ id })
    .first();
}