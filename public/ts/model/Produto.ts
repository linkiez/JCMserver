export class Produto {
  private _id: number;
  private _nome: string;
  private _categoria: string;
  private _espessura: number;
  private _peso: number;
  private _dataCriacao?: Date;
  private _dataAtualizacao?: Date;

  constructor(
    id: number,
    nome: string,
    categoria: string,
    espessura: number,
    peso: number,
    dataCriacao?: Date,
    dataAtualizacao?: Date
  ) {
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
}
