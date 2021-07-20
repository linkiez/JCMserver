import { MensagemView } from "../view/mensagemView.js";

export class Fornecedor {
  private mensagemView: MensagemView;

  private queryString: string;
  private urlParams: URLSearchParams;
  private urlId: string;

  private inputId: HTMLInputElement;
  private inputNome: HTMLInputElement;
  private inputContato: HTMLInputElement;
  private inputTelefone: HTMLInputElement;
  private inputEmail: HTMLInputElement;
  private inputEndereco: HTMLInputElement;
  private inputMunicipio: HTMLInputElement;
  private inputEstado: HTMLInputElement;
  private inputCep: HTMLInputElement;
  private inputIeRg: HTMLInputElement;
  private inputCnpjCpf: HTMLInputElement;
  private inputDescricao: HTMLInputElement;
  private inputDCriacao: HTMLInputElement;
  private inputDAlteracao: HTMLInputElement;

  constructor() {
    this.mensagemView = new MensagemView();

    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.urlId = this.urlParams.get("id");

    this.inputId = document.querySelector("#inputId");
    this.inputNome = document.querySelector("#inputNome");
    this.inputContato = document.querySelector("#inputContato");
    this.inputTelefone = document.querySelector("#inputTelefone");
    this.inputEmail = document.querySelector("#inputEmail");
    this.inputEndereco = document.querySelector("#inputEndereco");
    this.inputMunicipio = document.querySelector("#inputMunicipio");
    this.inputEstado = document.querySelector("#inputEstado");
    this.inputCep = document.querySelector("#inputCep");
    this.inputIeRg = document.querySelector("#inputIeRg");
    this.inputCnpjCpf = document.querySelector("#inputCnpjCpf");
    this.inputDescricao = document.querySelector("#inputDescricao");
    this.inputDCriacao = document.querySelector("#inputDCriacao");
    this.inputDAlteracao = document.querySelector("#inputDAlteracao");
  }

  async abrir() {
    if (this.urlId != null) {
      const option = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      let response = await fetch("/fornecedor/" + this.urlId, option);
      let result = await response.json();

      if (response.ok) {
        let criacaoData: any;
        let alteracaoData: any;

        if (result.dataCriacao != null) {
          criacaoData = new Date(result.dataCriacao);
          criacaoData =
            criacaoData.getDate() +
            "/" +
            Number(criacaoData.getMonth() + 1) +
            "/" +
            criacaoData.getFullYear() +
            " " +
            criacaoData.getHours() +
            ":" +
            criacaoData.getMinutes() +
            ":" +
            criacaoData.getSeconds();
        }

        if (result.dataAtualizacao != null) {
          alteracaoData = new Date(result.dataAtualizacao);
          alteracaoData =
            alteracaoData.getDate() +
            "/" +
            Number(alteracaoData.getMonth() + 1) +
            "/" +
            alteracaoData.getFullYear() +
            " " +
            alteracaoData.getHours() +
            ":" +
            alteracaoData.getMinutes() +
            ":" +
            alteracaoData.getSeconds();
        }

        console.log("dataCriacao: " + criacaoData);
        console.log("dataAtualizacao: " + alteracaoData);

        this.inputId.value = result.id;
        this.inputNome.value = result.nome;
        this.inputContato.value = result.contato;
        this.inputTelefone.value = result.telefone;
        this.inputEmail.value = result.email;
        this.inputEndereco.value = result.endereco;
        this.inputMunicipio.value = result.municipio;
        this.inputEstado.value = result.estado;
        this.inputCep.value = result.cep;
        this.inputIeRg.value = result.ie_rg;
        this.inputCnpjCpf.value = result.cnpj_cpf;
        this.inputDescricao.value = result.descricao;
        this.inputDCriacao.value = criacaoData;
        this.inputDAlteracao.value = alteracaoData;
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
    var fornecedor: any = {
      id: this.inputId.value,
      nome: this.inputNome.value,
      contato: this.inputContato.value,
      telefone: this.inputTelefone.value,
      email: this.inputEmail.value,
      endereco: this.inputEndereco.value,
      municipio: this.inputMunicipio.value,
      estado: this.inputEstado.value,
      cep: this.inputCep.value,
      ie_rg: this.inputIeRg.value,
      cnpj_cpf: this.inputCnpjCpf.value,
      descricao: this.inputDescricao.value,
    };
    if (this.inputId.value == "") {
      delete fornecedor.id;
      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor),
      };

      let response = await fetch("/fornecedor", option);
      let result = await response.json();

      if (response.ok) {
        this.mensagemView.mensagemSucesso("Fornecedor criado.");
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
        body: JSON.stringify(fornecedor),
      };
      console.log(option);

      let response = await fetch("/fornecedor/" + fornecedor.id, option);
      let result = await response.json();

      if (response.ok) {
        this.mensagemView.mensagemSucesso("Fornecedor alterado.");
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
      let response = await fetch("/fornecedor/" + id, option);
      let result = await response.json();
      console.log("DELETE:");
      console.log(result);

      if (response.ok) {
        this.mensagemView.mensagemSucesso("Produto excluido.");
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
