const mysql = require('mysql2/promise')
async function conectar() {
    const conexao = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'senai',
        database : 'Biblioteca'
    })
    return conexao;
}


module.exports = conectar