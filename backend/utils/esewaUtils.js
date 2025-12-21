import crypto from 'crypto'

export const generateSignature = (message) => {
  const ESEWA_KEY = "8gBm/:&EnhH.1/q";
  const hmac = crypto.createHmac('sha256', ESEWA_KEY);
  hmac.update(message);

  const base64sign = hmac.digest('base64');

  return base64sign;
}

