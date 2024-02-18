export default {
  server: {
    invalidAccountStatus: 'Status de conta inválida',
    invalidMobileNumber: 'Número de celular inválido',
    invalidSmsPhoneNumber:
      'Não é possível enviar sms para este celular designado',
    accountNameRequired: 'Nome da conta é obrigatório',
    accountNotExists: 'A conta não existe',
    cert_id_exists: 'A ID de certificação já existe',
    invalid_cert_id_format: 'Formato de ID de certificação inválido',
    accountExists: 'A conta de usuário já existe',
    registerIpRestrict: 'O IP atingiu o limite máximo de uso registrado',
    invalidPassword: 'Senha errada',
    sendSmsLimited:
      'O SMS excede a limitação do sistema, por favor tente mais tarde',
    sendSmsFailed: 'O envio de SMS falhou',
    smsChannelDown: 'Canal SMS temporariamente desligado',
    identifyCodeNotSent: 'Código de verificação inválido',
    identifyCodeNotMatch: 'Código de verificação errado',
    invalidInviteCode: 'Código de convite errado',
    cooldown: 'Aguarde até que o timer de resfriamento expire',
    wrong_password: 'Senha errada',
    identify_code_not_match: 'Código de verificação errado',
    not_enough_balance: 'Não há saldo suficiente',
    insufficient_withdraw_point:
      'Também é necessário completar o volume de apostas qualificadas @:common.currencyAmount',
    min_withdraw_amount: 'Não é permitido o valor do saque',
    vip_withdrawal_limit: 'O número máximo de retiradas hoje foi atingido',
    invalid_withdraw_amount: 'Não é permitido o valor do saque',
    invalid_bet_amount: 'Motante de aposta inválido',
    channel_server_error: 'Canal de pagamento temporariamente indisponível',
    http_request_error: 'Canal de pagamento temporariamente indisponível',
    channel_timeout: 'Canal de pagamento temporariamente indisponível',
    recharge_time_limit:
      'Recarga não é permitida neste momento, por favor tente mais tarde',
    invalid_recharge_amount:
      'É agora permitido um montante de transferência menor do que o necessário',
    wallet_balance_0:
      'Saldo insuficiente na carteira, por favor mantenha pelo menos 0,01 USDT em sua carteira',
    already_signup: 'Você assinou hoje',
    vip_bonus_received: 'As recompensas VIP foram reivindicadas',
    reward_not_found: 'A recompensa não existe',
    reward_expired: 'A recompensa expirou',
    game_in_maintenance: 'O jogo está em manutenção',
    restricted_country: 'O país está restrito',
    permission_denied: 'Permissão negada',
    exception: 'Algo deu errado',
    unknown: 'Algo deu errado',
    inviteUserNotExitOrDeactived: 'O autor do convite não existe ou foi desativado'    
  },
  network: {
    400: 'Má solicitação',
    401: 'Não autorizado',
    403: 'Proibido',
    404: 'O recurso não existe',
    405: 'Erro de rede',
    408: 'Tempo de requerimento esgotado',
    500: 'Erro interno do servidor',
    501: 'Erro interno do servidor',
    502: 'Erro de rede do servidor',
    503: 'Servidor temporariamente indisponível',
    504: 'Tempo de rede esgotado',
    505: 'Erro de navegador',
    unknown: 'Dados de carga falharam devido a erro na rede',
  },
  hint: {
    not_enough_balance:
      'Você não tem saldo suficiente para completar a operação, você pode ir para a página de recarga para recarregar sua conta.',
    network:
      'Sorry，something deu errado na comunicação com o servidor, por favor verifique sua rede e tente novamente mais tarde.',
    404: 'Oops, nada foi encontrado aqui...',
  },
};
