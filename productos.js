// JavaScript específico para la página de productos

document.addEventListener("DOMContentLoaded", () => {
  // Product filtering functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const productItems = document.querySelectorAll(".product-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")
      const currentTab = document.querySelector(".tab-pane.active").id

      // Update active filter button
      const currentTabFilterButtons = document
        .querySelector(`#${currentTab}`)
        .parentElement.querySelectorAll(".filter-btn")
      currentTabFilterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter products
      const currentTabProducts = document
        .querySelector(`#${currentTab} .row[id*="productos"]`)
        .querySelectorAll(".product-item")

      currentTabProducts.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          item.classList.add("fade-in")
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Product card hover effects
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const overlay = this.querySelector(".product-overlay")
      if (overlay) {
        overlay.style.opacity = "1"
      }
    })

    card.addEventListener("mouseleave", function () {
      const overlay = this.querySelector(".product-overlay")
      if (overlay) {
        overlay.style.opacity = "0"
      }
    })
  })

  // Product badge animations
  const badges = document.querySelectorAll(".product-badge")
  badges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(-5deg)"
    })

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(-10deg)"
    })
  })

  // Reset filters when switching tabs
  const categoryTabs = document.querySelectorAll('[data-bs-toggle="pill"]')
  categoryTabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function () {
      // Reset filter buttons
      const targetPane = document.querySelector(this.getAttribute("data-bs-target"))
      const filterButtons = targetPane.querySelectorAll(".filter-btn")
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      filterButtons[0].classList.add("active") // Activate "Todos"

      // Show all products
      const products = targetPane.querySelectorAll(".product-item")
      products.forEach((product) => {
        product.style.display = "block"
      })
    })
  })

  // Product actions
  const buyButtons = document.querySelectorAll(".product-actions .btn-primary")
  buyButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const productName = this.closest(".product-card").querySelector("h5").textContent
      showNotification(`${productName} agregado al carrito`, "success")
    })
  })

  const infoButtons = document.querySelectorAll(".product-actions .btn-outline-secondary")
  infoButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const productName = this.closest(".product-card").querySelector("h5").textContent
      showProductModal(productName)
    })
  })

  // Product modal (simple implementation)
  function showProductModal(productName) {
    const modal = document.createElement("div")
    modal.className = "modal fade"
    modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${productName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="/placeholder.svg?height=300&width=300" alt="${productName}" class="img-fluid rounded">
                            </div>
                            <div class="col-md-6">
                                <h4>${productName}</h4>
                                <p>Descripción detallada del producto con todos sus beneficios y características.</p>
                                <ul>
                                    <li>100% ingredientes naturales</li>
                                    <li>Rico en proteínas y colágeno</li>
                                    <li>Ayuda a la salud dental</li>
                                    <li>Sin conservadores artificiales</li>
                                </ul>
                                <div class="mt-3">
                                    <button class="btn btn-primary btn-lg">Comprar Ahora</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

    document.body.appendChild(modal)
    const bsModal = new window.bootstrap.Modal(modal)
    bsModal.show()

    modal.addEventListener("hidden.bs.modal", () => {
      document.body.removeChild(modal)
    })
  }

  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `alert alert-${type === "success" ? "success" : "danger"} position-fixed`
    notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `
    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 3000)
  }

  console.log("Productos page loaded successfully!")
})
