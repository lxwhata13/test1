import { CURRENCY_NAME } from 'src/utils/constants';

export default {
  label: {
    amount: 'Montante de saque',
    unlockWithdraw: 'Desbloquear saque',
    amountToWithdraw: 'Montante a sacar',
    bankAccount: 'Informações da conta bancária',
    setBankAccount: 'Defina conta bancária',
    bindPixWallet: 'Vincule a carteira PIX',
    withdrawOrderSubmitted: 'O pedido foi submetido',
    withdrawInstruction: 'Instrução de saque',
  },
  message: {
    minAmount: `Montante mínimo de saque necessário: >= ${CURRENCY_NAME}{amount}`,
    maxAmount: `MMontante máximo de saque necessário: <= ${CURRENCY_NAME}{amount}`,
    notEnoughBalance: 'Saldo insuficiente',
    bindPixWallet:
      'Você deve vincular a carteira PIX à sua conta antes de saque.',
    withdrawOrderSubmitted:
      'Revisaremos seu pedido assim que possível, e o valor do saque será transferido para sua conta após a revisão ser aprovada',
  },
  placeholder: {
    unfilled: 'Não preenchido',
    withdrawAmount: 'Digite o valor a sacar',
  },
  status: {
    INIT: 'Inicialização',
    LOCKED: 'Pendente',
    PENDING: 'Pendente',
    CANCELLED: 'Cancelado',
    SUCCESS: 'Sucesso',
    RETURNED: 'Devolvido',
    FAIL: 'Pendente',
  },
};
