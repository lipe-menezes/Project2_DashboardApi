import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Dashboard API",
      version: "1.0.0",
      description: "API do Projeto 2 (CRUD de tarefas com filtros, busca e paginação)."
    },
    servers: [
      { url: "http://localhost:5000", description: "Local" }
    ]
  },
  apis: ["./src/routes/*.js"]
});

