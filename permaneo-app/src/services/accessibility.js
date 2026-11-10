// Carregamento global: os widgets permanecem disponíveis ao trocar de página.
function loadWidget(id, src, attributes = {}) {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;

  for (const [name, value] of Object.entries(attributes)) {
    script.setAttribute(name, value);
  }

  script.addEventListener('error', () => {
    console.warn(`Não foi possível carregar o recurso de acessibilidade: ${id}.`);
    script.remove();
  });

  document.head.appendChild(script);
}

export function initializeAccessibility(userWayAccount = '') {
  if (typeof document === 'undefined') return;
  // O VLibras atual inicializa automaticamente a partir do script oficial.
  loadWidget('permaneo-vlibras', 'https://vlibras.gov.br/app/vlibras-plugin.js');

  const account = typeof userWayAccount === 'string' ? userWayAccount.trim() : '';
  if (!account) return;

  loadWidget('permaneo-userway', 'https://cdn.userway.org/widget.js', {
    'data-account': account,
    'data-language': 'pt',
    'data-position': '5',
    'data-color': '#246579',
    'data-size': 'large',
    'data-mobile': 'true',
  });
}
