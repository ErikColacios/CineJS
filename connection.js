const {Client} = require('pg')

// Tiene que usar la clase Client por huevos
const bbdd = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "system",
    database: "cine"
})

module.exports = bbdd