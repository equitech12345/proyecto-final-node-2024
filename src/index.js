import express from "express";
import ProductsRouter from "./routers/products-routers.js";
import AuthRouter from "./routers/auth-router.js";
import { rateLimitConfig } from "./config/rateLimitConfig.js";
import helmet from "helmet";
import {healthRouter} from "./routers/health-router.js";

import './config/mongoDB.js';
const PORT = process.env.PORT || 4000;
const app = express();

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    app.use(rateLimitConfig);
    app.use(helmet());
}
app.use(express.json());
app.use("/api/products", ProductsRouter);
app.use("/api/users", AuthRouter);
app.use('/health', healthRouter);


app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running at http://localhost:${PORT}
            Ctrl + C to stop`);
    }
);
