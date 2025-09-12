// JavaScript específico para la página de blog

document.addEventListener("DOMContentLoaded", () => {
  // Blog search functionality
  const searchInput = document.querySelector(".search-box input")
  const searchButton = document.querySelector(".search-box button")
  const blogPosts = document.querySelectorAll(".blog-post")

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    blogPosts.forEach((post) => {
      const title = post.querySelector("h2, h4").textContent.toLowerCase()
      const content = post.querySelector("p").textContent.toLowerCase()

      if (searchTerm === "" || title.includes(searchTerm) || content.includes(searchTerm)) {
        post.style.display = "block"
        post.classList.add("fade-in")
      } else {
        post.style.display = "none"
      }
    })
  }

  searchButton.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Category filtering
  const categoryLinks = document.querySelectorAll(".category-list a")
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const category = this.getAttribute("data-category")

      // Update active category
      categoryLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")

      // Filter posts
      blogPosts.forEach((post) => {
        const postCategory = post.getAttribute("data-category")

        if (category === "all" || postCategory === category) {
          post.style.display = "block"
          post.classList.add("fade-in")
        } else {
          post.style.display = "none"
        }
      })
    })
  })

  // Newsletter form handling
  const newsletterForms = document.querySelectorAll(".newsletter-form, .newsletter-form-main")
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      if (email) {
        showNotification("¡Gracias por suscribirte! Recibirás nuestros consejos semanales.", "success")
        this.reset()
      } else {
        showNotification("Por favor ingresa un email válido.", "error")
      }
    })
  })

  // Blog post hover effects
  const blogCards = document.querySelectorAll(".blog-post")
  blogCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const img = this.querySelector("img")
      if (img) {
        img.style.transform = "scale(1.05)"
      }
    })

    card.addEventListener("mouseleave", function () {
      const img = this.querySelector("img")
      if (img) {
        img.style.transform = "scale(1)"
      }
    })
  })

  // Recent posts click handling
  const recentPostLinks = document.querySelectorAll(".recent-post a")
  recentPostLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const title = this.textContent
      showNotification(`Cargando artículo: ${title}`, "info")
    })
  })

  // Read more buttons
  const readMoreButtons = document.querySelectorAll(".read-more")
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const title = this.closest(".blog-post").querySelector("h2, h4").textContent
      showNotification(`Cargando artículo completo: ${title}`, "info")
    })
  })

  // Pagination handling
  const paginationLinks = document.querySelectorAll(".pagination .page-link")
  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      if (!this.parentElement.classList.contains("disabled") && !this.parentElement.classList.contains("active")) {
        const page = this.textContent
        showNotification(`Cargando página ${page}`, "info")

        // Update active page
        document.querySelectorAll(".pagination .page-item").forEach((item) => {
          item.classList.remove("active")
        })
        this.parentElement.classList.add("active")
      }
    })
  })

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

  // Smooth scroll for category links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  console.log("Blog page loaded successfully!")
})
