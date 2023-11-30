import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import routes from './routers';

// setup application
const app: Express = express();
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
)

//routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});