export class ListaFornecedor {
    constructor() {
        this.fornecedores = this.fetchFornecedores();
    }
    async fetchFornecedores() {
        const response = await fetch("/fornecedor");
        const data = await response.json();
        return data;
    }
    getFornecedores() {
        return this.fornecedores;
    }
}
