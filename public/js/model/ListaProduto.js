export class ListaProduto {
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
