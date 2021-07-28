import { MensagemView } from "../view/mensagemView.js";
import { PedidoComprasView } from "../view/pedidoComprasView.js";
import { Fornecedor } from "./Fornecedor.js";
export class PedidoCompras {
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
                let criacaoData;
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
                let fetchedFornecedor = await this.fornecedor.fetchFornecedor(result.fornecedor_id);
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
            }
            else {
                this.mensagemView.mensagemErro(response.status +
                    " - " +
                    response.statusText +
                    "\n - " +
                    result.mensagem);
            }
        }
    }
    salvar() { }
    excluir() { }
}
