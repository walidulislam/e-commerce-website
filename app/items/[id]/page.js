import { items } from "@/data/items";
import ClientItemDetails from "./ClientItemDetails";

export function generateStaticParams() {
  return items.map((item) => ({
    id: item.id,
  }));
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  return <ClientItemDetails id={id} />;
}
