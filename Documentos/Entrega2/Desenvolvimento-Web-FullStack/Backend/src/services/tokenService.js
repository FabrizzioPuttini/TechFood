import 'dotenv/config'; // <-- 1. Força o carregamento das variáveis logo na primeira linha
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Lista de tokens revogados (logout). Em producao usaria Redis ou banco.
const denylist = new Set();

// Definição de chaves reservas caso a Vercel falhe em injetar as variáveis
const JWT_SECRET_FALLBACK = process.env.JWT_SECRET || 'techfood_segredo_reserva_ultra_secreto_123';
const JWT_EXPIRES_FALLBACK = process.env.JWT_EXPIRES || '1h';

export const createToken = (payload) => {
  const jti = uuidv4();
  const token = jwt.sign(
    { ...payload, jti },
    JWT_SECRET_FALLBACK, // <-- 2. Usa o segredo seguro com plano B
    { expiresIn: JWT_EXPIRES_FALLBACK }
  );
  return { token, jti };
};

export const isDenied = (jti) => denylist.has(jti);

export const denyToken = (jti) => {
  if (jti) denylist.add(jti);
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    // 3. Usa o mesmo segredo seguro aqui para verificar o token
    jwt.verify(token, JWT_SECRET_FALLBACK, (err, decoded) => {
      if (err) return reject(err);
      if (isDenied(decoded.jti)) return reject(new Error('Token denylisted'));
      resolve(decoded);
    });
  });