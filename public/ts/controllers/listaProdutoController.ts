import { ListaProduto } from "../model/ListaProduto.js";
import { ListaProdutoView } from "../view/listaProdutoView.js";

export class ListaProdutoController {
 private listaProduto: ListaProduto;
 private listaProdutoView: ListaProdutoView;

  constructor(){
    this.listaProduto = new ListaProduto();
    this.listaProdutoView = new ListaProdutoView();
    this.atualizaProduto();


    
    console.log('ListaProdutoController carregado.');
  };

  atualizaProduto(){
    this.listaProdutoView.montaTabela(this.listaProduto.getProdutos())
  }

}


var listaProdutoController = new ListaProdutoController();