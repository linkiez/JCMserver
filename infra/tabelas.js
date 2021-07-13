class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarProdutos()
    }

    criarProdutos() {
        const sql = 'CREATE TABLE IF NOT EXISTS PRODUTOS (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, categoria varchar(255), espessura varchar(255), peso varchar(255), dataCriacao datetime, dataAtualizacao datetime, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro, resultado) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado.message)
            }
        })
    }
}

module.exports = new Tabelas