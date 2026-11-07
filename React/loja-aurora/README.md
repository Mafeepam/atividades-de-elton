# Atividade React – Loja Aurora

Aplicação web responsiva em **React** com 6 componentes visuais: **Acordeão, Paginação, Barra de Progresso, Abas, Menu Suspenso e Notificação Toast**.

Desafio extra implementado: **Context API** (estado global dos toasts) **e React Router** (5 páginas).

## Estrutura

```
src/
├── main.jsx                 # BrowserRouter + ToastProvider envolvem o App
├── App.jsx                  # Componente principal: layout, rotas, estado do idioma
├── context/ToastContext.jsx # Estado global (Context API) + hook useToast
├── components/
│   ├── Accordion/           # Acordeão (um item aberto por vez, transição suave)
│   ├── Pagination/          # Paginação (anterior/próxima, reticências, aria-current)
│   ├── ProgressBar/         # Barra de progresso (role="progressbar", 0–100)
│   ├── Tabs/                # Abas (role="tablist", navegação por setas)
│   ├── Dropdown/            # Menu suspenso (fecha ao clicar fora / Esc)
│   ├── Toast/               # Toast + ToastContainer (some sozinho, tipos)
│   └── Layout/              # Header (menu hambúrguer) e Footer
├── pages/                   # Home, Produtos, Upload, Perfil, FAQ, NotFound
├── data/                    # Dados fictícios (produtos, FAQ)
└── styles/global.css        # Variáveis, tema escuro e breakpoints
```

## Onde cada componente aparece

| Componente | Página | Conceitos React |
|---|---|---|
| Menu Suspenso | Header (idioma), Produtos (categoria/ordenar) | state, props, callbacks, useEffect (clique fora) |
| Paginação | Produtos | componente controlado: props + callback `onPageChange` |
| Barra de Progresso | Upload, Perfil | props `value`; useEffect + setInterval na página |
| Abas | Perfil | state da aba ativa, conteúdo JSX via props |
| Acordeão | FAQ | state dos itens abertos, itens via props |
| Toast | Todas | Context API global, useEffect para auto-fechar |

## Responsividade

- **Desktop (> 900px):** 3 colunas de produtos, menu horizontal.
- **Tablet (≤ 900px):** 2 colunas, menu hambúrguer, Upload em 1 coluna.
- **Celular (≤ 600px):** 1 coluna, filtros em largura total, toasts no topo, paginação só com setas.

## Acessibilidade

Tags semânticas (`header`, `nav`, `main`, `section`, `article`, `footer`), link "Pular para o conteúdo", `aria-expanded`, `aria-controls`, `aria-selected`, `aria-current`, `role="progressbar"`, `role="tablist"`, `role="listbox"`, `role="alert"/"status"` nos toasts, navegação completa por teclado, foco visível, tema escuro automático e respeito a `prefers-reduced-motion`.
