import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log("REQ:", req.method, req.url, req.body);
    next();
  });
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/tasks", taskRoutes);

// Swagger
app.get("/docs.json", (req, res) => res.json(swaggerSpec));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});




