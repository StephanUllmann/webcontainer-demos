import express from 'express';

const app = express();
const port = 3111;

app.use(express.json());

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

app.get('/whatever', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(
    `<h1>Hello</h1><img src='https://upload.wikimedia.org/wikipedia/commons/8/8d/LS3_4919_%28cropped%29.jpg'  alt=''/>`
  );
});

app.listen(port, () => {
  console.log(`App is live at http://localhost:${port}`);
});
