export class ListaPedidoCompras {
  private pedidos: Promise<any>;

  constructor() {
    this.pedidos = this.fetchListaPedidoCompras();
  }

  async fetchListaPedidoCompras() {
    const response = await fetch("/pedidocompras");
    const data = await response.json();
    return data;
  }

  getListaPedidoCompras() {
    return this.pedidos;
  }
}
