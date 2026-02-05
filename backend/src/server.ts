import { PrismaClient } from "@prisma/client";
import app from "./app";
import { config } from "./config/env";

const prisma = new PrismaClient();

const startServer = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Database connected");

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
