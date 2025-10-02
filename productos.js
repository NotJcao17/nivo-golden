document.addEventListener("DOMContentLoaded", () => {
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWldGqHxXEmTSphqY5YaOpsPA8uHbGB20lh-Gc7mlOWMNY7dZqMZUGY6upXBnbKzTHEOI9iQRblKHv/pub?output=csv"

  const productosPerros = document.getElementById("productosPerros")
  const productosGatos = document.getElementById("productosGatos")

  Papa.parse(SHEET_URL, {
    download: true,
    header: true,
    complete: (results) => {
      try {
        const data = results.data.filter((row) => row.name && row.image)

        if (!data || data.length === 0) {
          throw new Error("No se encontraron productos")
        }

        const perros = data.filter((p) => p.category !== "gato")
        const gatos = data.filter((p) => p.category === "gato")

        renderProducts(perros, productosPerros)
        renderProducts(gatos, productosGatos)

        setupFilters()
        setupTabs()
      } catch (err) {
        mostrarError(err.message)
      }
    },
    error: (err) => {
      console.error("Error al cargar los datos", err)
      mostrarError("No pudimos cargar los productos. Intenta más tarde.")
    },
  })

  function renderProducts(products, container) {
    container.innerHTML = ""
    products.forEach((p) => {
      const card = document.createElement("div")
      card.className = "col-lg-4 col-md-6 mb-4 product-item"
      card.setAttribute("data-category", p.category)

      // limpiar link de Drive
      let imageUrl = p.image.trim()
      if (imageUrl.includes("drive.google.com/file/d/")) {
        const match = imageUrl.match(/\/d\/(.*?)\//)
        if (match && match[1]) {
          imageUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`
        }
        console.log(imageUrl)
      }

      card.innerHTML = `
        <div class="product-card shadow-sm rounded p-3 h-100">
          <div class="product-image text-center mb-3">
            <img src="${imageUrl}" alt="${p.name}" class="img-fluid rounded">
          </div>
          <div class="product-info text-center">
            <h5>${p.name}</h5>
            <p class="product-description">${p.description}</p>
          </div>
        </div>
      `
      container.appendChild(card)
    })
  }

  function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn")

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter")
        const currentTab = document.querySelector(".tab-pane.active").id

        const currentTabFilterButtons = document
          .querySelector(`#${currentTab}`)
          .parentElement.querySelectorAll(".filter-btn")

        currentTabFilterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        const currentTabProducts = document
          .querySelector(`#${currentTab} .row[id*="productos"]`)
          .querySelectorAll(".product-item")

        currentTabProducts.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  function setupTabs() {
    const tabs = document.querySelectorAll('button[data-bs-toggle="pill"]')
    tabs.forEach((tab) => {
      tab.addEventListener("shown.bs.tab", (event) => {
        const targetId = event.target.getAttribute("data-bs-target") // #perros o #gatos
        const container = document.querySelector(`${targetId} .row[id*="productos"]`)
        const buttons = document.querySelectorAll(`${targetId} .filter-btn`)

        // reiniciar filtros → activar "Todos"
        buttons.forEach((btn) => btn.classList.remove("active"))
        const defaultBtn = document.querySelector(`${targetId} .filter-btn[data-filter="all"]`)
        if (defaultBtn) {
          defaultBtn.classList.add("active")
        }

        // mostrar todos los productos de esa pestaña
        container.querySelectorAll(".product-item").forEach((item) => {
          item.style.display = "block"
        })
      })
    })
  }
})
