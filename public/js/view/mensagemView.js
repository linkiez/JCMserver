export class MensagemView {
    constructor() {
        this.divMensagem = document.querySelector("#divMensagem");
    }
    mensagemLimpar() {
        if (this.divMensagem.classList.contains("alert-success")) {
            this.divMensagem.classList.remove("alert-success");
        }
        if (this.divMensagem.classList.contains("alert-danger")) {
            this.divMensagem.classList.remove("alert-danger");
        }
        this.divMensagem.innerHTML = ``;
    }
    mensagemSucesso(mensagem) {
        this.mensagemLimpar();
        this.divMensagem.classList.add("alert-success");
        this.divMensagem.textContent = mensagem;
    }
    mensagemErro(mensagem) {
        this.mensagemLimpar();
        this.divMensagem.classList.add("alert-danger");
        this.divMensagem.textContent = mensagem;
    }
}
