const CATEGORIES = ['Eletrônicos', 'Livros', 'Casa', 'Esportes'];

const NAMES = {
  Eletrônicos: ['Fone Bluetooth', 'Teclado Mecânico', 'Mouse Sem Fio', 'Caixa de Som', 'Smartwatch', 'Webcam HD', 'Carregador Rápido'],
  Livros: ['Código Limpo', 'Algoritmos em Prática', 'React do Zero', 'Arquitetura Limpa', 'Design de APIs', 'Estruturas de Dados'],
  Casa: ['Luminária LED', 'Cafeteira Elétrica', 'Organizador de Mesa', 'Cadeira Ergonômica', 'Tapete Antiderrapante', 'Garrafa Térmica'],
  Esportes: ['Tênis de Corrida', 'Garrafa Squeeze', 'Tapete de Yoga', 'Corda de Pular', 'Mochila Esportiva', 'Halteres 2 kg'],
};

export const products = CATEGORIES.flatMap((category, c) =>
  NAMES[category].map((name, i) => ({
    id: `${c}-${i}`,
    name,
    category,
   
    price: Number((29.9 + ((c * 7 + i) * 37.3) % 450).toFixed(2)),
    rating: 3 + ((c + i) % 3) * 0.5 + 0.5,
  }))
);

export const categories = CATEGORIES;
