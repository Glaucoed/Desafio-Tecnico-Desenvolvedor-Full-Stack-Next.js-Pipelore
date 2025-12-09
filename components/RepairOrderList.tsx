"use client";

import { RepairOrder, Status } from "@/types/orders";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Link from "next/link";
import { TbHomeEdit, TbTrashXFilled } from "react-icons/tb";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { remove } from "@/app/actions";
import { useQueryClient } from "@tanstack/react-query";
import { TbFilter } from "react-icons/tb";

export function RepairOrderList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<null | number>(null);
  const [filterStatus, setFilterStatus] = useState<Status | "ALL">("ALL");
  const queryClient = useQueryClient();

  function handleModal() {
    setModalOpen(!modalOpen);
  }

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/repair-orders", { cache: "no-store" });
      return res.json();
    },
  });

  const filteredOrders =
    filterStatus === "ALL"
      ? orders
      : orders.filter((order: RepairOrder) => order.status === filterStatus);

  async function handleDeleteOrder(id: number) {
    const isRemoved = await remove(id);
    if (isRemoved) {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      handleModal();
    }
  }

  return (
    <div className=" p-6">
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-shadow mb-4">
        <TbFilter size={20} className="text-gray-500" />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Status | "ALL")}
          className=" w-full bg-transparent  text-gray-700 font-medium  focus:outline-none  focus:ring-2 focus:ring-blue-500 rounded-lg border border-gray-300  px-3 py-2 transition-all hover:border-gray-400 cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full">
            <Loading />
          </div>
        ) : (
          orders &&
          filteredOrders.map((order: RepairOrder) => (
            <div
              key={order.id}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3
                  className="text-lg font-semibold text-gray-900 group-hover:text-[#005C53] transition-colors line-clamp-1"
                  title={order.title}
                >
                  {order.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/orders/${order.id}/edit`}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <TbHomeEdit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => {
                      setUserToDelete(Number(order.id));
                      handleModal();
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <TbTrashXFilled className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-5 line-clamp-3 grow">
                {order.description}
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Location:</span>
                  <span className="font-semibold text-gray-900">
                    {order.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Priority:</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {order.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      order.status === "OPEN"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Due Date:</span>
                  <span className="font-semibold text-gray-900">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(order.dueDate))}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        {(orders && orders.length === 0) ||
          (isError && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg">
              No orders found.
            </div>
          ))}
      </div>
      <ConfirmModal
        open={modalOpen}
        onClose={handleModal}
        onConfirm={() => userToDelete && handleDeleteOrder(userToDelete)}
        text="Tem certeza que deseja deletar este pedido?"
      />
    </div>
  );
}
