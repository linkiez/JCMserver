import { Autocomplete } from "../helpers/autocomplete.js";
import { ListaProduto } from "../model/ListaProduto.js";
import { Produto } from "../model/Produto.js";
export class PedidoComprasView {
    constructor() {
        this.tabela = document.querySelector("tbody");
        this.produto = new Produto();
    }
    async montaTr(itens) {
        let tr = document.createElement("tr");
        let linha = this.tabela.querySelectorAll("tr").length;
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
        quantidadeTd.appendChild(inputQuantidade);
        let inputPeso = document.createElement("input");
        inputPeso.setAttribute("class", "inputPeso col-12");
        pesoTd.appendChild(inputPeso);
        let inputPrecoUnitario = document.createElement("input");
        inputPrecoUnitario.setAttribute("class", "inputPrecoUnitario col-12");
        precoUnitarioTd.appendChild(inputPrecoUnitario);
        let spanPrecoTotalLinha = document.createElement("span");
        spanPrecoTotalLinha.setAttribute("class", "spanPrecoTotalLinha");
        precoTotalLinhaTd.appendChild(spanPrecoTotalLinha);
        let inputIpi = document.createElement("input");
        inputIpi.setAttribute("class", "inputIpi col-12");
        ipiTd.appendChild(inputIpi);
        let inputDataEntrega = document.createElement("input");
        inputDataEntrega.setAttribute("class", "inputDataEntrega col-12");
        inputDataEntrega.setAttribute("type", "Date");
        dataEntregaTd.appendChild(inputDataEntrega);
        let btExcluirLinha = document.createElement("button");
        btExcluirLinha.setAttribute("class", "btExcluirLinha btn btn-outline-danger");
        btExcluirLinha.innerText = "x";
        excluirTd.appendChild(btExcluirLinha);
        if (itens) {
            let fetchedMaterial = await this.produto.fetchProduto(itens.material);
            inputMaterialId.value = itens.material;
            inputMaterial.value = fetchedMaterial.nome;
            inputDimensao.value = itens.dimensao;
            inputQuantidade.value = itens.quantidade;
            inputPeso.value = itens.peso;
            inputPrecoUnitario.value = itens.preco;
            inputIpi.value = itens.ipi;
            let data = new Date(itens.prazo);
            inputDataEntrega.value = String(data.getFullYear() + "-" + data.getMonth() + "-" + data.getDate());
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
        let listaProduto = new ListaProduto();
        this.autocompleteMaterial(inputMaterial, inputMaterialId, await listaProduto.getListaProduto());
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
        return tr;
    }
    async novaLinha() {
        this.tabela.appendChild(await this.montaTr());
    }
    autocompleteMaterial(inp, inpId, arr) {
        var currentFocus;
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].nome.substr(0, val.length).toUpperCase() ==
                    val.toUpperCase() ||
                    arr[i].nome.includes(val)) {
                    b = document.createElement("DIV");
                    b.innerHTML =
                        "<strong>" + arr[i].nome.substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].nome.substr(val.length);
                    b.innerHTML += `
            <input type='hidden' value='${arr[i].id}'>
            <input type='hidden' value='${arr[i].nome}'>
            `;
                    b.addEventListener("click", function (e) {
                        inpId.value = this.getElementsByTagName("input")[0].value;
                        inp.value = this.getElementsByTagName("input")[1].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        inp.addEventListener("keydown", function (e) {
            var x;
            x = document.getElementById(this.id + "autocomplete-list");
            if (x)
                x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            }
            else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            }
            else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x)
                        x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            if (!x)
                return false;
            removeActive(x);
            if (currentFocus >= x.length)
                currentFocus = 0;
            if (currentFocus < 0)
                currentFocus = x.length - 1;
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
    excluirLinha(botao) {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
            let button = event.target;
            let td = button.parentNode;
            let tr = td.parentNode;
            tr.remove();
        });
    }
}
