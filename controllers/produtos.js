
const Produto = require('../models/Produto')

module.exports = app => {
    app.get('/produto', (req, res) => {
        Produto.lista(res)

    })

    app.get('/produto/:id', (req, res) => {
        const id = req.params.id

        Produto.buscaPorId(id, res)
    })

    app.post('/produto', (req, res) => {
        const produto = req.body
        console.log(produto)
        Produto.adiciona(produto, res)

    })

    app.put('/produto/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Produto.altera(id, valores, res)
    })

    app.delete('/produto/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Produto.deleta(id, res)
    })











}