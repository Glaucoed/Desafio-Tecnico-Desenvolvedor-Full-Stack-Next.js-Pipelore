import prisma from "@/lib/prisma";

export async function getOrderById(id: string) {
  const order = await prisma.orderRepair.findUnique({
    where: { id: Number(id) },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return {
    ...order,
    id: String(order.id),
    dueDate: order.dueDate || new Date(),
    completedAt: order.completedAt || undefined,
  };
}
