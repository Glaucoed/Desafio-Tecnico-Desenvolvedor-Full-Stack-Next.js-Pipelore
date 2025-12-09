import prisma from "@/lib/prisma";

export async function deleteOrder(id: number): Promise<boolean> {
  try {
    const exists = await prisma.orderRepair.findUnique({ where: { id } });
    if (!exists) {
      return false;
    }

    await prisma.orderRepair.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
}
