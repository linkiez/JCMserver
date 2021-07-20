import { Produto } from "./Produto.js";
import { ListaProdutoService } from "../service/listaProdutoService.js";
export class ListaProduto {
  private produtos: Promise<Produto[]>;

  constructor() {
    this.produtos = ListaProdutoService.getListaProduto();
  }

  getProdutos() {
    return this.produtos;
  }
}
