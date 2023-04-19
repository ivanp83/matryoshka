import { Category } from "@/types";
import Index from "./components/home";
import { Envs } from "@/utils/config";
async function getData() {
  const res = await fetch(`${Envs.BACKEND_BASE_URL}/categories`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data: Array<Category> = await getData();

  return <Index data={data} />;
}
