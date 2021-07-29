import { MensagemView } from "../view/mensagemView.js";
import { PedidoComprasView } from "../view/pedidoComprasView.js";
import { Fornecedor } from "./Fornecedor.js";

export class PedidoCompras {
  private mensagemView: MensagemView;
  private fornecedor: Fornecedor;
  private pedidoComprasView: PedidoComprasView;

  private queryString: string;
  private urlParams: URLSearchParams;
  private urlId: string;

  private inputId: HTMLInputElement;
  private inputPedido: HTMLInputElement;
  private inputFornecedorId: HTMLInputElement;
  private inputNome: HTMLInputElement;
  private spanContato: HTMLSpanElement;
  private spanTelefone: HTMLSpanElement;
  private spanEmail: HTMLSpanElement;
  private spanEndereco: HTMLSpanElement;
  private spanMunicipio: HTMLSpanElement;
  private spanEstado: HTMLSpanElement;
  private spanCep: HTMLSpanElement;
  private spanCnpjCpf: HTMLSpanElement;
  private spanIeRg: HTMLSpanElement;
  private spanDCriacao: HTMLSpanElement;

  private inputPagamento: HTMLInputElement;
  private selectTransporte: HTMLSelectElement;
  private inputFrete: HTMLInputElement;

  constructor() {
    this.mensagemView = new MensagemView();
    this.fornecedor = new Fornecedor();
    this.pedidoComprasView = new PedidoComprasView();

    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.urlId = this.urlParams.get("id");

    this.inputId = document.querySelector("#inputId");
    this.inputPedido = document.querySelector("#inputPedido");
    this.inputFornecedorId = document.querySelector("#inputFornecedorId");
    this.inputNome = document.querySelector("#inputNome");
    this.spanContato = document.querySelector("#spanContato");
    this.spanTelefone = document.querySelector("#spanTelefone");
    this.spanEmail = document.querySelector("#spanEmail");
    this.spanEndereco = document.querySelector("#spanEndereco");
    this.spanMunicipio = document.querySelector("#spanMunicipio");
    this.spanEstado = document.querySelector("#spanEstado");
    this.spanCep = document.querySelector("#spanCep");
    this.spanCnpjCpf = document.querySelector("#spanCnpjCpf");
    this.spanIeRg = document.querySelector("#spanIeRg");
    this.spanDCriacao = document.querySelector("#spanDCriacao");

    this.inputPagamento = document.querySelector("#inputPagamento");
    this.selectTransporte = document.querySelector("#selectTransporte");
    this.inputFrete = document.querySelector("#inputFrete");
  }

  async abrir() {
    if (this.urlId != null) {
      const option = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      let response = await fetch("/pedidocompras/" + this.urlId, option);
      let result = await response.json();

      if (response.ok) {
        let criacaoData: any;

        if (result.dataCriacao != null) {
          criacaoData = new Date(result.dataCriacao);
          criacaoData =
            criacaoData.getDate() +
            "/" +
            Number(criacaoData.getMonth() + 1) +
            "/" +
            criacaoData.getFullYear() +
            " ";
        }

        this.inputId.value = result.id;
        this.inputPedido.value = result.pedido;
        this.inputFornecedorId.value = result.fornecedor_id;

        let fetchedFornecedor = await this.fornecedor.fetchFornecedor(
          result.fornecedor_id
        );

        this.inputNome.value = fetchedFornecedor.nome;
        this.spanContato.innerText = fetchedFornecedor.contato;
        this.spanTelefone.innerText = fetchedFornecedor.telefone;
        this.spanEmail.innerText = fetchedFornecedor.email;
        this.spanEndereco.innerText = fetchedFornecedor.endereco;
        this.spanMunicipio.innerText = fetchedFornecedor.municipio;
        this.spanEstado.innerHTML = fetchedFornecedor.estado;
        this.spanCep.innerText = fetchedFornecedor.cep;
        this.spanCnpjCpf.innerText = fetchedFornecedor.cnpj_cpf;
        this.spanIeRg.innerText = fetchedFornecedor.ie_rg;

        this.spanDCriacao.innerText = criacaoData;

        let itens = result.itens;

        this.pedidoComprasView.montaTabela(itens);

        this.inputPagamento.value = result.cond_pagamento;
        this.selectTransporte.value = result.transporte;
        this.inputFrete.value = result.frete;
      } else {
        this.mensagemView.mensagemErro(
          response.status +
            " - " +
            response.statusText +
            "\n - " +
            result.mensagem
        );
      }
    }
  }

  async salvar() {
    var pedido: any = {
      id: this.inputId.value,
      fornecedor_id: this.inputFornecedorId.value,
      cond_pagamento: this.inputPagamento.value,
      frete: this.inputFrete.value,
      transporte: this.selectTransporte.value,
      pedido: this.inputPedido.value,
    };

    let materiaisID: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputMaterialId");
    let dimensoes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputDimensao");
    let quantidades: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputQuantidade");
    let pesos: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputPeso");
    let precoUnitarios: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputPrecoUnitario");
    let ipis: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputIpi");
    let datasEntregas: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".inputDataEntrega");

    let itens = [];

    for (let i = 0; i < materiaisID.length; i++) {
      let item = {
        pedido_compras: pedido.id,
        material: materiaisID[i].value,
        dimensao: dimensoes[i].value,
        quantidade: quantidades[i].value.replace(",", "."),
        peso: pesos[i].value.replace(",", "."),
        preco: precoUnitarios[i].value.replace(",", "."),
        ipi: ipis[i].value,
        prazo: datasEntregas[i].value,
      };

      itens.push(item);
    }

    pedido.itens = itens;

    console.log(pedido);

    if (this.inputId.value == "") {
      delete pedido.id;
      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      };

      let response = await fetch("/pedidocompras/", option);
      let result = await response.json();

      if (response.ok) {
        this.mensagemView.mensagemSucesso("Pedido de compras criado.");
        this.inputId.value = result.insertId;
        //window.location.href = "./listaProdutos.html";
      } else {
        this.mensagemView.mensagemErro(
          response.status +
            " - " +
            response.statusText +
            "\n - " +
            result[0].mensagem
        );
      }
    } else {
      const option = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      };
      console.log(option);

      let response = await fetch("/pedidocompras/" + pedido.id, option);
      let result = await response.json();

      if (response.ok) {
        this.mensagemView.mensagemSucesso("Pedido de compras alterado.");
      } else {
        this.mensagemView.mensagemErro(
          response.status +
            " - " +
            response.statusText +
            "\n - " +
            JSON.stringify(result)
        );
      }

      console.log(result);
    }
  }

  async excluir() {
    let id = this.inputId.value;

    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    if (id != "") {
      let response = await fetch("/pedidocompras/" + id, option);
      let result = await response.json();
      console.log("DELETE:");
      console.log(result);

      if (response.ok) {
        this.mensagemView.mensagemSucesso("Pedido de compras excluido.");
        document.querySelector("form").reset();
        //window.location.href = "./listaProdutos.html";
      } else {
        this.mensagemView.mensagemErro(
          response.status +
            " - " +
            response.statusText +
            "\n - " +
            result.mensagem
        );
      }
    } else {
      this.mensagemView.mensagemErro("Código em branco.");
    }
  }
}
