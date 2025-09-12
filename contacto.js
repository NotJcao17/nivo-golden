// JavaScript específico para la página de contacto

document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const nombre = formData.get("nombre")
      const email = formData.get("email")
      const telefono = formData.get("telefono")
      const asunto = formData.get("asunto")
      const mensaje = formData.get("mensaje")
      const acepto = formData.get("acepto")

      // Validation
      if (!nombre || !email || !asunto || !mensaje || !acepto) {
        showNotification("Por favor completa todos los campos obligatorios.", "error")
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Por favor ingresa un email válido.", "error")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
      submitButton.disabled = true

      setTimeout(() => {
        showNotification("¡Mensaje enviado correctamente! Te contactaremos pronto.", "success")
        this.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Social media links
  const socialLinks = document.querySelectorAll(".social-link-contact")
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const platform = this.querySelector("span").textContent
      showNotification(`Redirigiendo a ${platform}...`, "info")
    })
  })

  // Purchase links
  const purchaseLinks = document.querySelectorAll(".purchase-link")
  purchaseLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const store = this.querySelector("span").textContent
      showNotification(`Redirigiendo a ${store}...`, "info")
    })
  })

  // Map interaction
  const mapContainer = document.querySelector(".map-container")
  if (mapContainer) {
    mapContainer.addEventListener("click", () => {
      showNotification("Abriendo Google Maps...", "info")
    })
  }

  // FAQ accordion enhancements
  const accordionButtons = document.querySelectorAll(".accordion-button")
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add smooth transition effect
      setTimeout(() => {
        const target = document.querySelector(this.getAttribute("data-bs-target"))
        if (target && target.classList.contains("show")) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          })
        }
      }, 350)
    })
  })

  // Contact item hover effects
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".contact-icon i")
      icon.style.transform = "scale(1.2) rotate(5deg)"
      icon.style.color = "var(--primary-color)"
    })

    item.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".contact-icon i")
      icon.style.transform = "scale(1) rotate(0deg)"
      icon.style.color = ""
    })
  })

  // Phone number click to call
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]')
  phoneLinks.forEach((link) => {
    link.addEventListener("click", () => {
      showNotification("Iniciando llamada...", "info")
    })
  })

  // Email links
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]')
  emailLinks.forEach((link) => {
    link.addEventListener("click", () => {
      showNotification("Abriendo cliente de email...", "info")
    })
  })

  // Form field enhancements
  const formInputs = document.querySelectorAll(".form-control, .form-select")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
      if (this.value) {
        this.parentElement.classList.add("has-value")
      } else {
        this.parentElement.classList.remove("has-value")
      }
    })
  })

  // Character counter for textarea
  const messageTextarea = document.getElementById("mensaje")
  if (messageTextarea) {
    const maxLength = 500
    const counter = document.createElement("small")
    counter.className = "text-muted"
    counter.style.float = "right"
    messageTextarea.parentElement.appendChild(counter)

    function updateCounter() {
      const remaining = maxLength - messageTextarea.value.length
      counter.textContent = `${remaining} caracteres restantes`

      if (remaining < 50) {
        counter.className = "text-warning"
      } else if (remaining < 0) {
        counter.className = "text-danger"
      } else {
        counter.className = "text-muted"
      }
    }

    messageTextarea.addEventListener("input", updateCounter)
    updateCounter()
  }

  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `alert alert-${getAlertClass(type)} position-fixed`
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
    }, 4000)
  }

  function getAlertClass(type) {
    switch (type) {
      case "success":
        return "success"
      case "error":
        return "danger"
      case "info":
        return "info"
      default:
        return "primary"
    }
  }

  console.log("Contact page loaded successfully!")
})
