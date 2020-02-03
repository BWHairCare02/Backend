const db = require('../data/dbConfig')

function get() {
    return db('stylists').select('username','location','email')
}

function getById(id) {
    return db('stylists')//
}

function find() {
    return db('stylists').select('id','username')
}

function findBy(filter) {
    return db('stylists')
        .where(filter)
}

async function add(user) {
    let ids = await db('stylists')
        .insert(user, 'id');
    const [id] = ids;
    return findById(id);
}

function findById(id) {
    return db('stylists')
        .where({ id })
        .first();
}

module.exports = {
    get,
    add,
    find,
    findBy,
    findById
}