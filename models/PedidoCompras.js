const moment = require("moment");
const conexao = require("../infra/conexao");

class PedidoCompras {
  adiciona(pedidocompras, res) {}

  lista(res) {}

  buscaPorId(id, res) {}

  altera(id, valores, res) {}

  deleta(id, res) {}
}

module.exports = new PedidoCompras();
