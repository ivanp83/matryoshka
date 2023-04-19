"use client";
import React from "react";
import Button from "../buttons/button";
import { useAppContext } from "@/app/context/app.context";
import { ProductItem } from "@/types";

type Props = {
  data: ProductItem;
};

export default function Btns({ data }: Props) {
  const { onIncrement, onDecrement } = useAppContext();

  const handleIncrement = (product: ProductItem) => {
    onIncrement(product);
  };
  const handleDecrement = (product: ProductItem) => {
    onDecrement(product);
  };
  return (
    <div className="btns">
      <style jsx>{`
        .btns {
          display: grid;
          grid-auto-flow: row;
          grid-gap: 10px;
        }
      `}</style>
      <Button
        actionType="add"
        title="+"
        onClick={() => handleIncrement(data)}
      />
      <Button
        actionType="remove"
        title="-"
        onClick={() => handleDecrement(data)}
      />
    </div>
  );
}
