export default {
  title: ({ named }) => {
    const typeName = named('type');

    switch (typeName) {
      case 'recharge_audit_reject':
        return 'Deposit failed';
      case 'recharge':
        return 'Deposit success';
      case 'withdraw_audit_pass':
        return `Withdrawal audit result`;
      case 'withdraw_audit_reject':
        return `Withdrawal audit result`;
      case 'withdraw_success':
        return `Withdrawal complete`;
      case 'withdraw_failed':
        return `Withdrawal failed`;
      case 'system_bonus':
        return `Bonus received`;
      case 'system_penalty':
        return `Account change`;
      case 'mining_complete':
        return `Mining Complete`;
      case 'virtual_balance_reclaimed':
        return 'Exp token reclaimed';
      case 'user_wallet_verified':
        return 'TRC20 wallet verified';
      case 'user_wallet_verify_failed':
        return 'TRC20 wallet verify failed';
      case 'team_commission':
        return 'Team commission arrived';
      case 'depository_complete':
        return 'USDT earns interest complete';
      case 'admin':
        return `${named('title')}`;
      default:
        return '';
    }
  },

  content: ({ named, linked }) =>
    linked(`siteMessage.content_${named('type')}`),
  content_recharge_audit_reject:
    'Dear {userName}, the recharge review initiated by you on {insertedAt} was rejected. If you have any questions, please contact customer service.',
  content_recharge:
    'Dear {userName}, the order number you initiated on {insertedAt} is: {orderNo}’s recharge has arrived!',
  content_withdraw_audit_pass:
    'Dear {userName}, your withdrawal application initiated on {insertedAt}, has been approved, and the amount received is @:common.currencyAmount. Please pay attention to your bank account',
  content_withdraw_success:
    'Dear {userName}, your withdrawal application initiated on {insertedAt}, has been successfully arrived, and the amount received is @:common.currencyAmount. Please pay attention to your bank account',
  content_withdraw_failed:
    'Dear {userName}, the withdrawal review initiated by you on {insertedAt} was failed',
  content_withdraw_audit_reject:
    'Dear {userName}, the withdrawal review initiated by you on {insertedAt} was rejected. Reason for rejection: Incorrect wallet information. If you have any questions, please contact customer service.',
  content_system_bonus:
    'Dear {userName}, you have received @:common.currencyAmount issued by platform administrator, please check your account.',
  content_system_penalty:
    'Dear {userName}, your account has changed. If you have any questions, please contact customer service.',
  content_mining_complete:
    'Dear {userName}, the mining machine you rented has completed mining and received a total of @:lease.income income, which has been settled into your account balance.',
  content_virtual_balance_reclaimed:
    'Dear {userName}, you have used @:common.virtualAmount exp token to complete the mining machine lease, and this part of the exp token has been recovered by the system.',
  content_user_wallet_verified:
    'Dear {userName}, your wallet address "{trcAddress}" has been verified.',
  content_user_wallet_verify_failed:
    'Dear {userName}, The address "{trcAddress}" you submitted is not a correct trc20 address or the wallet does not exist, please re-submit.',
  content_team_commission:
    'Dear {userName}, Your team share a total commission of @:common.currencyAmount on {date}. It has been added to your account, please check.',
  content_depository_complete:
    'Dear {userName}, your USDT earns interest started at {insertedAt} has completed, your depository amount is @:common.currencyAmount , and profit is @:common.profitAmount',
  content_admin: '{content}',
};
