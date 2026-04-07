import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Vite + Express + TypeScript!');
});

app.get('/test', (req, res) => {
  res.json({
    msg: 'Test route',
  });
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

app.get('/whatever', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(
    `<h1>Hello</h1><img src='https://upload.wikimedia.org/wikipedia/commons/8/8d/LS3_4919_%28cropped%29.jpg'  alt=''/>`
  );
});

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

export const viteNodeApp = app;
