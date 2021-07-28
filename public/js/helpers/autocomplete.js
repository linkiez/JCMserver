export class Autocomplete {
    static autocomplete(inp, arr) {
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
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
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
    static autocompleteFornecedor(inp, arr) {
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
                if (arr[i].nome.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML =
                        "<strong>" + arr[i].nome.substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].nome.substr(val.length);
                    b.innerHTML += `<input type='hidden' value='${arr[i].id}'>
                <input type='hidden' value='${arr[i].nome}'>
                <input type='hidden' value='${arr[i].contato}'>
                <input type='hidden' value='${arr[i].telefone}'>
                <input type='hidden' value='${arr[i].email}'>
                <input type='hidden' value='${arr[i].endereco}'>
                <input type='hidden' value='${arr[i].municipio}'>
                <input type='hidden' value='${arr[i].estado}'>
                <input type='hidden' value='${arr[i].cep}'>
                <input type='hidden' value='${arr[i].ie_rg}'>
                <input type='hidden' value='${arr[i].cnpj_cpf}'>
                `;
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[1].value;
                        let inputFornecedorId = document.querySelector("#inputFornecedorId");
                        inputFornecedorId.value = this.getElementsByTagName("input")[0].value;
                        document.querySelector("#spanContato").innerHTML =
                            this.getElementsByTagName("input")[2].value;
                        document.querySelector("#spanTelefone").innerHTML =
                            this.getElementsByTagName("input")[3].value;
                        document.querySelector("#spanEmail").innerHTML =
                            this.getElementsByTagName("input")[4].value;
                        document.querySelector("#spanEndereco").innerHTML =
                            this.getElementsByTagName("input")[5].value;
                        document.querySelector("#spanMunicipio").innerHTML =
                            this.getElementsByTagName("input")[6].value;
                        document.querySelector("#spanEstado").innerHTML =
                            this.getElementsByTagName("input")[7].value;
                        document.querySelector("#spanCep").innerHTML =
                            this.getElementsByTagName("input")[8].value;
                        document.querySelector("#spanIeRg").innerHTML =
                            this.getElementsByTagName("input")[9].value;
                        document.querySelector("#spanCnpjCpf").innerHTML =
                            this.getElementsByTagName("input")[10].value;
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
    static autocompleteMaterial(inp, inpId, arr) {
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
}
