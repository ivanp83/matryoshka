import Gallery from "@/app/components/category/gallery";
import SubNav from "@/app/components/subNav";
import { ProductItem } from "@/types";

async function getData(id: number) {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/category-with-products/${id}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type Params = {
  params: { id: number };
};
export default async function Product({ params }: Params) {
  const data: Array<ProductItem> = await getData(params.id);

  return (
    <>
      <SubNav />
      <Gallery data={data} />
    </>
  );
}
