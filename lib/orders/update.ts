import prisma from "@/lib/prisma";
import { UpdateRepairOrderInput, RepairOrder } from "@/types/orders";

export async function updateOrder(
  id: string,
  input: UpdateRepairOrderInput
): Promise<RepairOrder> {
  const order = await prisma.orderRepair.update({
    where: { id: Number(id)},
    data: {
      ...input,
      dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      completedAt: input.completedAt ? new Date(input.completedAt) : null,
    },
  });

  return {
    ...order,
    id: String(order.id),
    dueDate: order.dueDate || new Date(),
    completedAt: order.completedAt || undefined,
  };
}
