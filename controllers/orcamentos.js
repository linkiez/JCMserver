const Orcamento = require('../models/Orcamento.js')

module.exports = app => {
    app.get('/orcamento/', (req, res) => {
        const pagina = req.query.pagina
        const limite = req.query.limite
        Orcamento.lista(pagina, limite, res)
    })

    app.get('/orcamento/:id', (req, res) => {
        const id = "\""+ req.params.id + "\""
        Orcamento.buscaPorId(id, res)
    })

    app.post('/orcamento/', (req, res) => {
        const orcamento = req.body
        Orcamento.adiciona(orcamento, res)
    })

    app.delete('/orcamento/:id', (req, res) => {
        const id = req.params.id
        Orcamento.deleta(id, res)
    })

    app.put('/orcamento/:id', (req, res) => {
        const id = req.params.id
        const valores = req.body
        Orcamento.altera(id, valores, res)
    })
} 