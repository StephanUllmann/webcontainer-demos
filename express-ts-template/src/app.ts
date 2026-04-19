import express from 'express';
import { blogPostRoutes } from '#routes';
import { errorHandler, notFoundHandler } from '#middleware';
import initDB from '#db';

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());

app.use('/', (req, res) => {
  res.json({ msg: 'Hi there, hello!' });
});
app.use('/posts', blogPostRoutes);
app.use('*splat', notFoundHandler);
app.use(errorHandler);

initDB().then(() => {
  app.listen(port, () =>
    console.log(`\x1b[35mExample app listening at http://localhost:${port}\x1b[0m`)
  );
});
