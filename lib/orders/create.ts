import prisma from "@/lib/prisma";
import {
  CreateRepairOrderInput,
  RepairOrder,
  Priority,
  Status,
} from "@/types/orders";

export async function createOrder(
  input: CreateRepairOrderInput
): Promise<RepairOrder> {
  const order = await prisma.orderRepair.create({
    data: {
      ...input,
      dueDate: new Date(input.dueDate),
    },
  });

  return {
    ...order,
    id: order.id.toString(),
    priority: order.priority as Priority,
    status: order.status as Status,
    completedAt: order.completedAt || undefined,
    dueDate: order.dueDate || new Date(),
  };
}
