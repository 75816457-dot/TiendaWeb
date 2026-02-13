const categorias = {
    lacteos: [
        { id: 1, name: "Queso Fresco", price: 5.50, img: "https://www.thespruceeats.com/thmb/wz6cm5xqq8Ca26oDIC1OCm9A1c0=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Queso-Fresco-584771f43df78c02301bcfae.jpg" },
        { id: 2, name: "Leche Entera", price: 2.10, img: "https://incalec.org/storage/2021/07/milk-and-glass-scaled.jpg" },
        { id: 3, name: "Yogur Frutilla", price: 3.75, img: "https://cdn.tgdd.vn/2021/06/CookProduct/Sua-yakult-bao-nhieu-calo-uong-yakult-co-giam-can-khong-1-1200x676.jpg" },
        { id: 4, name: "Queso Mantecoso Tradicional", price: 18.00, img: "https://tse4.mm.bing.net/th/id/OIP.KYsWTzcjHMWluZM_Tff9_QHaGx?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 5, name: "Queso Tipo Suizo", price: 25.00, img: "https://th.bing.com/th/id/R.031a8da0cf61ff0f88070d60f4c3197b?rik=e%2byzeik4OtHcKQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f_vkd8GXQdrU0%2fTGd20GDv3HI%2fAAAAAAAAB14%2fe_w4xPVFBRY%2fs1600%2fqueso%2btipo%2bsuizo.JPG&ehk=D5r6nmV4P3O4VrFOefQhVyV8R15c6gFvtwTYA1yxFr8%3d&risl=&pid=ImgRaw&r=0" },
        { id: 6, name: "Manjar Blanco de Leche", price: 12.00, img: "https://i.pinimg.com/736x/6a/6e/ba/6a6ebac8f43e8b3a8926e047c16c8655.jpg" },
        { id: 7, name: "Quesillo Cajamarquino", price: 14.00, img: "https://www.donpikeso.com/wp-content/uploads/2019/07/queso-de-cajamarca.png" },
        { id: 8, name: "Mantequilla", price: 9.00, img: "https://es-static.z-dn.net/files/d2d/651294d8aca81df3d5cfe0417b073d22.jpg" },
        { id: 9, name: "Yogur de Aguaymanto (1L)", price: 11.00, img: "https://tse4.mm.bing.net/th/id/OIP.YIosw_gY0SgnNV37SSFxzwHaHI?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 10, name: "Miel de Chanca(Frasco)", price: 8.00, img: "https://i5.walmartimages.com/seo/PeruChef-Miel-de-Chancaca-Fig-Flavored-Syrup-Cane-17oz_a2ee3d9f-d3a7-4a1c-b67b-8dbafd05f85e.1e697ff7178a536b7eebce5967b92c6f.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" }
    ],
    ropa: [
        { id: 101, name: "Casaca de Cuero", price: 85.00, img: "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg" },
        { id: 102, name: "Zapatillas Urbanas", price: 45.00, img: "https://cdn.pixabay.com/photo/2016/12/10/16/57/shoes-1897708_960_720.jpg" }
    ],
    hogar: [
        { id: 201, name: "Juego de Sábanas", price: 30.00, img: "https://cdn.pixabay.com/photo/2016/11/21/16/21/bed-1846251_960_720.jpg" }
    ],
    accesorios: [],
    ferreteria: []
};

let cart = [];
let categoriaActual = 'lacteos'; // Para saber qué lista buscar al agregar

// Función para cargar cualquier categoría
function cargarCategoria(nombreCategoria) {
    categoriaActual = nombreCategoria;
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; 

    const productosSeleccionados = categorias[nombreCategoria];

    if (!productosSeleccionados || productosSeleccionados.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Próximamente más productos en ${nombreCategoria}...</p>`;
    } else {
        productosSeleccionados.forEach(product => {
            productGrid.innerHTML += `
                <div class="product-card">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="btn-add" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                </div>
            `;
        });
    }

    // Si el menú extra está abierto, lo cerramos
    const extraMenu = document.getElementById('extra-menu');
    if (extraMenu.classList.contains('active')) {
        toggleExtraMenu();
    }
}

// Cargar Lácteos por defecto al abrir la página
cargarCategoria('lacteos');

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item-card';
        div.innerHTML = `
            <div style="flex: 1;">
                <strong style="display:block; color:#333;">${item.name}</strong>
                <span style="color:#007bff; font-weight:bold;">$${item.price.toFixed(2)}</span>
            </div>
            <button class="btn-delete-item" onclick="removeFromCart(${index})">✕</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    totalPriceElement.innerText = `$${total.toFixed(2)}`;
    cartCountElement.innerText = cart.length;
}

function addToCart(id) {
    // Buscamos el producto SOLO en la categoría que estamos viendo actualmente
    const product = categorias[categoriaActual].find(p => p.id === id);
    if (product) {
        cart.push(product);
        updateCartUI();
        mostrarMensaje(`¡${product.name} agregado! 🛒`);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    mostrarMensaje("Producto eliminado 🗑️");
}

function mostrarMensaje(texto) {
    const mensaje = document.createElement("div");
    mensaje.className = "notificacion-popup";
    mensaje.innerText = texto;
    document.body.appendChild(mensaje);
    setTimeout(() => {
        mensaje.style.opacity = "0";
        setTimeout(() => mensaje.remove(), 500);
    }, 2000);
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function toggleExtraMenu() {
    document.getElementById('extra-menu').classList.toggle('active');
}

function sendWhatsApp() {
    if (cart.length === 0) return alert("El carrito está vacío");
    const phone = "916992293";
    let message = "Hola Yovana, mi pedido es:%0A";
    cart.forEach(item => message += `- ${item.name} ($${item.price.toFixed(2)})%0A`);
    message += `%0ATotal: ${document.getElementById('total-price').innerText}`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function filterProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    const allCards = document.querySelectorAll('.product-card');

    allCards.forEach(card => {
        const productName = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? "flex" : "none";
    });
}