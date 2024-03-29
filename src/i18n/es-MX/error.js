export default {
  server: {
    invalidAccountStatus: 'Estado de cuenta no válido',
    invalidMobileNumber: 'Número de móvil no válido',
    invalidSmsPhoneNumber: 'No se puede enviar SMS al número proporcionado',
    accountNameRequired: 'Nombre de cuenta requerido',
    accountNotExists: 'La cuenta no existe',
    cert_id_exists: 'ID de certificación ya existe',
    invalid_cert_id_format: 'Formato de ID de certificación no válido',
    accountExists: 'La cuenta de usuario ya existe',
    registerIpRestrict: 'IP restringida para registro, se ha alcanzado el máximo de intentos',
    invalidPassword: 'Contraseña incorrecta',
    sendSmsLimited: 'Se ha superado el límite de envío de SMS, inténtelo más tarde',
    sendSmsFailed: 'Error al enviar SMS',
    smsChannelDown: 'Canal de SMS temporalmente cerrado',
    identifyCodeNotSent: 'Código de verificación no válido',
    identifyCodeNotMatch: 'El código de verificación no coincide',
    invalidInviteCode: 'Código de invitación no válido',
    cooldown: 'Por favor, espere a que termine el tiempo de enfriamiento',
    wrong_password: 'Contraseña incorrecta',
    identify_code_not_match: 'El código de verificación no coincide',
    not_enough_balance: 'Saldo insuficiente',
    insufficient_withdraw_point: 'Se necesita más apuestas válidas para retirar @:common.currencyAmount',
    min_withdraw_amount: 'Cantidad mínima de retiro no permitida',
    vip_withdrawal_limit: 'Se ha alcanzado el límite de retiros para hoy',
    invalid_withdraw_amount: 'Monto de retiro no válido',
    invalid_bet_amount: 'Cantidad de apuesta no válida',
    channel_server_error: 'Canal de pago no disponible temporalmente',
    http_request_error: 'Canal de pago no disponible temporalmente',
    channel_timeout: 'Canal de pago no disponible temporalmente',
    recharge_time_limit: 'Recarga no permitida en este momento, inténtelo más tarde',
    invalid_recharge_amount: 'La cantidad para recargar es inferior a la requerida',
    wallet_balance_0: 'Saldo insuficiente en la cartera, mantenga al menos 0.01 USDT',
    already_signup: 'Ya se ha registrado hoy',
    vip_bonus_received: 'Bonificación VIP ya recibida',
    reward_not_found: 'Recompensa no encontrada',
    reward_expired: 'La recompensa ha caducado',
    game_in_maintenance: 'Juego en mantenimiento',
    restricted_country: 'País restringido',
    permission_denied: 'Permiso denegado',
    exception: 'Ha ocurrido un error',
    unknown: 'Error desconocido',
    inviteUserNotExitOrDeactived: 'El autor de la invitación no existe o ha sido desactivado'    
  },
  network: {
    400: 'Solicitud incorrecta',
    401: 'No autorizado',
    403: 'Prohibido',
    404: 'Recurso no encontrado',
    405: 'Error de red',
    408: 'Tiempo de solicitud agotado',
    500: 'Error interno del servidor',
    501: 'Error interno del servidor',
    502: 'Error de red del servidor',
    503: 'Servidor temporalmente no disponible',
    504: 'Tiempo de espera de red agotado',
    505: 'Error de navegador',
    unknown: 'Error de carga de datos debido a un error de red',
  },
  hint: {
    not_enough_balance: 'Su saldo es insuficiente para completar esta operación, puede recargar su cuenta.',
    network: 'Lo sentimos, hubo un problema al comunicarse con el servidor. Por favor, compruebe su red y vuelva a intentarlo.',
    404: 'Vaya, no hay nada aquí...',
  },
};
