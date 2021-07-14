import { ListaProdutoService } from "../service/listaProdutoService.js";
export class ListaProduto {
    constructor() {
        this.produtos = ListaProdutoService.getListaProduto();
    }
    addProduto(produto) {
    }
    getProdutos() {
        return this.produtos;
    }
}
