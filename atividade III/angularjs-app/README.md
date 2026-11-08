# EduTech — Atividade III: AngularJS

Aplicação web responsiva construída com **AngularJS 1.8**, com seis componentes
visuais implementados como **diretivas**, arquitetura modular e nenhuma
dependência além do próprio framework.

Universidade Católica do Salvador — Escola de Tecnologias
Curso de Engenharia de Software · Professor Elton Figueiredo da Silva

---

## Como executar

A aplicação é HTML + JS puro, sem etapa de build.

**Opção 1 — abrir direto:** dê um duplo clique em `index.html`.
Funciona porque os templates das diretivas são strings embutidas no JavaScript,
sem `templateUrl` (que exigiria um servidor por causa da política de CORS).

**Opção 0 — arquivo único (`index-standalone.html`):** mesma aplicação, com o
AngularJS, o CSS e os 12 arquivos JavaScript embutidos em um único HTML de
236 KB. Abre em qualquer lugar, inclusive onde o carregamento de arquivos
externos não funciona. É um arquivo **gerado** a partir dos arquivos desta
pasta — o código que vale para a avaliação é o modular descrito abaixo.

**Opção 2 — servidor local (recomendado):**

```bash
# com Python
python3 -m http.server 8080

# ou com Node
npx serve .
```

Depois acesse `http://localhost:8080`.

**Opção 3 — GitHub Codespaces:** abra o repositório em um Codespace, rode um dos
comandos acima e use a aba *Ports* para abrir a porta 8080 no navegador.

---

## Estrutura de arquivos

```
angularjs-app/
├── index.html                       # página única, com a declaração ng-app
├── css/
│   └── styles.css                   # estilos (mobile first, sem frameworks)
├── vendor/
│   ├── angular.min.js               # AngularJS 1.8.3 servido localmente
│   └── angular.js                   # versão não minificada, para depuração
└── js/
    ├── app.js                       # MÓDULO PRINCIPAL — orquestra os demais
    ├── services/
    │   ├── core.module.js           # declaração do módulo eduTech.core
    │   ├── catalogoFactory.js       # factory: dados, filtro e paginação
    │   ├── toastService.js          # service: fila global de notificações
    │   └── uploadService.js         # service: simulação de upload
    ├── filters/
    │   └── filtros.js               # 4 filtros de formatação
    ├── directives/
    │   ├── components.module.js     # declaração do módulo eduTech.components
    │   ├── acordeao.directive.js        # componente 1
    │   ├── paginacao.directive.js       # componente 2
    │   ├── barraProgresso.directive.js  # componente 3
    │   ├── abas.directive.js            # componente 4
    │   ├── menuSuspenso.directive.js    # componente 5
    │   └── notificacaoToast.directive.js# componente 6
    └── controllers/
        └── mainController.js        # liga os dados às diretivas
```

### Arquitetura modular

```
eduTechApp  (app.js — módulo principal)
   ├── eduTech.core        → catalogoFactory, toastService, uploadService, filtros
   └── eduTech.components  → as 6 diretivas visuais
```

O módulo principal não contém lógica: ele apenas declara as dependências.
Cada diretiva recebe tudo de que precisa por *bindings*, sem acessar o
`$scope` do pai, o que permite reutilizá-la em qualquer outra aplicação.

---

## Os seis componentes

| # | Componente | Diretiva | Bindings |
|---|---|---|---|
| 1 | Acordeão | `<acordeao>` | `itens=`, `apenas-um-aberto=`, `ao-alternar&` |
| 2 | Paginação | `<paginacao>` | `pagina-atual=`, `total-paginas=`, `ao-mudar-pagina&` |
| 3 | Barra de progresso | `<barra-progresso>` | `progresso=`, `rotulo@`, `mostrar-percentual=` |
| 4 | Abas | `<abas>` | `itens=`, `aba-inicial=`, `ao-trocar&` |
| 5 | Menu suspenso | `<menu-suspenso>` | `rotulo@`, `opcoes=`, `selecionada=`, `ao-selecionar&` |
| 6 | Notificação Toast | `<notificacao-toast>` | `posicao@` + fila do `toastService` |

