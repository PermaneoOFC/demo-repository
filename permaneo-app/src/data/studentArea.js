// Dados fictícios usados somente na demonstração.
const dateAfter = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const subjects = [
  {
    name: 'Matemática',
    teacher: 'Renata Oliveira',
    grade: 7.5,
    attendance: 92,
    material:
      'Revise frações: para somar denominadores diferentes, encontre um denominador comum. Exemplo: 1/2 + 1/4 = 3/4.',
  },
  {
    name: 'Português',
    teacher: 'Ana Santos',
    grade: 8.2,
    attendance: 96,
    material:
      'Uma resenha apresenta a obra, resume suas ideias principais e traz sua opinião com argumentos. Organize o texto em introdução, desenvolvimento e conclusão.',
  },
  {
    name: 'Ciências',
    teacher: 'Carlos Lima',
    grade: 8.0,
    attendance: 94,
    material:
      'Em uma cadeia alimentar, produtores transformam energia solar em alimento. Consumidores se alimentam de outros seres e decompositores reciclam nutrientes.',
  },
];

export const initialSchoolwork = {
  tasks: [
    {
      id: 'fractions',
      subject: 'Matemática',
      title: 'Revisão de frações',
      due: dateAfter(0),
      instructions: 'Resolva 1/2 + 1/4 e 2/3 − 1/6. Explique como encontrou um denominador comum.',
      answer: '',
      submittedAt: null,
    },
    {
      id: 'review',
      subject: 'Português',
      title: 'Resenha de leitura',
      due: dateAfter(2),
      instructions:
        'Escreva uma resenha de um livro que você leu. Apresente a obra e justifique sua opinião em até três parágrafos.',
      answer: '',
      submittedAt: null,
    },
    {
      id: 'ecosystem',
      subject: 'Ciências',
      title: 'Cadeia alimentar',
      due: dateAfter(4),
      instructions:
        'Descreva uma cadeia alimentar com produtor, consumidor e decompositor. Explique a função de cada um.',
      answer: '',
      submittedAt: null,
    },
  ],
  events: [
    {
      id: 'study',
      title: 'Revisão de Matemática',
      date: dateAfter(1),
      time: '10:00',
      type: 'Aula',
    },
    {
      id: 'science',
      title: 'Avaliação de Ciências',
      date: dateAfter(5),
      time: '08:00',
      type: 'Prova',
    },
    {
      id: 'meeting',
      title: 'Encontro de orientação',
      date: dateAfter(7),
      time: '14:00',
      type: 'Evento',
    },
  ],
};

export const notices = [
  {
    id: 'welcome',
    title: 'Organize sua semana',
    category: 'Coordenação',
    text: 'Confira os prazos das atividades e reserve um momento para revisar os conteúdos. Se precisar, procure apoio.',
  },
  {
    id: 'library',
    title: 'Biblioteca aberta no contraturno',
    category: 'Escola',
    text: 'Na demonstração, a biblioteca recebe estudantes das 13h às 16h para leitura e estudo em grupo.',
  },
];

export function formatDate(value) {
  return new Date(value + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}
