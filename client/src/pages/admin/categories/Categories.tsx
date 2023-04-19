import { Suspense, useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import { Api } from "../../../api";

import Container from "../../../components/container/Container";
import Loader from "../../../components/loader/Loader";

import ItemsList from "./ItemsList";
import { CategoryItem } from "../../../types/types";

function AdminCategories() {
  const [loading, setLoading] = useState<boolean>(false);
  const [availableCat, setAvailableCat] = useState<CategoryItem[] | []>([]);
  const onDelete = async (id: number) => {
    if (window.confirm("Точно хочешь удалить?")) {
      await Api().category.delete(id);
      await fetchData();
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const categories = await Api().category.getAll();
      setAvailableCat(categories);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setAvailableCat]);
  return (
    <section>
      {loading && <Loader />}
      <Container>
        <Suspense fallback={<Loader />}>
          <Await resolve={availableCat}>
            <ItemsList avaialbleItems={availableCat} onDelete={onDelete} />
          </Await>
        </Suspense>
      </Container>
    </section>
  );
}
// async function getCategories() {
//   const categories = await Api().category.getAll();
//   return categories;
// }

// const adminCategoriesLoader = async () => {
//   return defer({
//     categories: await getCategories(),
//   });
// };

export { AdminCategories };
