export class ListaProdutoService {
    static async getListaProduto() {
        const response = await fetch("/produto");
        const data = await response.json();
        return data;
    }
}
