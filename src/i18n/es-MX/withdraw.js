import { CURRENCY_NAME } from 'src/utils/constants';

export default {
  label: {
    amount: 'Monto del retiro',
    unlockWithdraw: 'Desbloquear retiro',
    amountToWithdraw: 'Monto a retirar',
    bankAccount: 'Información de cuenta bancaria',
    setBankAccount: 'Configurar cuenta bancaria',
    bindBankCard: 'Enlace tarjeta bancaria',
    withdrawOrderSubmitted: 'Solicitud enviada',
    withdrawInstruction: 'Instrucciones para retiro',
  },
  message: {
    minAmount: `Monto mínimo para retiro: >= ${CURRENCY_NAME}{amount}`,
    maxAmount: `Monto máximo para retiro: <= ${CURRENCY_NAME}{amount}`,
    notEnoughBalance: 'Saldo insuficiente',
    bindBankCard: 'Debe vincular su tarjeta bancaria a su cuenta antes de poder retirar dinero.',
    withdrawOrderSubmitted: 'Revisaremos su solicitud lo más pronto posible. Una vez aprobada, el monto se transferirá a su cuenta.',
  },
  placeholder: {
    unfilled: 'Sin completar',
    withdrawAmount: 'Ingrese el monto a retirar',
  },
  status: {
    INIT: 'Inicializado',
    LOCKED: 'En espera',
    PENDING: 'Pendiente',
    CANCELLED: 'Cancelado',
    SUCCESS: 'Éxito',
    RETURNED: 'Devuelto',
    FAIL: 'Fallo',
  },
};
