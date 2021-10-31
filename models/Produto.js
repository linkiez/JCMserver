const moment = require('moment')
const conexao = require('../infra/conexao')

class Produto {
    adiciona(produto, res){

        const produtoEhValido = produto.nome.length >= 5

        const validacoes = [
            {
                nome: 'nome',
                valido: produtoEhValido,
                mensagem: 'Produto deve ter pelo menos cinco caracteres'
            }
        ]
        
        const erros =  validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')

            const produtoDatado = {...produto, dataCriacao}
            const sql = 'INSERT INTO PRODUTOS SET ?'
     
            conexao.query(sql, produtoDatado, (erro, resultado) => {
                if(erro){
                    console.log(erro.message)
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultado) //retorna o produto com id para uso
                }
            })
        }
    }
    lista(res){
        const sql = 'SELECT * FROM PRODUTOS'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                console.log(erro.message)
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
        })
    }
    buscaPorId(id, res){
        const sql = `SELECT * FROM PRODUTOS WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const resultado = resultados[0]
            if(erro){
                console.log(erro.message)
                res.status(400).json(erro)
                console.log(erro)
            }else{
                if(resultado == undefined){
                    res.status(404).json({mensagem: "Produto não encontrado."})
                }else{
                    res.status(200).json(resultado)
                    console.log(resultado)
                }
            }
        })
    }
    altera(id, valores, res){
        valores.dataCriacao = moment(valores.dataCriacao).format('YYYY-MM-DD HH:mm:ss')
        const dataAtualizacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const valoresDatado = {...valores, dataAtualizacao}

        const sql = 'UPDATE PRODUTOS SET ? WHERE id=?'

        conexao.query(sql, [valoresDatado, id], (erro, resultados) => {
            if(erro){
                console.log(erro.message);
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
        })

    }
    deleta(id, res){
        const sql = 'DELETE FROM PRODUTOS WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                console.log(erro.message)
                res.status(400).json(erro)
            }else{
                res.status(201).json({id})
            }
        })
    }
}

module.exports = new Produto
