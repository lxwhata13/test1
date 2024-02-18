import { CURRENCY_NAME } from 'src/utils/constants';

export default {
  label: {
    amount: 'Withdrawal Amount',
    unlockWithdraw: 'Unlock withdraw',
    amountToWithdraw: 'Amount to withdraw',
    bankAccount: 'Bank account information',
    setBankAccount: 'Set bank account',
    bindPixWallet: 'Bind PIX Wallet',
    withdrawOrderSubmitted: 'Order has been submitted',
    withdrawInstruction: 'Withdrawal instruction',
  },
  message: {
    minAmount: `Min withdraw amount required: >= ${CURRENCY_NAME}{amount}`,
    maxAmount: `Max withdraw amount required: <= ${CURRENCY_NAME}{amount}`,
    notEnoughBalance: 'Not enough balance',
    bindPixWallet:
      'You should bind PIX wallet to your account before withdrawal.',
    withdrawOrderSubmitted:
      'We will review your order as soon as possible, and the withdrawal amount will be transfer to your account after the review is passed',
  },
  placeholder: {
    unfilled: 'Unfilled',
    withdrawAmount: 'Enter amount to withdraw',
  },
  status: {
    INIT: 'Init',
    LOCKED: 'Pending',
    PENDING: 'Pending',
    CANCELLED: 'Cancelled',
    SUCCESS: 'Success',
    RETURNED: 'Returned',
    FAIL: 'Pending',
  },
};
