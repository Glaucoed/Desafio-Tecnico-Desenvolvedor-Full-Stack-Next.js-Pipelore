"use client";

import { RepairOrder } from "@/types/orders";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

export function RepairOrderList() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/repair-orders/late", { cache: "no-store" });
      return res.json();
    },
  });

  return (
    <div className=" p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full">
            <Loading />
          </div>
        ) : (
          orders &&
          orders.map((order: RepairOrder) => (
            <div
              key={order.id}
              className="bg-[#005C53] rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3
                  className="text-lg font-semibold text-white line-clamp-1"
                  title={order.title}
                >
                  {order.title}
                </h3>
                <div className="flex space-x-2"></div>
              </div>

              <p className="text-white mb-4 line-clamp-2 grow">
                {order.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Location:</span>
                  <span className="font-medium text-white">
                    {order.location}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Priority:</span>
                  <span className="text-white">{order.priority}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Status:</span>
                  <span className="text-white">
                    {order.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Due Date:</span>
                  <span className="text-white">
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
    </div>
  );
}
