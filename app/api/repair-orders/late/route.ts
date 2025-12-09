import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();

    const lateOrders = await prisma.orderRepair.findMany({
      where: {
        dueDate: {
          lt: now,
        },
        status: {
          in: ["OPEN", "IN_PROGRESS"],
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });
    return NextResponse.json(lateOrders);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
