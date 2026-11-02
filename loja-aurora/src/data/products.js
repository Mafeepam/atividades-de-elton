
const NAMES = {
  electronics: [
    { 'pt-BR': 'Fone Bluetooth', en: 'Bluetooth Headphones', es: 'Auriculares Bluetooth' },
    { 'pt-BR': 'Teclado Mecânico', en: 'Mechanical Keyboard', es: 'Teclado Mecánico' },
    { 'pt-BR': 'Mouse Sem Fio', en: 'Wireless Mouse', es: 'Ratón Inalámbrico' },
    { 'pt-BR': 'Caixa de Som', en: 'Speaker', es: 'Altavoz' },
    { 'pt-BR': 'Smartwatch', en: 'Smartwatch', es: 'Reloj Inteligente' },
    { 'pt-BR': 'Webcam HD', en: 'HD Webcam', es: 'Cámara Web HD' },
    { 'pt-BR': 'Carregador Rápido', en: 'Fast Charger', es: 'Cargador Rápido' },
  ],
  books: [
    { 'pt-BR': 'Código Limpo', en: 'Clean Code', es: 'Código Limpio' },
    { 'pt-BR': 'Algoritmos em Prática', en: 'Algorithms in Practice', es: 'Algoritmos en la Práctica' },
    { 'pt-BR': 'React do Zero', en: 'React from Scratch', es: 'React desde Cero' },
    { 'pt-BR': 'Arquitetura Limpa', en: 'Clean Architecture', es: 'Arquitectura Limpia' },
    { 'pt-BR': 'Design de APIs', en: 'API Design', es: 'Diseño de APIs' },
    { 'pt-BR': 'Estruturas de Dados', en: 'Data Structures', es: 'Estructuras de Datos' },
  ],
  home: [
    { 'pt-BR': 'Luminária LED', en: 'LED Lamp', es: 'Lámpara LED' },
    { 'pt-BR': 'Cafeteira Elétrica', en: 'Coffee Maker', es: 'Cafetera Eléctrica' },
    { 'pt-BR': 'Organizador de Mesa', en: 'Desk Organizer', es: 'Organizador de Escritorio' },
    { 'pt-BR': 'Cadeira Ergonômica', en: 'Ergonomic Chair', es: 'Silla Ergonómica' },
    { 'pt-BR': 'Tapete Antiderrapante', en: 'Non-slip Rug', es: 'Alfombra Antideslizante' },
    { 'pt-BR': 'Garrafa Térmica', en: 'Thermos', es: 'Termo' },
  ],
  sports: [
    { 'pt-BR': 'Tênis de Corrida', en: 'Running Shoes', es: 'Zapatillas de Running' },
    { 'pt-BR': 'Garrafa Squeeze', en: 'Squeeze Bottle', es: 'Botella Deportiva' },
    { 'pt-BR': 'Tapete de Yoga', en: 'Yoga Mat', es: 'Esterilla de Yoga' },
    { 'pt-BR': 'Corda de Pular', en: 'Jump Rope', es: 'Cuerda para Saltar' },
    { 'pt-BR': 'Mochila Esportiva', en: 'Sports Backpack', es: 'Mochila Deportiva' },
    { 'pt-BR': 'Halteres 2 kg', en: '2 kg Dumbbells', es: 'Mancuernas 2 kg' },
  ],
};

export const categories = Object.keys(NAMES);

export const products = categories.flatMap((category, c) =>
  NAMES[category].map((names, i) => ({
    id: `${c}-${i}`,
    names,
    category,

    price: Number((29.9 + ((c * 7 + i) * 37.3) % 450).toFixed(2)),
    rating: 3 + ((c + i) % 3) * 0.5 + 0.5,
  }))
);
