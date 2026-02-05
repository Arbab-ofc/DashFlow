import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/v1", routes);

app.use(errorHandler);

export default app;
