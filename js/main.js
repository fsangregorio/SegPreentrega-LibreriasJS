let tienda = document.getElementById("tienda");

let canasta = JSON.parse(localStorage.getItem("data")) || [];

let renderizarTienda = () => {
  return (tienda.innerHTML = productos
    .map((x) => {
      let { id, nombre, descripcion, img, precio } = x;
      let busqueda = canasta.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="producto">
      <img width="220" src=${img} alt="">
      <div class="detalles">
        <h4>${nombre}</h4>
        <p>${descripcion}</p>
        <div class="precio-cantidad">
          <h4>$ ${precio} </h4>
          <div class="buttons">
            <i onclick="reducirCantidad(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="cantidad">${
        busqueda.item === undefined ? 0 : busqueda.item
      }</div>
            <i onclick="aumentarCantidad(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

renderizarTienda();

let aumentarCantidad = (id) => {
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

  actualizar(productoElegido.id);
  localStorage.setItem("data", JSON.stringify(canasta));
};

let reducirCantidad = (id) => {
  let productoElegido = id;
  let busqueda = canasta.find((x) => x.id === productoElegido.id);

  if (busqueda === undefined) return;
  else if (busqueda.item === 0) return;
  else {
    busqueda.item -= 1;
  }

  actualizar (productoElegido.id);
  canasta = canasta.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(canasta));
};

let actualizar = (id) => {
  let busqueda = canasta.find((x) => x.id === id);
  document.getElementById(id).innerHTML = busqueda.item;
  hacerTotal();
};


let hacerTotal = () => {
  let iconoCarrito = document.getElementById("carritoCantidad");
  iconoCarrito.innerHTML = canasta.map((x) => x.item).reduce((x, y) => x + y, 0);
};

hacerTotal();