import { Autocomplete } from "../helpers/autocomplete.js";
import { ListaProduto } from "../model/ListaProduto.js";
import { Produto } from "../model/Produto.js";
export class PedidoComprasView {
  tabela: HTMLTableSectionElement;
  private produto: Produto;

  constructor() {
    this.tabela = document.querySelector("tbody");
    this.produto = new Produto();
  }

  async montaTr(itens?: any) {
    let tr = document.createElement("tr");
    let linha = this.tabela.querySelectorAll("tr").length;
    linha++;
    tr.setAttribute("class", String(linha));

    let itemTd = document.createElement("td");
    let descricaoTd = document.createElement("td");
    let dimensaoTd = document.createElement("td");
    let quantidadeTd = document.createElement("td");
    let pesoTd = document.createElement("td");
    let precoUnitarioTd = document.createElement("td");
    let precoTotalLinhaTd = document.createElement("td");
    let ipiTd = document.createElement("td");
    let dataEntregaTd = document.createElement("td");
    let excluirTd = document.createElement("td");

    itemTd.setAttribute("class", "col-1");
    descricaoTd.setAttribute("class", "col-3");
    dimensaoTd.setAttribute("class", "col-1");
    quantidadeTd.setAttribute("class", "col-1");
    pesoTd.setAttribute("class", "col-1");
    precoUnitarioTd.setAttribute("class", "col-1");
    precoTotalLinhaTd.setAttribute("class", "col-1");
    ipiTd.setAttribute("class", "col-1");
    dataEntregaTd.setAttribute("class", "col-1");
    excluirTd.setAttribute("class", "col-1");

    itemTd.innerHTML = String(linha);

    let inputMaterialId = document.createElement("input");
    inputMaterialId.setAttribute("type", "hidden");
    inputMaterialId.setAttribute("class", "inputMaterialId")
    let inputMaterial = document.createElement("input");
    inputMaterial.setAttribute("class", "inputMaterial col-12");
    let divMaterial = document.createElement("div");
    divMaterial.setAttribute("class", "autocomplete col-12");
    divMaterial.appendChild(inputMaterialId);
    divMaterial.appendChild(inputMaterial);
    descricaoTd.appendChild(divMaterial);

    let inputDimensao = document.createElement("input");
    inputMaterial.setAttribute("class", "inputDimensao col-12");
    let divDimensao = document.createElement("div");
    divDimensao.setAttribute("class", "autocomplete col-12");
    divDimensao.appendChild(inputDimensao);
    dimensaoTd.appendChild(divDimensao);

    let inputQuantidade = document.createElement("input");
    inputQuantidade.setAttribute("class", "inputQuantidade col-12");
    inputQuantidade.setAttribute("Placeholder", "0,00");
    quantidadeTd.appendChild(inputQuantidade);

    let inputPeso = document.createElement("input");
    inputPeso.setAttribute("class", "inputPeso col-12");
    inputPeso.setAttribute("Placeholder", "0,00");
    pesoTd.appendChild(inputPeso);

    let inputPrecoUnitario = document.createElement("input");
    inputPrecoUnitario.setAttribute("class", "inputPrecoUnitario col-12");
    inputPrecoUnitario.setAttribute("Placeholder", "0,00");
    precoUnitarioTd.appendChild(inputPrecoUnitario);

    let spanPrecoTotalLinha = document.createElement("span");
    spanPrecoTotalLinha.setAttribute("class", "spanPrecoTotalLinha");
    precoTotalLinhaTd.appendChild(spanPrecoTotalLinha);

    let inputIpi = document.createElement("input");
    inputIpi.setAttribute("class", "inputIpi col-12");
    inputIpi.setAttribute("Placeholder", "0,00");
    ipiTd.appendChild(inputIpi);

    let inputDataEntrega = document.createElement("input");
    inputDataEntrega.setAttribute("class", "inputDataEntrega col-12");
    inputDataEntrega.setAttribute("type", "date");
    dataEntregaTd.appendChild(inputDataEntrega);

    let btExcluirLinha = document.createElement("button");
    btExcluirLinha.setAttribute(
      "class",
      "btExcluirLinha btn btn-outline-danger"
    );
    btExcluirLinha.innerText = "x";

    excluirTd.appendChild(btExcluirLinha);

    if (itens) {
      let fetchedMaterial = await this.produto.fetchProduto(itens.material);

      inputMaterialId.value = itens.material;
      inputMaterial.value = fetchedMaterial.nome;
      inputDimensao.value = itens.dimensao;
      inputQuantidade.value = String(itens.quantidade).replace(".", ",");
      inputPeso.value = String(itens.peso).replace(".", ",");
      inputPrecoUnitario.value = String(itens.preco).replace(".", ",");
      inputIpi.value = itens.ipi;

      let data = new Date(itens.prazo);
      inputDataEntrega.value = String(
        data.getFullYear() +
          "-" +
          String("0" + data.getMonth()).slice(-2) +
          "-" +
          String("0" + data.getDate()).slice(-2)
      );

      let peso = Number(inputPeso.value.replace(",", "."));
      let precoUnitario = Number(inputPrecoUnitario.value.replace(",", "."));
      let total = peso * precoUnitario;
      spanPrecoTotalLinha.innerHTML = `${total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}`;
    }

    tr.appendChild(itemTd);
    tr.appendChild(descricaoTd);
    tr.appendChild(dimensaoTd);
    tr.appendChild(quantidadeTd);
    tr.appendChild(pesoTd);
    tr.appendChild(precoUnitarioTd);
    tr.appendChild(precoTotalLinhaTd);
    tr.appendChild(ipiTd);
    tr.appendChild(dataEntregaTd);
    tr.appendChild(excluirTd);

    let listaProduto: ListaProduto = new ListaProduto();

    Autocomplete.autocompleteMaterial(
      inputMaterial,
      inputMaterialId,
      await listaProduto.getListaProduto()
    );

    Autocomplete.autocomplete(inputDimensao, [
      "1000x2000mm",
      "1000x3000mm",
      "1200x2000mm",
      "1200x3000mm",
      "1200x6000mm",
      "1250x3000mm",
      "1500x3000mm",
      "1500x6000mm",
      "1800x3000mm",
      "2440x6000mm",
      "2500x3000mm",
      "3000mm",
      "6000mm",
      "DIVERSAS MEDIDAS",
    ]);

    this.excluirLinha(btExcluirLinha);

    let inputs = [
      inputMaterial,
      inputDimensao,
      inputQuantidade,
      inputPeso,
      inputPrecoUnitario,
    ];

    inputs.forEach((item) => {
      item.addEventListener("input", (event) => {
        if (
          inputMaterial &&
          inputDimensao &&
          inputQuantidade &&
          inputPeso &&
          inputPrecoUnitario
        ) {
          let peso = Number(inputPeso.value.replace(",", "."));
          let precoUnitario = Number(
            inputPrecoUnitario.value.replace(",", ".")
          );
          let total = peso * precoUnitario;
          spanPrecoTotalLinha.innerHTML = `${total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`;
        }
      });
    });

    return tr;
  }

