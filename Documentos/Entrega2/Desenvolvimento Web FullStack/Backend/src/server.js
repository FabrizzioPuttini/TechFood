const express = require('express');
const cors = require('cors'); // <-- 1. Importe o CORS

const app = express();

// 2. Libere o acesso informando a URL exata do seu Frontend (sem a barra / no final)
app.use(cors({
  origin: 'https://tech-food-one.vercel.app'
}));

app.use(express.json());

// ... resto do seu código e rotas abaixo
import 'dotenv/config';
import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default port;