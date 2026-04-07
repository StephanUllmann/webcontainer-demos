import express from 'express';

const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.get('/test', (req, res) => {
  res.json({
    msg: 'Test route',
  });
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`App is live at http://localhost:${port}`);
});
