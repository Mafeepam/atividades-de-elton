/**
 * toastService.js — Serviço global de notificações.
 *
 * Usa `reactive` do Vue para expor uma fila observável. Qualquer componente
 * pode importar este módulo e chamar toastService.sucesso('...'); o
 * componente <NotificacaoToast> apenas renderiza a fila.
 */
import { reactive } from 'vue';

const estado = reactive({
  notificacoes: []
});

let proximoId = 1;
const DURACAO_PADRAO = 4000; // ms

/**
 * Enfileira uma notificação e agenda sua remoção automática.
 * @param {string} mensagem texto exibido
 * @param {'sucesso'|'erro'|'aviso'|'informacao'} tipo
 * @param {number} [duracao] tempo em ms até sumir sozinha
 */
function exibir(mensagem, tipo = 'informacao', duracao = DURACAO_PADRAO) {
  const notificacao = {
    id: proximoId++,
    mensagem,
    tipo,
    criadaEm: new Date()
  };

  estado.notificacoes.push(notificacao);
  notificacao.temporizador = setTimeout(() => fechar(notificacao.id), duracao);

  return notificacao.id;
}

/** Remove uma notificação específica. */
function fechar(id) {
  const indice = estado.notificacoes.findIndex((n) => n.id === id);
  if (indice === -1) return;

  clearTimeout(estado.notificacoes[indice].temporizador);
  estado.notificacoes.splice(indice, 1);
}

/** Esvazia a fila inteira. */
function limpar() {
  [...estado.notificacoes].forEach((n) => fechar(n.id));
}

export const toastService = {
  estado,
  exibir,
  fechar,
  limpar,
  sucesso: (mensagem, duracao) => exibir(mensagem, 'sucesso', duracao),
  erro: (mensagem, duracao) => exibir(mensagem, 'erro', duracao),
  aviso: (mensagem, duracao) => exibir(mensagem, 'aviso', duracao),
  informacao: (mensagem, duracao) => exibir(mensagem, 'informacao', duracao)
};

export default toastService;
