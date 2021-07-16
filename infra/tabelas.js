class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarProdutos();
    this.criarFornecedores();
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
      "CREATE TABLE IF NOT EXISTS FORNECEDORES (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, contato varchar(255), telefone varchar(255), email varchar(255), endereco varchar(255), municipio varchar(255), estado varchar(255), cep int, ie_rg int, cnpj_cpf int, descricao MEDIUMTEXT, dataCriacao datetime, dataAtualizacao datetime, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro, resultado) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultado.message);
      }
    });
  }
}

module.exports = new Tabelas();
