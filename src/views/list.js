import { getAll, remove, getById } from '../services/storage.js';
import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { showToast } from '../components/toast.js';

export function getLabel(lista, value) {
  const item = lista.find((opt) => opt.value === value);
  return item ? item.label : value;
}

export function renderList(app) {
  const recursos = getAll();
  const sortedRecursos = [...recursos].sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
  );

  const content =
    sortedRecursos.length === 0
      ? `
        <div class="empty-state">
          <p>Aún no tienes recursos</p>
          <a href="#/nuevo" class="btn btn-primary">Agregar el primero</a>
        </div>
      `
      : `
        <div class="resources-grid">
          ${sortedRecursos
            .map((recurso) => {
              let hostname = '';
              try {
                hostname = new URL(recurso.url).hostname;
              } catch {
                hostname = recurso.url;
              }

              const tipoLabel = getLabel(TIPOS, recurso.tipo);
              const temaLabel = getLabel(TEMAS, recurso.tema);
              const nivelLabel = getLabel(NIVELES, recurso.nivel);
              const fecha = recurso.fechaCreacion
                ? new Date(recurso.fechaCreacion).toLocaleDateString('es-SV')
                : '';

              return `
                <article class="card resource-card">
                  <div class="resource-card-header">
                    <span class="badge badge--${recurso.tipo}">${tipoLabel}</span>
                    ${recurso.favorito ? '<span class="favorite-star" title="Favorito">★</span>' : ''}
                  </div>
                  <h2 class="resource-title">
                    <a href="${recurso.url}" target="_blank" rel="noopener">${recurso.titulo}</a>
                  </h2>
                  <span class="resource-domain">${hostname}</span>
                  <div class="resource-meta">
                    <span class="resource-tema">${temaLabel}</span>
                    <span class="resource-separator">•</span>
                    <span class="resource-nivel">${nivelLabel}</span>
                  </div>
                  <div class="resource-footer">
                    <span class="resource-date">${fecha}</span>
                    <div class="resource-actions">
                      <a href="#/editar/${recurso.id}" class="btn btn-secondary">Editar</a>
                      <button type="button" class="btn btn-danger" data-action="delete" data-id="${recurso.id}">Eliminar</button>
                    </div>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      `;

  app.innerHTML = `
    <div class="list-view">
      <div class="list-header">
        <h1>Mis recursos</h1>
        <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
      </div>
      ${content}
    </div>
  `;

  app.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este recurso?');
      if (!confirmed) {
        return;
      }

      const deleted = remove(id);
      if (deleted && getById(id) === null) {
        showToast('Recurso eliminado correctamente');
        renderList(app);
      } else {
        showToast('Error: el recurso no se pudo eliminar o no existe', 'error');
      }
    });
  });
}
