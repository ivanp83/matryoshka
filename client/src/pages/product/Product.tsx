import { FC, Suspense, useLayoutEffect } from "react";
import "./Product.scss";
import Container from "../../components/container/Container";
import { defer, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Api } from "../../api";
import Loader from "../../components/loader/Loader";
import { useTelegram } from "../../hooks/useTelegram";
import { useAppContext } from "../../context/app.context";
import { currencyFormat } from "../../utils/helpers";
import { ProductItem, ResolvedProductResponse } from "../../types/types";

const Product: FC = () => {
  const { user } = useTelegram();
  const navigate = useNavigate();
  const { product } = useLoaderData() as ResolvedProductResponse;
  const { onUpdate } = useAppContext();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const addToCart = (product: ProductItem) => {
    onUpdate(user.id, product);
    navigate("/cart");
  };

  return (
    <section className={"product"}>
      <Container>
        <Suspense fallback={<Loader />}>
          <div className="btn-back">
            <Button actionType={"back"} onClick={() => navigate(-1)}>
              <svg
                viewBox="0 0 24 24"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12M4 12L10 6M4 12L10 18"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          <figure>
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${
                  product.small
                }`}
              />
              <source
                media="(min-width: 601px)"
                srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${
                  product.big
                }`}
              />
              <img
                srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${
                  product.big
                }`}
                alt={product.name}
              />
            </picture>

            <figcaption>
              <h2>{product.name}</h2>
              <span className="price">
                {currencyFormat(product.price as number)}
              </span>
              <span className="description">{product.description}</span>
            </figcaption>
            <div className="btn-add-to-cart">
              <Button
                title={"Добавить в корзину"}
                actionType={"shop"}
                onClick={() => addToCart(product)}
              />
            </div>
          </figure>
        </Suspense>
      </Container>
    </section>
  );
};

const getProduct = async (id: number) => {
  const data = await Api().product.getOne(id);

  return data;
};

const productLoader = async ({ params }: any) => {
  const id = params.id;
  return defer({
    product: await getProduct(id),
  });
};

export { Product, productLoader };
