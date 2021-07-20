import { ListaProdutoService } from "../service/listaProdutoService.js";
export class ListaProduto {
    constructor() {
        this.produtos = ListaProdutoService.getListaProduto();
    }
    getProdutos() {
        return this.produtos;
    }
}
