import { Prisma, PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

export interface TaskFilters {
  status?: TaskStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export const createTask = async (
  userId: number,
  data: { title: string; description?: string; status?: TaskStatus }
) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status ?? TaskStatus.PENDING,
      userId
    }
  });
};

export const getTasks = async (userId: number, filters: TaskFilters) => {
  const page = Math.max(1, filters.page ?? 1);
  const limit = Math.min(50, Math.max(1, filters.limit ?? 10));
  const skip = (page - 1) * limit;

  const where: Prisma.TaskWhereInput = {
    userId,
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.search
      ? { title: { contains: filters.search, mode: "insensitive" } }
      : {})
  };

  const [tasks, total] = await prisma.$transaction([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.task.count({ where })
  ]);

  return {
    tasks,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  };
};

export const getTaskById = async (userId: number, id: number) => {
  const task = await prisma.task.findFirst({
    where: { id, userId }
  });

  if (!task) {
    const error = new Error("Task not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return task;
};

export const updateTask = async (
  userId: number,
  id: number,
  data: { title?: string; description?: string | null; status?: TaskStatus }
) => {
  await getTaskById(userId, id);

  return prisma.task.update({
    where: { id },
    data
  });
};

export const deleteTask = async (userId: number, id: number) => {
  await getTaskById(userId, id);

  return prisma.task.delete({
    where: { id }
  });
};
