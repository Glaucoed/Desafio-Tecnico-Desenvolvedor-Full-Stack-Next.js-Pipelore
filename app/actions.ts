"use server";
import { CreateRepairOrderInput } from "@/types/orders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/orders/create";

export async function create(data: CreateRepairOrderInput) {
  await createOrder(data);
  revalidatePath("/");
  redirect("/");
}
