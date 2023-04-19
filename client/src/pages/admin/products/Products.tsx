import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router-dom";
import { Api } from "../../../api";
import Container from "../../../components/container/Container";
import Loader from "../../../components/loader/Loader";
import ItemsList from "./ItemsList";
import { ProductItem } from "../../../types/types";

function Products() {
  const [availableProducts, setAvailableProducts] = useState<
    ProductItem[] | []
  >([]);

  const fetchData = async () => {
    try {
      const products = await Api().product.getAll();
      setAvailableProducts(products);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onDelete = async (id: number) => {
    try {
      if (window.confirm("Точно хочешь удалить?")) {
        const res = await Api().product.delete(id);
        setAvailableProducts(res);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [setAvailableProducts]);

  return (
    <section>
      <Container>
        <Suspense fallback={<Loader />}>
          <Await resolve={availableProducts}>
            <ItemsList avaialbleItems={availableProducts} onDelete={onDelete} />
          </Await>
        </Suspense>
      </Container>
    </section>
  );
}

export { Products };
