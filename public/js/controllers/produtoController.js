import { ProdutoView } from "../view/produtoView.js";
export class ProdutoController {
    constructor() {
        this.produtoView = new ProdutoView();
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.urlId = this.urlParams.get("id");
        this.btExcluir = document.querySelector("#btExcluir");
        this.btSalvar = document.querySelector("#btSalvar");
        this.inputId = document.querySelector("#idProduto");
        this.inputNome = document.querySelector("#nomeProduto");
        this.inputCategoria = document.querySelector("#categoriaProduto");
        this.inputEspessura = document.querySelector("#espessuraProduto");
        this.inputPeso = document.querySelector("#pesoProduto");
        this.inputDCriacao = document.querySelector("#criacaoProduto");
        this.inputDAlteracao = document.querySelector("#alteracaoProduto");
    }
    init() {
        this.btSalvar.addEventListener("click", () => this.salvar());
        this.btExcluir.addEventListener("click", () => this.excluir());
        this.abrir(this.urlId);
    }
    async salvar() {
        var produto = {
            id: this.inputId.value,
            nome: this.inputNome.value,
            categoria: this.inputCategoria.value,
            espessura: this.inputEspessura.value,
            peso: this.inputPeso.value,
        };
        if (produto.id == "") {
            delete produto.id;
            const option = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto),
            };
            let response = await fetch("/produto", option);
            let result = await response.json();
            if (response.ok) {
                this.produtoView.mensagemSucesso("Produto criado.");
                this.inputId.value = result.insertId;
                window.location.href = "./listaProdutos.html";
            }
            else {
                this.produtoView.mensagemErro(response.status +
                    " - " +
                    response.statusText +
                    "\n - " +
                    result[0].mensagem);
            }
        }
        else {
            const option = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto),
            };
            console.log(option);
            let response = await fetch("/produto/" + produto.id, option);
            let result = await response.json();
            if (response.ok) {
                this.produtoView.mensagemSucesso("Produto alterado.");
            }
            else {
                this.produtoView.mensagemErro(response.status +
                    " - " +
                    response.statusText +
                    "\n - " +
                    JSON.stringify(result));
            }
            console.log(result);
        }
    }
    async abrir(idProduto) {
        const option = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("/produto/" + idProduto, option);
        let result = await response.json();
        if (response.ok) {
            let criacaoProduto;
            let alteracaoProduto;
            if (result.dataCriacao != null) {
                criacaoProduto = new Date(result.dataCriacao);
                criacaoProduto =
                    criacaoProduto.getDate() +
                        "/" +
                        Number(criacaoProduto.getMonth() + 1) +
                        "/" +
                        criacaoProduto.getFullYear() +
                        " " +
                        criacaoProduto.getHours() +
                        ":" +
                        criacaoProduto.getMinutes() +
                        ":" +
                        criacaoProduto.getSeconds();
            }
            if (result.dataAtualizacao != null) {
                alteracaoProduto = new Date(result.dataAtualizacao);
                alteracaoProduto =
                    alteracaoProduto.getDate() +
                        "/" +
                        Number(alteracaoProduto.getMonth() + 1) +
                        "/" +
                        alteracaoProduto.getFullYear() +
                        " " +
                        alteracaoProduto.getHours() +
                        ":" +
                        alteracaoProduto.getMinutes() +
                        ":" +
                        alteracaoProduto.getSeconds();
            }
            console.log("dataCriacao: " + criacaoProduto);
            console.log("dataAtualizacao: " + alteracaoProduto);
            this.inputId.value = result.id;
            this.inputNome.value = result.nome;
            this.inputCategoria.value = result.categoria;
            this.inputEspessura.value = result.espessura.replace(",", ".");
            this.inputPeso.value = result.peso.replace(",", ".");
            this.inputDCriacao.value = criacaoProduto;
            this.inputDAlteracao.value = alteracaoProduto;
        }
        else {
            this.produtoView.mensagemErro(response.status + " - " + response.statusText + "\n - " + result.mensagem);
        }
    }
    async excluir() {
        let id = this.inputId.value;
        const option = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        if (id != "") {
            let response = await fetch("/produto/" + id, option);
            let result = await response.json();
            console.log("DELETE:");
            console.log(result);
            if (response.ok) {
                this.produtoView.mensagemSucesso("Produto excluido.");
                document.querySelector("form").reset();
                window.location.href = "./listaProdutos.html";
            }
            else {
                this.produtoView.mensagemErro(response.status +
                    " - " +
                    response.statusText +
                    "\n - " +
                    result.mensagem);
            }
        }
        else {
            this.produtoView.mensagemErro("Código em branco.");
        }
    }
}
let controller = new ProdutoController();
controller.init();
