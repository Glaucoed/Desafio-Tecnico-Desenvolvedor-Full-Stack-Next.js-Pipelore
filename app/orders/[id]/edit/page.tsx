import { RepairOrderForm } from "@/componenets/RepairOrderForm";
import { getById } from "@/app/actions";

interface EditOrderPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function Edit({ params }: EditOrderPageProps) {
  const { id } = await params;
  const inicitialData = await getById(id);
  return (
    <div className="px-4 py-6 sm:px-0">
      <RepairOrderForm initialData={inicitialData} id={id} />
    </div>
  );
}
