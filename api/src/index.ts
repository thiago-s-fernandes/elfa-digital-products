import FastifyServer from "@/infra/http/fastify";

async function startServer() {
  const server = new FastifyServer();

  await server.start();

  process.on("SIGINT", async () => {
    await server.stop();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await server.stop();
    process.exit(0);
  });
}

startServer().catch(err => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
