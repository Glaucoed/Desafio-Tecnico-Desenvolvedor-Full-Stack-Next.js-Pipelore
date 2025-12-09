"use server";
import { CreateRepairOrderInput, RepairOrder } from "@/types/orders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/orders/create";
import { updateOrder } from "@/lib/orders/update";
import { getOrderById } from "@/lib/orders/getById";
import { deleteOrder } from "@/lib/orders/delete";

export async function create(data: CreateRepairOrderInput) {
  await createOrder(data);
  revalidatePath("/");
  redirect("/");
}

export async function update(id: string, data: CreateRepairOrderInput) {
  await updateOrder(id, data);
  revalidatePath(`/orders/${id}/edit`);
  redirect(`/`);
}

export async function getById(id: string): Promise<RepairOrder | null> {
  return await getOrderById(id);
}

export async function remove(id: number): Promise<boolean> {
  const result = await deleteOrder(id);
  revalidatePath("/");
  return result;
}