const mysql = require('mysql2')


const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'fabio123',
    database: 'jcmmetais'
})

/*
const conexao = mysql.createConnection({
    host: 'jcmmetais.com.br',
    port: '3306',
    user: 'jcmmet23_linkiez',
    password: 'fabio123',
    database: 'jcmmet23_banco'
})
*/
module.exports = conexao