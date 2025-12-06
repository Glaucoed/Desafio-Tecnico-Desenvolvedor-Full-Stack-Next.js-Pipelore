import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.orderRepair.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}
  