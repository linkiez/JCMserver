const moment = require('moment')
const conexao = require('../infra/conexao')

class Fornecedor {
    adiciona(fornecedor, res){

        const fornecedorEhValido = fornecedor.nome.length >= 5

        const validacoes = [
            {
                nome: 'nome',
                valido: fornecedorEhValido,
                mensagem: 'Produto deve ter pelo menos cinco caracteres'
            }
        ]
        
        const erros =  validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')

            const fornecedorDatado = {...fornecedor, dataCriacao}
            const sql = 'INSERT INTO FORNECEDORES SET ?'
     
            conexao.query(sql, fornecedorDatado, (erro, resultado) => {
                if(erro){
                    res.status(400).json(erro)
                    console.log(erro);
                }else{
                    res.status(201).json(resultado) //retorna com id para uso
                    console.log(resultado);
                }
            })
        }
    }
    lista(res){
        const sql = 'SELECT * FROM FORNECEDORES'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
        })
    }
    buscaPorId(id, res){
        const sql = `SELECT * FROM FORNECEDORES WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const resultado = resultados[0]
            if(erro){
                res.status(400).json(erro)
                console.log(erro)
            }else{
                if(resultado == undefined){
                    res.status(404).json({mensagem: "Fornecedor não encontrado."})
                }else{
                    res.status(200).json(resultado)
                    console.log(resultado)
                }
            }
        })
    }
    altera(id, valores, res){
        const dataAtualizacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const valoresDatado = {...valores, dataAtualizacao}

        const sql = 'UPDATE FORNECEDORES SET ? WHERE id=?'

        conexao.query(sql, [valoresDatado, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
        })

    }
    deleta(id, res){
        const sql = 'DELETE FROM FORNECEDORES WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json({id})
            }
        })
    }
}

module.exports = new Fornecedor