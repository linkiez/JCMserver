import { ListaProdutoService } from "../service/listaProdutoService.js";
export class ListaProduto {
    constructor() {
        this.produtos = [];
        let produtos = ListaProdutoService.getListaProduto();
        produtos.then((data) => data.forEach((produtoInterno) => {
            this.addProduto(produtoInterno);
        }));
    }
    addProduto(produto) {
        this.produtos.push(produto);
    }
    getProdutos() {
        return this.produtos;
    }
}
