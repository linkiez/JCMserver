export class Produto {
    constructor(id, nome, categoria, espessura, peso, dataCriacao, dataAtualizacao) {
        this._id = id;
        this._nome = nome;
        this._categoria = categoria;
        this._espessura = espessura;
        this._peso = peso;
        this._dataCriacao = dataCriacao;
        this._dataAtualizacao = dataAtualizacao;
    }
    get id() {
        let idDummy = this._id;
        return idDummy;
    }
    get nome() {
        let nomeDummy = this._nome;
        return nomeDummy;
    }
    get categoria() {
        let categoriaDummy = this._categoria;
        return categoriaDummy;
    }
    get espessura() {
        let espessuraDummy = this._espessura;
        return espessuraDummy;
    }
    get peso() {
        let pesoDummy = this._peso;
        return pesoDummy;
    }
    get dataCriacao() {
        let dataCriacaoDummy = this._dataCriacao;
        return dataCriacaoDummy;
    }
    get dataAtualizacao() {
        let dataAtualizacaoDummy = this._dataAtualizacao;
        return dataAtualizacaoDummy;
    }
    async fetchProduto(id) {
        const response = await fetch("/produto/" + id);
        const data = await response.json();
        return data;
    }
}
