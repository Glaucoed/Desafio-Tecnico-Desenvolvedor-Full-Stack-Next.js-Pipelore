import { RepairOrderList } from "@/componenets/RepairOrderList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-end py-3 px-4">
        <Link
          href="/orders/new"
          className="flex items-center px-4 py-2 bg-[#005C53] text-white rounded-md hover:bg-[#004B44] transition-colors w-36 justify-center"
        >
          New Order
        </Link>
      </div>
      <RepairOrderList />
    </div>
  );
}
