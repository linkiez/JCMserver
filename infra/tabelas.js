class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarProdutos();
    this.criarFornecedores();
    this.criarPedidoCompras();
  }

  criarProdutos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS PRODUTOS (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, categoria varchar(255), espessura varchar(255), peso varchar(255), dataCriacao datetime, dataAtualizacao datetime, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro, resultado) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultado.message);
      }
    });
  }

  criarFornecedores() {
    const sql =
      "CREATE TABLE IF NOT EXISTS FORNECEDORES (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, contato varchar(255), telefone varchar(255), email varchar(255), endereco varchar(255), municipio varchar(255), estado varchar(255), cep varchar(255), ie_rg varchar(255), cnpj_cpf varchar(255), descricao MEDIUMTEXT, dataCriacao datetime, dataAtualizacao datetime, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro, resultado) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultado.message);
      }
    });
  }

  criarPedidoCompras() {
    const sql =
      "CREATE TABLE IF NOT EXISTS PEDIDO_COMPRAS (id int NOT NULL AUTO_INCREMENT, fornecedor_id int NOT NULL, dataCriacao date, cond_pagamento varchar(255), frete decimal(15,2), transporte varchar(255), pedido varchar(255), PRIMARY KEY(id), FOREIGN KEY(fornecedor_id) REFERENCES FORNECEDORES(id))";

    const sql2 =
      "CREATE TABLE IF NOT EXISTS PEDIDO_COMPRA_ITENS (id int NOT NULL AUTO_INCREMENT, pedido_compras int NOT NULL, material int, dimensao varchar(255), quantidade float DEFAULT '0', peso float DEFAULT '0', preco decimal(15,2) DEFAULT '0,00', ipi decimal(5,2) DEFAULT '0,00', prazo date, PRIMARY KEY(id), FOREIGN KEY(pedido_compras) REFERENCES PEDIDO_COMPRAS(id) ON DELETE CASCADE, FOREIGN KEY(material) REFERENCES PRODUTOS(id))";

    this.conexao.query(sql, (erro, resultado) => {
      if (erro) {
        console.log(erro);
        return connection.rollback(function () {
          throw err;
        });
      } else {
        console.log(resultado.message);
      }
    });

    this.conexao.query(sql2, (erro, resultado) => {
      if (erro) {
        console.log(erro);
        return connection.rollback(function () {
          throw err;
        });
      } else {
        console.log(resultado.message);
      }
    });

  }
}

module.exports = new Tabelas();
