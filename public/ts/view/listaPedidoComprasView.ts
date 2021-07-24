export class ListaPedidoComprasView {
  tabela: HTMLTableSectionElement;

  constructor() {
    this.tabela = document.querySelector("tbody");
  }

  montaTabela(arrayPedidos: any[]) {
    arrayPedidos.forEach((pedido) => {
      this.tabela.appendChild(this.montaTr(pedido));
    });
  }

  montaTr(pedido: any): HTMLTableRowElement {
    let tr = document.createElement("tr");
    tr.setAttribute("id", String(pedido.id));

    let data = new Date(pedido.dataCriacao);
    let dataFormatada =
      data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();

    let idTd = document.createElement("td");
    let emissaoTd = document.createElement("td");
    let fornecedorTd = document.createElement("td");
    let valorTd = document.createElement("td");

    idTd.innerHTML = `${pedido.id}`;
    emissaoTd.innerHTML = `${dataFormatada}`;
    fornecedorTd.innerHTML = `${pedido.fornecedor}`;
    valorTd.innerHTML = `${pedido.total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`;

    tr.appendChild(idTd);
    tr.appendChild(emissaoTd);
    tr.appendChild(fornecedorTd);
    tr.appendChild(valorTd);

    return tr;
  }
}
