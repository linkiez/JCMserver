export class ListaProdutoView {
    constructor() {
        this.tabela = document.getElementById("tbody");
    }
    montaTabela(arrayProdutos) {
        let array = Array.from(arrayProdutos);
        array.forEach((produto) => {
            console.log(produto);
            this.tabela.appendChild(this.montaTr(produto));
        });
    }
    montaTr(produto) {
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
}
