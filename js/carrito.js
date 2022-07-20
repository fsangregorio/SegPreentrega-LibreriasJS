let post = document.getElementById("post");
let carritoCompras = document.getElementById("carritoCompras");
let canasta = JSON.parse(localStorage.getItem("data")) || [];



let calcular = () => {
  let iconoCarrito = document.getElementById("carritoCantidad");
  iconoCarrito.innerHTML = canasta.map((x) => x.item).reduce((x, y) => x + y, 0);
};



calcular();



let renderizarCarrito = () => {
  if (canasta.length !== 0) {
    return (carritoCompras.innerHTML = canasta
      .map((x) => {
        let { id, item } = x;
        let busqueda = productos.find((y) => y.id === id) || [];
        return `
      <div class="carrito-producto">
        <img width="240" src=${busqueda.img} alt="" />
        <div class="detalles">
          <div class="nombre-precio-x">
              <h4 class="nombre-precio">
                <p>${busqueda.nombre}</p>
                <p class="carrito-producto-precio">$${busqueda.precio}</p>
              </h4>
              <i onclick="eliminarProducto(${id})" class="bi bi-trash3"></i>
          </div>
          <div class="buttons">
              <i onclick="reducir(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="cantidad">${item}</div>
              <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h4>$ ${item * busqueda.precio}</h4>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    carritoCompras.innerHTML = ``;
    post.innerHTML = `
    <h4>El carrito está vacío.</h4>
    <a href="tienda.html">
      <button class="HomeBtn">Volver a la tienda</button>
    </a>
    `;
  }
};



renderizarCarrito();



let aumentar = (id) => {
  let productoElegido = id;
  let busqueda = canasta.find((x) => x.id === productoElegido.id);

  if (busqueda === undefined) {
    canasta.push({
      id: productoElegido.id,
      item: 1,
    });
  } else {
    busqueda.item += 1;
  }

  renderizarCarrito();
  actualizar(productoElegido.id);
  localStorage.setItem("data", JSON.stringify(canasta));
};



let reducir = (id) => {
  let productoElegido = id;
  let busqueda = canasta.find((x) => x.id === productoElegido.id);

  if (busqueda === undefined) return;
  else if (busqueda.item === 0) return;
  else {
    busqueda.item -= 1;
  }
  actualizar(productoElegido.id);
  canasta = canasta.filter((x) => x.item !== 0);
  renderizarCarrito();
  localStorage.setItem("data", JSON.stringify(canasta));
};



let actualizar = (id) => {
  let busqueda = canasta.find((x) => x.id === id);
  document.getElementById(id).innerHTML = busqueda.item;
  calcular();
  cantidadTotal();
};



let eliminarProducto = (id) => {
  let productoElegido = id;
  canasta = canasta.filter((x) => x.id !== productoElegido.id);
  renderizarCarrito();
  cantidadTotal();
  localStorage.setItem("data", JSON.stringify(canasta));
};


let vaciarCarrito = () => {
  canasta = [];
  renderizarCarrito();
  localStorage.setItem("data", JSON.stringify(canasta));
  alertOjo ();
};

let confirmame = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Su pedido ha sido realizado con éxito.',
    showConfirmButton: false,
    timer: 2500
  })
}



let cantidadTotal = () => {
  if (canasta.length !== 0) {
    let cantidad = canasta
      .map((x) => {
        let { item, id } = x;
        let busqueda = productos.find((y) => y.id === id) || [];

        return item * busqueda.precio;
      })
      .reduce((x, y) => x + y, 0);
    post.innerHTML = `
    <h3 class="fontFinal">Total: $${cantidad}</h3>
    <button onclick="confirmame()">Enviar pedido</button>
    <button onclick="vaciarCarrito()" class="removeAll">Vaciar Carrito</button>
    `;
  } else return;
};



cantidadTotal();