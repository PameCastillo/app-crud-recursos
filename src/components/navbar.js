export function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
      <a href="#/" class="navbar-logo">DevShelf</a>
      <div class="navbar-links">
        <a href="#/" class="nav-link">Inicio</a>
        <a href="#/recursos" class="nav-link">Mis recursos</a>
        <a href="#/nuevo" class="nav-link">Nuevo recurso</a>
      </div>
    </nav>
  `;
}

export function setActiveLink(hash) {
  const currentHash = (!hash || hash === '#') ? '#/' : hash;
  const links = document.querySelectorAll('.navbar a');

  links.forEach((link) => {
    if (link.classList.contains('nav-link') || (!link.classList.contains('navbar-logo') && link.textContent.trim() !== 'DevShelf')) {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    }
  });
}
