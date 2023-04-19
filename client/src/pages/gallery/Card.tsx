import { FC } from "react";
import { Link } from "react-router-dom";

import "./Gallery.scss";
import { ProductItem } from "../../types/types";
import { currencyFormat } from "../../utils/helpers";
interface CardProps {
  product: ProductItem;
}
const Card: FC<CardProps> = ({ product }) => {
  const { name, big, small, price, id } = product;

  return (
    <figure className={"card"}>
      <picture>
        <Link to={`../product/${id}`}>
          <source
            media="(max-width: 799px)"
            srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${small}`}
          />
          <source
            media="(min-width: 800px)"
            srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${big}`}
          />
          <img
            srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${big}`}
            alt={name}
          />
        </Link>
      </picture>
      <figcaption>
        <h2>{name}</h2>
        <span>{currencyFormat(price)}</span>
      </figcaption>
    </figure>
  );
};
export default Card;
