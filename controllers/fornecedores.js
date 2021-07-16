
const Fornecedor = require('../models/Fornecedor.js')

module.exports = app => {
    app.get('/fornecedor', (req, res) => {
        Fornecedor.lista(res)

    })

    app.get('/fornecedor/:id', (req, res) => {
        const id = req.params.id

        Fornecedor.buscaPorId(id, res)
    })

    app.post('/fornecedor', (req, res) => {
        const fornecedor = req.body
        console.log(produto)
        Fornecedor.adiciona(fornecedor, res)

    })

    app.put('/fornecedor/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Fornecedor.altera(id, valores, res)
    })

    app.delete('/fornecedor/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Fornecedor.deleta(id, res)
    })











}