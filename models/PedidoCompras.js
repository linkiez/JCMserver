const moment = require("moment");
const conexao = require("../infra/conexao");

class PedidoCompras {
  adiciona(pedidocompra, res) {
    const itensArray = pedidocompra.itens;
    delete pedidocompra.itens;

    pedidocompra.dataCriacao = moment().format("YYYY-MM-DD");

    conexao.beginTransaction((error) => {
      if (error) {
        res.status(500).json(error);
        throw error;
      }
      var sql = "INSERT INTO PEDIDO_COMPRAS SET ?";
      var insertId = 0;

      conexao.query(sql, pedidocompra, (erro, resultado) => {
        if (erro) {
          res.status(400).json(erro);
          conexao.rollback(function () {
            throw erro;
          });
        } else {
          insertId = resultado.insertId;
          console.log(resultado);
          sql = "INSERT INTO PEDIDO_COMPRA_ITENS SET ?";

          itensArray.forEach((item) => {
            item.pedido_compras = insertId;
            item.prazo = moment(item.prazo, "DD/MM/YYYY").format("YYYY-MM-DD");

            conexao.query(sql, item, (erro, resultado) => {
              if (erro) {
                res.status(400).json(erro);
                conexao.rollback(function () {
                  throw erro;
                });
              } else {
                console.log(resultado);
              }
            });
          });

          conexao.commit(function (erro) {
            if (erro) {
              conexao.rollback(function () {
                throw erro;
              });
            }
            console.log("Transaction Completed Successfully.");
            
          });
          res.status(201).json(resultado)
        }
      });
    });
  }

  lista(res) {}

  buscaPorId(id, res) {}

  altera(id, valores, res) {}

  deleta(id, res) {}
}

module.exports = new PedidoCompras();
