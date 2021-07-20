import { MensagemView } from "../view/mensagemView.js";
import { Fornecedor } from "../model/Fornecedor.js";

export class FornecedorController {

    private mensagemView: MensagemView;
    private fornecedor: Fornecedor;

    private btExcluir: HTMLButtonElement;
    private btSalvar: HTMLButtonElement;

    constructor() {
        this.mensagemView = new MensagemView();
        this.fornecedor = new Fornecedor();

        this.btExcluir = document.querySelector("#btExcluir");
        this.btSalvar = document.querySelector("#btSalvar");
    };
    init() {
        document.querySelector('#form1').addEventListener("submit", (event) => {
            event.preventDefault();
            this.fornecedor.salvar()});
        this.btExcluir.addEventListener("click", () => this.fornecedor.excluir());
    
        this.fornecedor.abrir();
    };
}

let controller = new FornecedorController();
controller.init();