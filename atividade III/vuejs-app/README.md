# EduTech — Atividade III: Desafio Extra em Vue.js

Mesma aplicação do exercício principal, reescrita com **Vue 3** usando
*Single File Components* (`.vue`), build com **Vite** e seis componentes visuais
que se comunicam por **props** e **$emit**.

Universidade Católica do Salvador — Escola de Tecnologias
Curso de Engenharia de Software · Professor Elton Figueiredo da Silva

---

## Como executar

```bash
# 1. instalar as dependências (uma vez)
npm install

# 2. rodar em modo de desenvolvimento
npm run dev
```

O Vite abre em `http://localhost:5173`. O parâmetro `--host` já está no script,
então no **GitHub Codespaces** basta abrir a porta 5173 pela aba *Ports*.

Para gerar a versão de produção:

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve a pasta dist/ para conferência
```

---

## Estrutura de arquivos

```
vuejs-app/
├── index.html                 # casca HTML com a <div id="app">
├── package.json
├── vite.config.js
└── src/
    ├── main.js                # cria a aplicação e monta App.vue
    ├── App.vue                # COMPONENTE PRINCIPAL — orquestra os demais
    ├── assets/
    │   └── estilos.css        # estilos globais (mobile first)
    ├── services/
    │   ├── catalogoService.js # dados, filtro, paginação e simulação de upload
    │   └── toastService.js    # fila reativa global de notificações
    └── components/
        ├── AcordeaoComponent.vue        # componente 1
        ├── PaginacaoComponent.vue       # componente 2
        ├── BarraProgressoComponent.vue  # componente 3
        ├── AbasComponent.vue            # componente 4
        ├── MenuSuspensoComponent.vue    # componente 5
        └── NotificacaoToast.vue         # componente 6
```

`App.vue` não contém regra de negócio: ele busca os dados nos *services*,
passa tudo por props e reage aos eventos emitidos pelos filhos. Cada componente
carrega o próprio CSS em um bloco `<style scoped>`, de modo que os estilos nunca
vazam para o resto da página.

---

## Os seis componentes

| # | Componente | Props | Eventos emitidos |
|---|---|---|---|
| 1 | `AcordeaoComponent` | `itens`, `apenasUmAberto`, `abrirPrimeiro` | `alternar` |
| 2 | `PaginacaoComponent` | `paginaAtual`, `totalPaginas` | `mudar-pagina` |
| 3 | `BarraProgressoComponent` | `progresso`, `rotulo`, `mostrarPercentual` | `concluido` |
| 4 | `AbasComponent` | `itens`, `abaInicial` | `trocar` |
| 5 | `MenuSuspensoComponent` | `rotulo`, `opcoes`, `selecionada` | `selecionar` |
| 6 | `NotificacaoToast` | `posicao` | — (lê a fila do `toastService`) |

**Detalhes de cada implementação**

1. **Acordeão** — o estado (`indiceAberto`) fica no `data` do componente; a
   animação usa `<transition>` do próprio Vue. O hook `mounted` pode abrir o
   primeiro item automaticamente.
2. **Paginação** — `paginas`, `naPrimeira` e `naUltima` são *computed
   properties*; a troca de página é comunicada ao pai com
   `this.$emit('mudar-pagina', numero)`.
3. **Barra de progresso** — `valorSeguro` e `classeDaFaixa` são computed; um
   `watch` emite `concluido` exatamente uma vez, quando o valor atinge 100.
   O componente é instanciado cinco vezes na tela com dados diferentes.
4. **Abas** — `indiceAtivo` no `data`, `abaAtiva` como computed, e o hook
   `created` corrige um `abaInicial` fora do intervalo válido.
5. **Menu suspenso** — os hooks `mounted` e `beforeUnmount` registram e removem
   os listeners de "clicar fora" e tecla `ESC` no `document`.
6. **Notificação Toast** — a fila vive em um objeto `reactive` dentro de
   `toastService.js`; qualquer componente importa o serviço e chama
   `toastService.sucesso('...')`. A entrada e a saída são animadas com
   `<transition-group>`.

---

## Conceitos de Vue.js demonstrados

| Conceito | Onde ver |
|---|---|
| Componentes Vue (SFC) | os seis arquivos em `src/components/` |
| Componente principal | `src/App.vue` |
| `props` com `type`, `default` e `validator` | todos os componentes |
| `data` (estado local) | `AcordeaoComponent`, `AbasComponent`, `MenuSuspensoComponent` |
| `computed properties` | `PaginacaoComponent`, `BarraProgressoComponent`, `App.vue` (`cursos`, `totalPaginas`, `resumoInscricao`) |
| `$emit` e `emits` | paginação, acordeão, abas, menu e barra de progresso |
| `v-on` / `@` | todos os cliques e o `@submit.prevent` do formulário |
| `v-model` (two-way binding) | formulário de inscrição — a pré-visualização muda enquanto se digita |
| Lifecycle hooks | `mounted` (App, Acordeão, Menu), `created` (Abas), `beforeUnmount` (App, Menu) |
| `watch` | `BarraProgressoComponent` |
| `v-for`, `v-if`, `v-show`, `:class`, `:style`, `:disabled` | por toda a aplicação |
| `<transition>` e `<transition-group>` | acordeão, menu e toasts |

> **Nota sobre filtros:** o Vue 3 removeu os *filters* existentes no Vue 2. A
> formatação de moeda e de milhar é feita por métodos (`formatarMoeda`,
> `formatarMilhar`) em `App.vue`, que é a forma recomendada pela documentação
> oficial.

---

## Responsividade

Os mesmos três pontos de quebra da versão AngularJS:

| Faixa | Comportamento |
|---|---|
| < 640px (celular) | coluna única; cards empilhados; paginação só com setas |
| ≥ 640px (tablet) | cards em 2 colunas; cabeçalho em linha única |
| ≥ 1024px (desktop) | cards em 4 colunas; seções lado a lado |

---

## Verificação feita

Testado automaticamente em 390px, 768px e 1366px: os seis componentes
funcionam, os eventos chegam ao `App.vue`, não há rolagem horizontal indevida e
o console fica sem erros nem avisos do Vue.
