export class ListaFornecedoresView {
  tabela: HTMLTableSectionElement;

  constructor() {
    this.tabela = document.querySelector("tbody");
  }

  montaTabela(arrayFornecedores: any[]) {
    arrayFornecedores.forEach((fornecedor) => {
      this.tabela.appendChild(this.montaTr(fornecedor));
    });
  }

  montaTr(fornecedor: any): HTMLTableRowElement {
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

  filtraTabela(lista: any, valor: string) {
    var listaFiltrada: any[] = [];

    lista.then((lista: any) => {
      listaFiltrada = lista.filter((valorTest: any) => {
        let nome = valorTest.nome;

        return nome.includes(valor);
      });
      this.tabela.innerHTML = ``;
      this.montaTabela(listaFiltrada);
    });

  }
}
