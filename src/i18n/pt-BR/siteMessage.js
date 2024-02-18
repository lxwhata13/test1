export default {
  title: ({ named }) => {
    const typeName = named('type');

    switch (typeName) {
      case 'recharge_audit_reject':
        return 'Depósito falhou';
      case 'recharge':
        return 'Depósito com sucesso';
      case 'withdraw_audit_pass':
        return `Resultado da auditoria de saque`;
      case 'withdraw_audit_reject':
        return `Resultado da auditoria de saque`;
      case 'withdraw_success':
        return `Saque concluído`;
      case 'withdraw_failed':
        return `Saque falhou`;
      case 'withdraw_returned':
        return `Saque falhou`;
      case 'team_commission':
        return 'Comissão da equipe chegou';
      case 'general_promotion':
        return 'Bônus de promoção recompensado';
      case 'vip_upgrade':
        return 'Subir de nível vip';
      case 'admin':
        return `${named('title')}`;
      default:
        return '';
    }
  },

  content: ({ named, linked }) =>
    linked(`siteMessage.content_${named('type')}`),
  content_recharge_audit_reject:
    'Caro {userName}, a revisão da recarga que você iniciou em {insertedAt} foi rejeitada. Se você tiver alguma dúvida, favor entrar em contato com o serviço de atendimento ao cliente.',
  content_recharge:
    'Caro {userName}, o número do pedido que você iniciou em {insertedAt} é: A recarga de {orderNo} chegou!',
  content_withdraw_audit_pass:
    'Caro {userName}, seu pedido de saque que você iniciou em {insertedAt}, foi aprovado, e a quantia recebida é @:common.currencyAmount. Por favor, preste atenção em sua conta bancária',
  content_withdraw_success:
    'Caro {userName}, seu pedido de saque que você iniciou em {insertedAt}, foi recebido com sucesso, e a quantia recebida é @:common.currencyAmount. Por favor, preste atenção em sua conta bancária',
  content_withdraw_failed:
    'Caro {userName}, a revisão de saque que você iniciou em {insertedAt} falhou',
  content_withdraw_returned:
    'Caro {userName}, o valor da retirada que você enviou em {insertedAt} foi reembolsado em sua conta, o motivo: {reason}, verifique o saldo da sua conta',
  content_withdraw_audit_reject:
    'Caro {userName}, a revisão de saque que você iniciou em {insertedAt} foi rejeitada. Motivo da rejeição: Informação incorreta da carteira. Se você tiver alguma dúvida, favor entrar em contato com o serviço de atendimento ao cliente.',
  content_general_promotion:
    'Caro {userName}, você recebeu um bônus de promoção de @:common.currencyAmount em {insertedAt}. Foi adicionado à sua conta, por favor, verifique.',
  content_vip_upgrade:
    'Caro {userName}, você foi promovido para o nível vip {vipLevel} em {insertedAt}.',
  content_team_commission:
    'Caro {userName}, sua equipe compartilha uma comissão total de @:common.currencyAmount em {date}. Foi adicionado à sua conta, por favor, verifique.',
  content_admin: '{content}',
};
