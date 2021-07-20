import { ListaFornecedor } from "../model/ListaFornecedor.js";
import { ListaFornecedoresView } from "../view/listaFornecedoresView.js";

export class ListaFornecedoresController {
  private listaFornecedores: ListaFornecedor;
  private listaFornecedoresView: ListaFornecedoresView;
  private inputBusca: HTMLInputElement;

  constructor() {
    this.listaFornecedores = new ListaFornecedor();
    this.listaFornecedoresView = new ListaFornecedoresView();
    this.inputBusca = document.querySelector("#inputBusca");
  }

  async init() {
    this.listaFornecedoresView.montaTabela(
      await this.listaFornecedores.getFornecedores()
    );

    this.listaFornecedoresView.tabela.addEventListener("click", (event) => {
      let td = <HTMLTableCellElement>event.target;
      let tr = <HTMLTableRowElement>td.parentNode;

      window.location.href = "./fornecedor.html?id=" + tr.getAttribute("id");
    });

    this.inputBusca.addEventListener("input", () => {
      this.listaFornecedoresView.filtraTabela(
        this.listaFornecedores.getFornecedores(),
        this.inputBusca.value
      );
    });
  }
}

let controller = new ListaFornecedoresController();
controller.init();