**Detalhes de cada implementação**

1. **Acordeão** — guarda `indiceAberto` no próprio escopo; abrir um item fecha o
   anterior. A transição usa `max-height` animado, e o ícone `+` gira 45° virando
   um `×`.
2. **Paginação** — monta os botões numerados a partir de `totalPaginas`, marca a
   página atual e desabilita *Anterior* / *Próxima* nos extremos. A troca de
   página é devolvida ao controlador pelo callback `ao-mudar-pagina`.
3. **Barra de progresso** — recebe um número de 0 a 100, limita o valor com
   `Math.min/Math.max` e aplica a largura via `ng-style`. A cor muda conforme a
   faixa (início, avançado, concluído). A mesma diretiva aparece cinco vezes na
   página, provando que é reutilizável.
4. **Abas** — mantém `indiceAtivo` no escopo e exibe só o painel correspondente
   (`ng-if`). No celular a barra de títulos rola horizontalmente.
5. **Menu suspenso** — controla a visibilidade pelo escopo e fecha ao escolher uma
   opção, ao clicar fora (listener em `$document`, removido no `$destroy`) ou ao
   pressionar `ESC`.
6. **Notificação Toast** — a diretiva só renderiza; quem decide *quando* notificar é
   o `toastService`, que mantém a fila e agenda a remoção com `$timeout`. Existem
   quatro tipos: sucesso, erro, aviso e informação.

---

## Conceitos de AngularJS demonstrados

| Conceito | Onde ver |
|---|---|
| Diretivas com escopo isolado | os seis arquivos em `js/directives/` |
| Controlador | `js/controllers/mainController.js` |
| `$scope` e `ng-model` (two-way binding) | formulário de inscrição em `index.html` — o bloco "Pré-visualização" muda enquanto se digita |
| Factory | `catalogoFactory` — dados, filtro e paginação |
| Services | `toastService` e `uploadService` |
| Filtros | `moedaBrasileira`, `cargaHoraria`, `milhar`, `resumo` |
| `ng-click` | botões de paginação, acordeão, abas, upload |
| `ng-change` | campo "Nome completo" dispara um aviso aos 20 caracteres |
| `ng-repeat`, `ng-if`, `ng-class`, `ng-style`, `ng-disabled` | por toda a página |
| `$timeout` / `$interval` | `toastService` e `uploadService` |

---

## Responsividade

Folha de estilo escrita em **mobile first**, com três pontos de quebra:

| Faixa | Comportamento |
|---|---|
| < 640px (celular) | tudo em uma coluna; cards de curso empilhados; paginação só com setas; cabeçalho em duas linhas |
| ≥ 640px (tablet) | cards de curso em 2 colunas; textos "Anterior/Próxima" aparecem; cabeçalho em linha única |
| ≥ 1024px (desktop) | cards em 4 colunas; seções lado a lado em 2 colunas |

Também há suporte a `prefers-reduced-motion` para quem desativa animações no
sistema operacional.

---

## Se a página aparecer com `{{ }}` na tela

Significa que algum arquivo dentro de `js/` não chegou ao navegador. O AngularJS
compila a página inteira antes de fazer o *linking*, então os templates das
diretivas aparecem, mas nenhuma interpolação é avaliada e nenhum `ng-repeat`
roda — a tela fica com as chaves cruas e as listas vazias.

O `index.html` tem um bloco de verificação no final que detecta isso e mostra
na tela o nome do arquivo que faltou. Causas comuns:

- a pasta foi extraída pela metade (abrir o `index.html` de dentro do `.zip`,
  sem extrair, é o caso mais frequente);
- o projeto foi enviado ao GitHub sem a pasta `js/controllers/`;
- alguma extensão do navegador bloqueou os scripts.

Em qualquer um desses casos, `index-standalone.html` funciona, porque não
depende de nenhum arquivo externo.

## Verificação feita

A aplicação foi testada automaticamente em 390px, 768px e 1366px: todos os seis
componentes respondem corretamente, não há rolagem horizontal indevida e o
console do navegador fica limpo (nenhum erro).
