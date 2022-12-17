let concerts = require('../data/db')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(concerts)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const concert = concerts.find((c) => c.id === id)
        resolve(concert)
    })
}

function create(concert) {
    return new Promise((resolve, reject) => {
        const newConcert = {id: uuidv4(), ...concert}
        concerts.push(newConcert)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/db.json', concerts);
        }
        resolve(newConcert)
    })
}

function update(id, concert) {
    return new Promise((resolve, reject) => {
        const index = concerts.findIndex((p) => p.id === id)
        concerts[index] = {id, ...concert}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/db.json', concerts);
        }
        resolve(concerts[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        concerts = concerts.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/db.json', concerts);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}