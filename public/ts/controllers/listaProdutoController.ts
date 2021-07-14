import { ListaProduto } from "../model/ListaProduto.js";
import { ListaProdutoView } from "../view/listaProdutoView.js";

export class ListaProdutoController {
  private listaProduto: ListaProduto;
  private listaProdutoView: ListaProdutoView;
  private inputBusca: HTMLInputElement;

  constructor() {
    this.listaProduto = new ListaProduto();
    this.listaProdutoView = new ListaProdutoView();
    this.inputBusca = document.querySelector("#inputBusca");

    console.log("ListaProdutoController carregado.");
  }

  atualizaProduto() {
    //this.listaProdutoView.montaTabela(this.listaProduto.getProdutos())
  }

  async init() {
    this.listaProdutoView.montaTabela(await this.listaProduto.getProdutos());
    this.inputBusca.addEventListener(
      "input",
      () => {
        this.listaProdutoView.filtraTabela(
          this.listaProduto.getProdutos(),
          this.inputBusca.value
        )
      }
    );
  }


}

var listaProdutoController = new ListaProdutoController();
listaProdutoController.init();
