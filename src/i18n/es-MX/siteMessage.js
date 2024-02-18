export default {
  title: ({ named }) => {
    const typeName = named('type');

    switch (typeName) {
      case 'recharge_audit_reject':
        return 'Depósito fallido';
      case 'recharge':
        return 'Depósito exitoso';
      case 'withdraw_audit_pass':
        return `Resultado de revisión de retiro`;
      case 'withdraw_audit_reject':
        return `Resultado de revisión de retiro`;
      case 'withdraw_success':
        return `Retiro completado`;
      case 'withdraw_failed':
        return `Retiro fallido`;
      case 'withdraw_returned':
        return `Retiro fallido`;
      case 'team_commission':
        return 'Comisión de equipo recibida';
      case 'general_promotion':
        return 'Bonificación promocional concedida';
      case 'vip_upgrade':
        return 'Ascender al nivel de VIP';
      case 'admin':
        return `${named('title')}`;
      default:
        return '';
    }
  },

  content: ({ named, linked }) =>
    linked(`siteMessage.content_${named('type')}`),
  content_recharge_audit_reject:
    'Estimado/a {userName}, tu solicitud de depósito realizada el {insertedAt} ha sido rechazada. Si tienes alguna pregunta, contacta con el servicio al cliente.',
  content_recharge:
    'Estimado/a {userName}, tu depósito con el número de pedido {orderNo} realizado el {insertedAt} ha sido exitoso.',
  content_withdraw_audit_pass:
    'Estimado/a {userName}, tu solicitud de retiro realizada el {insertedAt} ha sido aprobada. Recibirás un total de @:common.currencyAmount. Por favor, revisa tu cuenta bancaria.',
  content_withdraw_success:
    'Estimado/a {userName}, tu solicitud de retiro realizada el {insertedAt} ha sido exitosamente procesada. Por favor, revisa tu cuenta bancaria.',
  content_withdraw_failed:
    'Estimado/a {userName}, tu solicitud de retiro realizada el {insertedAt} ha fallado.',
  content_withdraw_returned:
    'Estimado/a {userName}, la cantidad que intentaste retirar el {insertedAt} ha sido devuelta a tu cuenta debido a: {reason}. Por favor, verifica tu saldo.',
  content_withdraw_audit_reject:
    'Estimado/a {userName}, tu solicitud de retiro realizada el {insertedAt} ha sido rechazada. La razón es que la información de tu cartera es incorrecta. Si tienes alguna pregunta, contacta con el servicio al cliente.',
  content_general_promotion:
    'Estimado/a {userName}, has recibido una bonificación promocional de @:common.currencyAmount el {insertedAt}. Este monto ha sido añadido a tu cuenta.',
  content_vip_upgrade:
    'Estimado/a {userName}, felicitaciones, has sido ascendido al nivel VIP {vipLevel} el {insertedAt}.',
  content_team_commission:
    'Estimado/a {userName}, tu equipo ha compartido una comisión total de @:common.currencyAmount el {date}. Este monto ha sido añadido a tu cuenta.',
  content_admin: '{content}',
};
