import 'dotenv/config';
import app from './app.js';

const port = process.env.PORT || 3000;

// O servidor só vai usar o app.listen se estiver rodando no seu computador (localhost)
// Na Vercel, ela mesma cuida de ligar o servidor!
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

// A correção mágica: exportar o 'app' em vez do 'port'
export default app;