import { ListaPedidoCompras } from "../model/ListaPedidoCompras.js";
import { ListaPedidoComprasView } from "../view/listaPedidoComprasView.js";
export class ListaPedidoComprasController {
    constructor() {
        this.listaPedidoCompras = new ListaPedidoCompras();
        this.listaPedidoComprasView = new ListaPedidoComprasView();
    }
    async init() {
        this.listaPedidoComprasView.montaTabela(await this.listaPedidoCompras.getListaPedidoCompras());
        this.listaPedidoComprasView.tabela.addEventListener("click", (event) => {
            let td = event.target;
            let tr = td.parentNode;
            window.location.href = "./pedidoCompras.html?id=" + tr.getAttribute("id");
        });
    }
}
let controller = new ListaPedidoComprasController();
controller.init();
