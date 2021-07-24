import { Produto } from "./Produto.js";
export class ListaProduto {
  private produtos: Promise<Produto[]>;

  constructor() {
    this.produtos = this.getListaProduto();
  }

  getProdutos() {
    return this.produtos;
  }

  async getListaProduto() {
    const response = await fetch("/produto");
    const data = await response.json();
    return data;
  }
}
