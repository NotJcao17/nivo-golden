// JavaScript simplificado para Nivo Golden

document.addEventListener("DOMContentLoaded", () => {
  // NAVEGACIÓN: Cambio de estilo al hacer scroll
  function updateNavbar() {
    const navbar = document.querySelector(".custom-navbar")
    const scrollY = window.scrollY

    if (scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    }
  }

  window.addEventListener("scroll", updateNavbar)

  // NAVEGACIÓN: Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Compensar navbar fijo
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // CARRUSEL: Configuración simple con deslizamiento
  const heroCarousel = document.querySelector("#heroCarousel")
  if (heroCarousel) {
    // Pausar carrusel al pasar el mouse
    heroCarousel.addEventListener("mouseenter", function () {
      const carousel = window.bootstrap.Carousel.getInstance(this)
      if (carousel) {
        carousel.pause()
      }
    })

    // Reanudar carrusel al quitar el mouse
    heroCarousel.addEventListener("mouseleave", function () {
      const carousel = window.bootstrap.Carousel.getInstance(this)
      if (carousel) {
        carousel.cycle()
      }
    })
  }

  // ANIMACIONES: Aparición de elementos al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Elementos que se animarán al aparecer en pantalla
  const elementsToAnimate = document.querySelectorAll(`
        .section-title, .producto-card, .blog-card, .certificacion-item,
        .nosotros-content, .valor-item
    `)

  elementsToAnimate.forEach((element) => {
    element.classList.add("fade-in")
    observer.observe(element)
  })

  // FORMULARIO DE CONTACTO: Manejo simple
  const contactForm = document.querySelector(".contacto-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Obtener datos del formulario
      const name = this.querySelector('input[type="text"]').value
      const email = this.querySelector('input[type="email"]').value
      const message = this.querySelector("textarea").value

      // Validación simple
      if (name && email && message) {
        showNotification("¡Mensaje enviado correctamente! Te contactaremos pronto.", "success")
        this.reset()
      } else {
        showNotification("Por favor completa todos los campos.", "error")
      }
    })
  }

  // NOTIFICACIONES: Sistema simple de mensajes
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `alert alert-${type === "success" ? "success" : "danger"} position-fixed`
    notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-radius: 12px;
        `
    notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-triangle"} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.closest('.alert').remove()"></button>
            </div>
        `

    document.body.appendChild(notification)

    // Auto eliminar después de 5 segundos
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // EFECTOS HOVER: Tarjetas de productos
  const productCards = document.querySelectorAll(".producto-card")
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)"
      this.style.transition = "all 0.3s ease"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    })
  })

  // EFECTOS HOVER: Certificaciones
  const certItems = document.querySelectorAll(".certificacion-item")
  certItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const logo = this.querySelector(".cert-logo")
      logo.style.transform = "scale(1.2)"
      logo.style.transition = "transform 0.3s ease"
      this.style.transform = "translateY(-5px)"
      this.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      const logo = this.querySelector(".cert-logo")
      logo.style.transform = "scale(1)"
      this.style.transform = "translateY(0)"
    })
  })

  console.log("Nivo Golden website cargado correctamente!")
})
