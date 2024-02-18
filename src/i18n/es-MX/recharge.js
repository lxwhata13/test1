export default {
  label: {
    selectAmount: 'Por favor, elige el monto a recargar', 
    payMethod: 'Por favor, selecciona el método de pago', 
    extraBonus: 'Bonificación adicional', 
    rechargeInstruction: 'Instrucciones para el depósito', 
    rejectBonus: 'No participar en la promoción', 
    rechargeQrcode: 'Pago', 
    copyQrcode: 'Copiar el código PIX', 
    waitFor10Minutes: 'Por favor, realiza el pago dentro de los próximos 10 minutos.', 
  },
  title: {
    rechargeQrCode: 'Por favor, paga con PIX: @:common.currencyAmount', 
  },
  placeholder: {
    rechargeAmount: 'Por favor, ingresa el monto a recargar', 
  },
  message: {
    selectAmount: 'Por favor, elige el monto a recargar',
    minRechargeAmount: 'El monto debe ser mayor o igual a {amount}',
    transferPixWallet:
      'Abre la aplicación con la contraseña PIX registrada, selecciona "Pagar con PIX" y escanea el código QR o copia y pega el código. Este código QR solo es válido para un pago. Si necesitas realizar otro, solicita uno nuevo',
  },
  status: {
    INIT: 'Inicializado',
    PENDING: 'Pendiente',
    SUCCESS: 'Éxito',
    FAIL: 'Fallo',
  },
};
