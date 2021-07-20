
const Fornecedor = require('../models/PedidoCompras.js')

module.exports = app => {
    app.get('/pedidocompras', (req, res) => {
        PedidoCompras.lista(res)

    })

    app.get('/pedidocompras/:id', (req, res) => {
        const id = req.params.id

        PedidoCompras.buscaPorId(id, res)
    })

    app.post('/pedidocompras', (req, res) => {
        const pedidocompra = req.body
        PedidoCompras.adiciona(pedidocompras, res)

    })

    app.put('/pedidocompras/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        PedidoCompras.altera(id, valores, res)
    })

    app.delete('/pedidocompras/:id', (req, res) => {
        const id = parseInt(req.params.id)

        PedidoCompras.deleta(id, res)
    })











}