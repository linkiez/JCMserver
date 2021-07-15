import { ListaProduto } from "../model/ListaProduto.js";
import { ListaProdutoView } from "../view/listaProdutoView.js";

export class ListaProdutoController {
  private listaProduto: ListaProduto;
  private listaProdutoView: ListaProdutoView;
  private inputBusca: HTMLInputElement;
  private tabela: HTMLTableSectionElement;

  constructor() {
    this.listaProduto = new ListaProduto();
    this.listaProdutoView = new ListaProdutoView();
    this.inputBusca = document.querySelector("#inputBusca");
    this.tabela = document.querySelector("tbody");

    console.log("ListaProdutoController carregado.");
  }

  async init() {
    this.listaProdutoView.montaTabela(await this.listaProduto.getProdutos());
    this.inputBusca.addEventListener("input", () => {
      this.listaProdutoView.filtraTabela(
        this.listaProduto.getProdutos(),
        this.inputBusca.value
      );
    });

    this.tabela.addEventListener("click", (event) => {
      let td = <HTMLTableCellElement>event.target;
      let tr = <HTMLTableRowElement>td.parentNode;

      window.location.href = "./produto.html?id=" + tr.getAttribute("id");
    });
  }
}

var listaProdutoController = new ListaProdutoController();
listaProdutoController.init();
