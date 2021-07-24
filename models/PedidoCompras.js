const moment = require("moment");
const conexao = require("../infra/conexao");

class PedidoCompras {
  adiciona(pedidocompra, res) {
    var itensArray = pedidocompra.itens;
    delete pedidocompra.itens;

    pedidocompra.dataCriacao = moment().format("YYYY-MM-DD");

    conexao.beginTransaction((error) => {
      if (error) {
        res.status(400).json(error);
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

          for (let i = 0; i < itensArray.length; i++) {
            itensArray[i].pedido_compras = insertId;
            itensArray[i].prazo = moment(
              itensArray[i].prazo,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD");
          }

          sql = montaInsert(itensArray);

          conexao.query(sql, itensArray, (erro, resultado_itens) => {
            if (erro) {
              res.status(400).json(erro);
              console.log(erro);
              conexao.rollback(function () {
                throw erro;
              });
            } else {
              console.log(resultado_itens);
              conexao.commit(function (erro) {
                if (erro) {
                  conexao.rollback(function () {
                    res.status(400).json(erro);
                    throw erro;
                  });
                } else {
                  resultado.message = resultado_itens.message;
                  res.status(201).json(resultado);
                  console.log(resultado);
                  console.log("Transaction Completed Successfully.");
                }
              });
            }
          });
        }
      });
    });
  }

  lista(res) {
    var sql =
      "select pedido_compras.id, fornecedores.nome as fornecedor, pedido_compras.dataCriacao, sum(pedido_compra_itens.peso*pedido_compra_itens.preco) as total from pedido_compras inner join fornecedores on fornecedor_id = fornecedores.id inner join pedido_compra_itens on pedido_compras.id = pedido_compra_itens.pedido_compras group by pedido_compras";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    var sql = `select * from pedido_compras where id = ${id}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        //res.status(201).json(resultados);

        sql = `select * from pedido_compra_itens where pedido_compras = ${id}`;

        conexao.query(sql, (erro, resultados_itens) => {
          if (erro) {
            res.status(400).json(erro);
          } else {
            let retorno = resultados[0];
            retorno.itens = resultados_itens;
            console.log(retorno);
            res.status(201).json(retorno);
          }
        });
      }
    });
  }

  altera(id, pedidocompra, res) {
    conexao.beginTransaction((erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        var itensArray = pedidocompra.itens;
        delete pedidocompra.itens;
        delete pedidocompra.id;

        var sql = "UPDATE PEDIDO_COMPRAS SET ? WHERE id=?";

        conexao.query(sql, [pedidocompra, id], (erro, resultado) => {
          if (erro) {
            res.status(400).json(erro);
          } else {
            sql = `DELETE FROM PEDIDO_COMPRA_ITENS WHERE pedido_compras = ${id}`;

            conexao.query(sql, (erro, resultados_itens) => {
              if (erro) {
                conexao.rollback(function () {
                  console.log(erro);
                  res.status(400).json(erro);
                });
              } else {
                for (let i = 0; i < itensArray.length; i++) {
                  itensArray[i].prazo = moment(
                    itensArray[i].prazo,
                    "DD/MM/YYYY"
                  ).format("YYYY-MM-DD");
                }
                sql = montaInsert(itensArray);

                conexao.query(sql, (erro, resultado_itens) => {
                  if (erro) {
                    conexao.rollback(function () {
                      console.log(erro);
                      res.status(400).json(erro);
                    });
                  } else {
                    conexao.commit((erro) => {
                      if (erro) {
                        conexao.rollback(function () {
                          console.log(erro);
                          res.status(400).json(erro);
                        });
                      } else {
                        resultado.message = resultado_itens.message;
                        res.status(201).json(resultado);
                        console.log(resultado);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  deleta(id, res) {
    var sql = `delete from pedido_compras where id = ${id}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(resultados);
      }
    });
  }
}

module.exports = new PedidoCompras();

function montaInsert(linhas) {
  var sql = "INSERT INTO PEDIDO_COMPRA_ITENS ";
  var colunas = Object.keys(linhas[0]);
  var coluna = "(" + colunas.join() + ") VALUES";

  var valores = "";
  let valorArray = [];
  linhas.forEach((linha) => {
    let valor = Object.values(linha);
    let valor2 = valor.map((valor) => {
      return "'" + valor + "'";
    });

    valorArray.push(" (" + valor2 + ")");
  });

  valores = valorArray.join();

  sql = sql + coluna + valores;

  return sql;
}
