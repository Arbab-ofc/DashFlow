import { PrismaClient, TaskStatus } from "@prisma/client";
import { hashPassword } from "./password";

export const seedDatabase = async (prisma: PrismaClient): Promise<void> => {
  const existingUsers = await prisma.user.count();

  if (existingUsers > 0) {
    return;
  }

  const hashedPassword = await hashPassword("Demo123456");

  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@dashflow.com",
      password: hashedPassword
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Review onboarding tasks",
        description: "Walk through the initial workflow setup.",
        status: TaskStatus.PENDING,
        userId: user.id
      },
      {
        title: "Plan weekly priorities",
        description: "Highlight top outcomes for the next sprint.",
        status: TaskStatus.PENDING,
        userId: user.id
      },
      {
        title: "Close completed deliverables",
        description: "Verify everything shipped and archived.",
        status: TaskStatus.COMPLETED,
        userId: user.id
      }
    ]
  });
};
