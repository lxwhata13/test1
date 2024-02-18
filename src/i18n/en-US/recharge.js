import { CURRENCY_NAME, CURRENCY_SYMBOL } from 'src/utils/constants';

export default {
  label: {
    selectAmount: 'Choose amount to recharge',
    payMethod: 'Select Payment Method',
    extraBonus: 'Extra bonus',
    rechargeInstruction: 'Deposit instruction',
    acceptBonus: 'Whether to accept additional recharge rewards',
  },
  placeholder: {
    rechargeAmount: 'Please enter amount to recharge',
  },
  message: {
    selectAmount: 'Please select amount to recharge',
    minRechargeAmount: 'Amount should greater than or equal to {amount}',
  },
  status: {
    INIT: 'Init',
    PENDING: 'Pending',
    SUCCESS: 'Success',
    FAIL: 'Failed',
  },
};
