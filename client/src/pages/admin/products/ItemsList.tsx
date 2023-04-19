import { FC } from "react";
import AdminProduct from "./AdminProduct";
import "../shared/AdminItemsList.scss";
import { ProductItem } from "../../../types/types";
interface ItemsListProps {
  avaialbleItems: ProductItem[];
  onDelete: (id: number) => void;
}
const ItemsList: FC<ItemsListProps> = ({ avaialbleItems, onDelete }) => {
  return (
    <ul className="admin-list">
      {avaialbleItems?.map((product) => (
        <AdminProduct {...{ product, onDelete }} key={product.id} />
      ))}
    </ul>
  );
};
export default ItemsList;
