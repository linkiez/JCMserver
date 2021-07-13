import { Produto } from "./Produto.js";
import { ListaProdutoService } from "../service/listaProdutoService.js";
export class ListaProduto {
    private produtos: Array<Produto> = [];

    constructor(){
        let produtos = ListaProdutoService.getListaProduto();
        produtos.then((data: any) => data.forEach((produtoInterno: Produto) =>{
            this.addProduto(produtoInterno);
        }))
        
        
    }

    addProduto(produto: Produto){
        this.produtos.push(produto);
    }

    getProdutos() {
        return this.produtos;
    }
}