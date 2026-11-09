import { getStats } from '../services/storage.js';

// Renderiza la vista principal de bienvenida con estadísticas y características
export function renderHome(app) {
  const stats = getStats();

  app.innerHTML = `
    <div class="home-view">
      <section class="hero">
        <h1 class="hero-title">Tu biblioteca de recursos para aprender a programar</h1>
        <p class="hero-subtitle">Guarda, clasifica y encuentra tus enlaces y materiales de desarrollo favoritos.</p>
        <a href="#/recursos" class="btn btn-primary">Empezar</a>
      </section>

      <section class="cards-grid">
        <div class="card stat-card">
          <span class="stat-number">${stats.total}</span>
          <span class="stat-label">Recursos guardados</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.favoritos}</span>
          <span class="stat-label">Favoritos</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.temas}</span>
          <span class="stat-label">Temas</span>
        </div>
      </section>

      <section class="cards-grid">
        <div class="card feature-card">
          <h3>Guardar</h3>
          <p>Almacena enlaces a videos, artículos, cursos y herramientas en un solo lugar.</p>
        </div>
        <div class="card feature-card">
          <h3>Organizar</h3>
          <p>Clasifica cada recurso por tipo, tema y nivel para mantener el orden.</p>
        </div>
        <div class="card feature-card">
          <h3>Encontrar</h3>
          <p>Localiza rápidamente el contenido que necesitas para continuar aprendiendo.</p>
        </div>
      </section>
    </div>
  `;
}
