import { Produto } from "../model/Produto.js";
import { ListaProduto } from "../model/ListaProduto.js";

export class ListaProdutoView {
  private tabela: HTMLTableSectionElement;

  constructor() {
    this.tabela = document.querySelector("tbody");
  }

  montaTabela(arrayProdutos: Produto[]) {
    arrayProdutos.forEach((produto) => {
      this.tabela.appendChild(this.montaTr(produto));
    });
  }

  montaTr(produto: Produto) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", String(produto.id));

    let idTd = document.createElement("td");
    let nomeTd = document.createElement("td");
    let valorMaiorTd = document.createElement("td");
    let valorMedioTd = document.createElement("td");
    let valorMenorTd = document.createElement("td");
    let dataAtualizacaoTd = document.createElement("td");

    idTd.innerHTML = `${produto.id}`;
    nomeTd.innerHTML = `${produto.nome}`;
    valorMaiorTd.innerHTML = ``;
    valorMedioTd.innerHTML = ``;
    valorMenorTd.innerHTML = ``;
    dataAtualizacaoTd.innerHTML = ``;

    idTd.setAttribute("class", "idTd");
    nomeTd.setAttribute("class", "nomeTd");
    valorMaiorTd.setAttribute("class", "valorMaiorTd");
    valorMedioTd.setAttribute("class", "valorMedioTd");
    valorMenorTd.setAttribute("class", "valorMenorTd");
    dataAtualizacaoTd.setAttribute("class", "dataAtualizacaoTd");

    tr.appendChild(idTd);
    tr.appendChild(nomeTd);
    tr.appendChild(valorMaiorTd);
    tr.appendChild(valorMedioTd);
    tr.appendChild(valorMenorTd);
    tr.appendChild(dataAtualizacaoTd);

    return tr;
  }

  filtraTabela(lista: any, valor: string) {
    var listaFiltrada: Produto[] = [];

    lista.then((lista: any) => {
      listaFiltrada = lista.filter((valorTest: any) => {
        let nome = valorTest.nome;

        return nome.includes(valor);
      });
      this.tabela.innerHTML = ``;
      this.montaTabela(listaFiltrada);
    });

    /*
    if (valor != "") {
      listaFiltrada.filter((valorTest: any) => {
        return true;
      });
      console.log(listaFiltrada);
      console.log(valor);
    }*/
  }
}
