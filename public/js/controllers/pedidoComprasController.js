import { PedidoComprasView } from "../view/pedidoComprasView.js";
import { ListaFornecedor } from "../model/ListaFornecedor.js";
import { Autocomplete } from "../helpers/autocomplete.js";
import { PedidoCompras } from "../model/pedidoCompras.js";
export class PedidoComprasController {
    constructor() {
        this.pedidoComprasView = new PedidoComprasView();
        this.listaFornecedor = new ListaFornecedor();
        this.pedidoCompras = new PedidoCompras();
        this.btNovaLinha = document.querySelector("#btNovaLinha");
        this.inputFornecedor = document.querySelector("#inputNome");
        this.inputPagamento = document.querySelector("#inputPagamento");
        this.btExcluir = document.querySelector("#btExcluir");
    }
    async init() {
        this.btNovaLinha.addEventListener("click", (event) => {
            event.preventDefault();
            this.pedidoComprasView.novaLinha();
        });
        Autocomplete.autocompleteFornecedor(this.inputFornecedor, await this.listaFornecedor.getFornecedores());
        Autocomplete.autocomplete(this.inputPagamento, [
            "21 DDL",
            "28 / 35 / 42 DDL",
            "28 / 35 DDL",
            "28 / 42 / 56 DDL",
            "28 / 56 DDL",
            "28 DDL",
            "30 / 40 / 50 / 60 DDL",
            "30 / 45 / 60 DDL",
            "30 / 60 DDL",
            "30 DDL",
            "7 DDL",
            "AVISTA",
            "Cheques Terceiro",
        ]);
        this.pedidoCompras.abrir();
        document.addEventListener("input", (event) => {
            this.pedidoComprasView.calculaTotais();
        });
        document.querySelector('#form1').addEventListener("submit", (event) => {
            event.preventDefault();
            this.pedidoCompras.salvar();
        });
        this.btExcluir.addEventListener("click", () => this.pedidoCompras.excluir());
    }
}
let controller = new PedidoComprasController();
controller.init();
