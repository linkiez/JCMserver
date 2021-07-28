export class ListaFornecedoresView {
    constructor() {
        this.tabela = document.querySelector("tbody");
    }
    montaTabela(arrayFornecedores) {
        arrayFornecedores.forEach((fornecedor) => {
            this.tabela.appendChild(this.montaTr(fornecedor));
        });
    }
    montaTr(fornecedor) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", String(fornecedor.id));
        let idTd = document.createElement("td");
        let nomeTd = document.createElement("td");
        let contatoTd = document.createElement("td");
        let telefoneTd = document.createElement("td");
        let emailTd = document.createElement("td");
        let vencimentoTd = document.createElement("td");
        idTd.innerHTML = `${fornecedor.id}`;
        nomeTd.innerHTML = `${fornecedor.nome}`;
        contatoTd.innerHTML = `${fornecedor.contato}`;
        telefoneTd.innerHTML = `${fornecedor.telefone}`;
        emailTd.innerHTML = `${fornecedor.email}`;
        vencimentoTd.innerHTML = ``;
        tr.appendChild(idTd);
        tr.appendChild(nomeTd);
        tr.appendChild(contatoTd);
        tr.appendChild(telefoneTd);
        tr.appendChild(emailTd);
        tr.appendChild(vencimentoTd);
        return tr;
    }
    filtraTabela(lista, valor) {
        var listaFiltrada = [];
        lista.then((lista) => {
            listaFiltrada = lista.filter((valorTest) => {
                let nome = valorTest.nome;
                return nome.includes(valor);
            });
            this.tabela.innerHTML = ``;
            this.montaTabela(listaFiltrada);
        });
    }
}
