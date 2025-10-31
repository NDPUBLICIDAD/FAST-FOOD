// Lista de productos con precio regular y combo
const productos = [
  { id: 1, nombre: "Alitas", precio: 200, precioCombo: 250, imagen: "images/ALITAS.jpg" },
  { id: 2, nombre: "Boneless", precio: 200, precioCombo: 250, imagen: "images/BONELES.jpg" },
  { id: 3, nombre: "Costillas", precio: 150, precioCombo: 200, imagen: "images/COSTILLAS.jpg" },
  { id: 4, nombre: "Hamburguesa", precio: 130, precioCombo: 150, imagen: "images/HAMBURGUESAS.jpg" },
  { id: 5, nombre: "Hot Dog", precio: 100, precioCombo: 130, imagen: "images/HOT DOG.jpg" },
  { id: 6, nombre: "Salchi Papas", precio: 100, precioCombo: 130, imagen: "images/SALCHIPAPAS.jpg" }
];

// Variables globales
let carrito = [];

// Elementos del DOM
const contenedorProductos = document.getElementById("productos");
const carritoLista = document.getElementById("carrito-lista");
const totalElemento = document.getElementById("total");
const whatsappBtn = document.getElementById("whatsapp-btn");

// --- Mostrar productos ---
function mostrarProductos() {
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("border", "p-4", "rounded-lg", "shadow-lg", "bg-black", "text-white");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover rounded-lg">
      <h2 class="text-lg font-semibold mt-2">${producto.nombre}</h2>

      <select class="bg-gray-800 text-white px-2 py-1 rounded mt-2 w-full" id="precio-${producto.id}">
        <option value="${producto.precio}">Regular - C$${producto.precio}</option>
        <option value="${producto.precioCombo}">Combo - C$${producto.precioCombo}</option>
      </select>

      <button 
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition"
        onclick="agregarAlCarrito(${producto.id})">
        Agregar al carrito
      </button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// --- Agregar producto al carrito ---
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const select = document.getElementById(`precio-${id}`);
  const precioSeleccionado = parseFloat(select.value);
  const tipo = select.selectedIndex === 0 ? "Regular" : "Combo";
  const productoSeleccionado = { ...producto, precio: precioSeleccionado, tipo };

  carrito.push(productoSeleccionado);
  actualizarCarrito();
}

// --- Eliminar producto del carrito ---
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// --- Calcular total ---
function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio, 0).toFixed(2);
}

// --- Actualizar carrito ---
function actualizarCarrito() {
  carritoLista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center", "bg-gray-800", "p-2", "rounded-lg");

    li.innerHTML = `
      <span class="text-gray-300">${item.nombre} (${item.tipo}) - C$${item.precio.toFixed(2)}</span>
      <button 
        onclick="eliminarDelCarrito(${index})"
        class="ml-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    carritoLista.appendChild(li);
  });

  totalElemento.textContent = `Total: C$${calcularTotal()}`;
  actualizarEnlaceWhatsApp();
}

// --- Generar mensaje de WhatsApp ---
function generarMensajePedido() {
  if (carrito.length === 0) return "Aún no has agregado productos.";
  const mensaje = carrito.map(p => `${p.nombre} (${p.tipo}) - C$${p.precio.toFixed(2)}`).join("%0A");
  return `Hola, quiero hacer un pedido:%0A${mensaje}%0A%0A*Total: C$${calcularTotal()}*`;
}

// --- Actualizar enlace de WhatsApp ---
function actualizarEnlaceWhatsApp() {
  const numero = "50586119179"; // <-- Cambia este número por el tuyo
  const mensaje = generarMensajePedido();
  whatsappBtn.href = `https://wa.me/${numero}?text=${mensaje}`;
}

// --- Inicialización ---
mostrarProductos();
