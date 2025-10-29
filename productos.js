document.addEventListener("DOMContentLoaded", () => {
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWldGqHxXEmTSphqY5YaOpsPA8uHbGB20lh-Gc7mlOWMNY7dZqMZUGY6upXBnbKzTHEOI9iQRblKHv/pub?output=csv"

  // Contenedores de productos
  const productosPerrosContainer = document.getElementById("productosPerros")
  const productosGatosContainer = document.getElementById("productosGatos")

  // Contenedores de vistas (Pestaña Perros)
  const categoryGridPerros = document.getElementById("categoryGridPerros")
  const backToCategoriesBtn = document.getElementById("backToCategories")

  // Tarjetas de categoría
  const categoryCards = document.querySelectorAll(".category-card-custom")

  // --- MANEJO DE VISTAS (SOLO PARA PERROS) ---

  /* Muestra la vista de categorías y oculta los productos */
  function showCategoriesView() {
    if (categoryGridPerros) categoryGridPerros.style.display = "flex"
    if (productosPerrosContainer) productosPerrosContainer.style.display = "none"
    if (backToCategoriesBtn) backToCategoriesBtn.style.display = "none"
  }

  /* Muestra los productos de una categoría específica */
  function showProductsView(category) {
    if (categoryGridPerros) categoryGridPerros.style.display = "none"
    if (productosPerrosContainer) productosPerrosContainer.style.display = "flex"
    if (backToCategoriesBtn) backToCategoriesBtn.style.display = "block"

    // Filtrar productos por categoría
    const allItems = productosPerrosContainer.querySelectorAll(".product-item")
    allItems.forEach(item => {

      const itemCategory = item.getAttribute("data-category")
      if (itemCategory && itemCategory.trim().toLowerCase() === category.trim().toLowerCase()) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
  }

  // --- Carga de Datos (PapaParse) ---
  Papa.parse(SHEET_URL, {
    download: true,
    header: true,
    complete: (results) => {
      try {
        const data = results.data.filter((row) => row.name && row.image)

        if (!data || data.length === 0) {
          throw new Error("No se encontraron productos")
        }

        // Filtrar productos en gatos y perros
        const gatos = data.filter((p) => 
          p.category && p.category.trim().toLowerCase() === "gato"
        )
        const perros = data.filter((p) => 
          !p.category || p.category.trim().toLowerCase() !== "gato"
        )

        // Renderizar ambos contenedores.
        renderProducts(perros, productosPerrosContainer)
        renderProducts(gatos, productosGatosContainer)

        // Configurar lógica de pestañas y hash URL
        setupTabLogic()

      } catch (err) {
        mostrarError(err.message)
      }
    },
    error: (err) => {
      console.error("Error al cargar los datos", err)
      mostrarError("No pudimos cargar los productos. Intenta más tarde.")
    },
  })

  /**
   * Renderiza las tarjetas de producto en el contenedor
   */
  function renderProducts(products, container) {
    if (!container) return // Salir si el contenedor no existe
    container.innerHTML = ""
    products.forEach((p) => {
      const card = document.createElement("div")
      // product-item es la clase que usamos para filtrar
      card.className = "col-lg-4 col-md-6 mb-4 product-item" 
      // Guardar categoría
      card.setAttribute("data-category", p.category ? p.category.trim().toLowerCase() : "")

      // limpiar link de Drive
      let imageUrl = p.image.trim()
      if (imageUrl.includes("drive.google.com/file/d/")) {
        const match = imageUrl.match(/\/d\/(.*?)\//)
        if (match && match[1]) {
          imageUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`
        }
      }

      card.innerHTML = `
        <div class="product-card shadow-sm rounded p-3 h-100">
          <div class="product-image text-center mb-3">
            <img src="${imageUrl}" alt="${p.name}" class="img-fluid rounded" style="height: 200px; object-fit: cover;">
          </div>
          <div class="product-info text-center">
            <h5>${p.name}</h5>
          </div>
        </div>
      `
      container.appendChild(card)
    })
  }

  /* Configurar la lógica de las pestañas y el # de la URL */
  function setupTabLogic() {
    // Lógica de hash #
    const hash = window.location.hash
    if (hash === '#gatos') {
      const tabButton = document.querySelector('button[data-bs-target="#gatos"]')
      if (tabButton) {
        const tab = new window.bootstrap.Tab(tabButton)
        tab.show()
      }
    } else {
      // Si no es #gatos, es #perros o nada. Mostrar categorías de perros.
      showCategoriesView()
    }

    // Listener para CUANDO SE CAMBIA de pestaña
    const tabs = document.querySelectorAll('button[data-bs-toggle="pill"]')
    tabs.forEach((tab) => {
      tab.addEventListener("shown.bs.tab", (event) => {
        // Si la pestaña que se acaba de mostrar es la de perros reiniciar vista de categorías
        if (event.target.getAttribute("data-bs-target") === "#perros") {
          showCategoriesView()
        }
      })
    })
  }

  // --- Listeners para los botones ---

  // 1. Listeners para las TARJETAS DE CATEGORÍA
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault() // Prevenir cualquier comportamiento por defecto
      const category = card.getAttribute('data-category')
      showProductsView(category)
    })
  })

  // 2. Listener para el BOTÓN DE REGRESAR
  if (backToCategoriesBtn) {
    backToCategoriesBtn.addEventListener('click', showCategoriesView)
  }

  // posible error
  function mostrarError(mensaje) {
    const errorContainer = productosPerrosContainer || document.querySelector('.productos-main .container')
    if (errorContainer) {
      errorContainer.innerHTML = `<div class="alert alert-danger col-12">${mensaje}</div>`
    }
  }
})