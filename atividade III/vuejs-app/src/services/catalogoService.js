
const cursos = [
  { id: 1,  nome: 'Lógica de Programação',         categoria: 'Fundamentos', preco: 149.9, cargaHoraria: 40, nota: 4.8, matriculas: 1280 },
  { id: 2,  nome: 'HTML5 e CSS3 Moderno',          categoria: 'Front-end',   preco: 189.9, cargaHoraria: 48, nota: 4.7, matriculas: 2140 },
  { id: 3,  nome: 'JavaScript do Zero ao Avançado',categoria: 'Front-end',   preco: 259.9, cargaHoraria: 72, nota: 4.9, matriculas: 3310 },
  { id: 4,  nome: 'AngularJS na Prática',          categoria: 'Front-end',   preco: 229.9, cargaHoraria: 56, nota: 4.6, matriculas: 870  },
  { id: 5,  nome: 'Vue.js e Componentização',      categoria: 'Front-end',   preco: 239.9, cargaHoraria: 60, nota: 4.8, matriculas: 1540 },
  { id: 6,  nome: 'Node.js e APIs REST',           categoria: 'Back-end',    preco: 279.9, cargaHoraria: 64, nota: 4.7, matriculas: 1190 },
  { id: 7,  nome: 'Banco de Dados Relacional',     categoria: 'Back-end',    preco: 199.9, cargaHoraria: 50, nota: 4.5, matriculas: 960  },
  { id: 8,  nome: 'Arquitetura de Software',       categoria: 'Engenharia',  preco: 349.9, cargaHoraria: 80, nota: 4.9, matriculas: 640  },
  { id: 9,  nome: 'Testes Automatizados',          categoria: 'Engenharia',  preco: 219.9, cargaHoraria: 44, nota: 4.6, matriculas: 520  },
  { id: 10, nome: 'Git e Versionamento',           categoria: 'Fundamentos', preco: 99.9,  cargaHoraria: 24, nota: 4.8, matriculas: 2870 },
  { id: 11, nome: 'UX Design para Devs',           categoria: 'Design',      preco: 179.9, cargaHoraria: 36, nota: 4.4, matriculas: 730  },
  { id: 12, nome: 'Acessibilidade Web (WCAG)',     categoria: 'Design',      preco: 159.9, cargaHoraria: 32, nota: 4.7, matriculas: 410  },
  { id: 13, nome: 'Docker para Desenvolvedores',   categoria: 'DevOps',      preco: 289.9, cargaHoraria: 52, nota: 4.8, matriculas: 1020 },
  { id: 14, nome: 'CI/CD com GitHub Actions',      categoria: 'DevOps',      preco: 249.9, cargaHoraria: 40, nota: 4.5, matriculas: 680  },
  { id: 15, nome: 'Clean Code na Prática',         categoria: 'Engenharia',  preco: 209.9, cargaHoraria: 38, nota: 4.9, matriculas: 1460 },
  { id: 16, nome: 'Responsividade e Mobile First', categoria: 'Front-end',   preco: 169.9, cargaHoraria: 30, nota: 4.6, matriculas: 1130 },
  { id: 17, nome: 'TypeScript Essencial',          categoria: 'Front-end',   preco: 239.9, cargaHoraria: 46, nota: 4.7, matriculas: 1390 },
  { id: 18, nome: 'Segurança em Aplicações Web',   categoria: 'Engenharia',  preco: 319.9, cargaHoraria: 58, nota: 4.8, matriculas: 590  }
];

export const ITENS_POR_PAGINA = 4;

export function listarCategorias() {
  const unicas = [...new Set(cursos.map((c) => c.categoria))].sort();

  return [
    { rotulo: 'Todas as categorias', valor: null },
    ...unicas.map((categoria) => ({ rotulo: categoria, valor: categoria }))
  ];
}

function filtrarPorCategoria(categoria) {
  return categoria ? cursos.filter((c) => c.categoria === categoria) : [...cursos];
}

export function totalDe(categoria) {
  return filtrarPorCategoria(categoria).length;
}

export function contarPaginas(categoria) {
  return Math.max(1, Math.ceil(totalDe(categoria) / ITENS_POR_PAGINA));
}

export function buscarPagina(pagina, categoria) {
  const lista = filtrarPorCategoria(categoria);
  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  return lista.slice(inicio, inicio + ITENS_POR_PAGINA);
}

export function simularUpload(aoProgredir, aoConcluir) {
  let progresso = 0;

  const temporizador = setInterval(() => {
    progresso = Math.min(100, progresso + Math.round(4 + Math.random() * 9));
    aoProgredir(progresso);

    if (progresso >= 100) {
      clearInterval(temporizador);
      if (typeof aoConcluir === 'function') aoConcluir();
    }
  }, 180);

  return () => clearInterval(temporizador);
}