  montaTabela(itens: any[]) {
    itens.forEach(async (item) => {
      this.tabela.appendChild(await this.montaTr(item));
      this.calculaTotais();
    });
  }

  async novaLinha() {
    this.tabela.appendChild(await this.montaTr());
  }

  excluirLinha(botao: HTMLButtonElement) {
    botao.addEventListener("click", (event) => {
      event.preventDefault();
      let button = <HTMLButtonElement>event.target;
      let td = <HTMLTableCellElement>button.parentNode;
      let tr = <HTMLTableRowElement>td.parentNode;

      tr.remove();
    });
  }

  calculaTotais() {
    let pesos: NodeListOf<HTMLInputElement> =
      this.tabela.querySelectorAll(".inputPeso");
    let precos: NodeListOf<HTMLInputElement> = this.tabela.querySelectorAll(
      ".inputPrecoUnitario"
    );
    let ipis: NodeListOf<HTMLInputElement> =
      this.tabela.querySelectorAll(".inputIpi");

    let total = 0;
    let totalIpis = 0;

    for (let i = 0; i < pesos.length; i++) {
      total +=
        Number(pesos[i].value.replace(",", ".")) *
        Number(precos[i].value.replace(",", "."));

      totalIpis +=
        Number(pesos[i].value.replace(",", ".")) *
        Number(precos[i].value.replace(",", ".")) *
        (Number(ipis[i].value.replace(",", ".")) / 100);
    }

    let spanValorTotal = document.querySelector("#spanValorTotal");
    spanValorTotal.innerHTML = `${total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`;

    let spanValorTotalIPI = document.querySelector("#spanValorTotalIPI");
    spanValorTotalIPI.innerHTML = `${totalIpis.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`;

    let spanValorTotalComIPI = document.querySelector("#spanValorTotalComIPI");
    let valorComIpis = total + totalIpis;
    spanValorTotalComIPI.innerHTML = `${valorComIpis.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`;

    let inputFrete: HTMLInputElement = document.querySelector("#inputFrete");
    let spanTotalFinal = document.querySelector("#spanTotalFinal");

    let frete = Number(inputFrete.value);
    let freteTotal = frete + total + totalIpis;

    spanTotalFinal.innerHTML = `${freteTotal.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`;
  }
}
