const moment = require('moment')
const conexao = require('../infra/conexao')

class Orcamento{
    lista (pagina, limite, res){
        if(pagina == null ) pagina = 0;
        if(limite == null ) limite = 10;
        if(pagina > 0) pagina = pagina * limite;
        const sql = `SELECT * FROM ORCAMENTO ORDER BY COD_ORCAMENTO LIMIT ${pagina}, ${limite};`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        
        var sql = `SELECT * FROM ORCAMENTO WHERE COD_ORCAMENTO=${id}`

        conexao.query(sql, (erro, resultados) => {
            var orcamento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            } else {
                sql = `SELECT * FROM ORC_ITENS WHERE COD_ORCAMENTO=${id}`
                conexao.query(sql, (erro, itens) => {
                    if(erro){
                        res.status(400).json(erro)
                    }else{
                        orcamento["ITENS"] = itens
                        res.status(200).json(orcamento)
                    }
                })
            }
        })
    }

    adiciona(orcamento, res){
        const itens = orcamento["ITENS"]
        delete orcamento["ITENS"]

        var sql = 'INSERT INTO ORCAMENTO SET ?'
        var itensArray = [] 

        itens.forEach(row => {
            itensArray.push(Object.values(row))
        })

        conexao.query(sql, orcamento, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                              
                sql = 'INSERT INTO ORC_ITENS (COD_ORCAMENTO, DESCRICAO, MATERIAL, MAT_INCLUIDO, TERCEIRO, GUILHOTINA, PLASMA, LASER, DOBRA, PUNCAO, PRENSA, CALANDRA, FURADEIRA, METALEIRA, EXPEDICAO, LARGURA, ALTURA, QUANTIDADE, IMPOSTO, TEMPO_LASER, PRECO_QUILO, PRECO_HORA, RIR, TOTAL_MANUAL, TOTAL_ITEM, PESO_KG) VALUES ?'
                conexao.query(sql, [itensArray], (erro, resultado) => {
                    if(erro){
                        res.status(400).json(erro)
                    }else{
                        res.status(201).json(resultado)
                    }
                })
            }
            
        })
    }

    deleta(id, res) {
        var sql = 'DELETE FROM ORC_ITENS WHERE COD_ORCAMENTO=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                sql = 'DELETE FROM ORCAMENTO WHERE COD_ORCAMENTO=?'
                conexao.query(sql, id, (erro, resultados) => {
                    if(erro){
                        res.status(400).json(erro)
                    }else{
                        res.status(201).json({id})
                    }
                })
            }
        })
    }
    
    altera(id, valores, res) {
        
    }
}

module.exports = new Orcamento


