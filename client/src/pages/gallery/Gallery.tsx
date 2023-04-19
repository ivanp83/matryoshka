import { FC, Suspense, useLayoutEffect } from "react";
import Card from "./Card";
import "./Gallery.scss";

import Container from "../../components/container/Container";
import {
  Await,
  Navigate,
  defer,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import { Api } from "../../api";
import Loader from "../../components/loader/Loader";
import { ResolvedProductsResponse } from "../../types/types";

const Gallery: FC = () => {
  const { products } = useLoaderData() as ResolvedProductsResponse;
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Suspense fallback={<Loader />}>
        <Await resolve={products}>
          <ul className="gallery">
            {products.map((product: any) => (
              <li key={product.id} className="item">
                <Card {...{ product }} />
              </li>
            ))}
          </ul>
        </Await>
      </Suspense>
    </Container>
  );
};
async function getProductsByCategory(id: number) {
  const data = await Api().category.getOneWithProducts(id);

  return data;
}

const galleryLoader = async ({ params }: any) => {
  return defer({
    products: await getProductsByCategory(params.id),
  });
};

export { Gallery, galleryLoader };
