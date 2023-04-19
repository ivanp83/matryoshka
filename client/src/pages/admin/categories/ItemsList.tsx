import { FC } from "react";
import AdminCategory from "./AdminCategory";
import "../shared/AdminItemsList.scss";
import { CategoryItem } from "../../../types/types";
interface ItemsListProps {
  avaialbleItems: CategoryItem[];
  onDelete: (id: number) => void;
}
const ItemsList: FC<ItemsListProps> = ({ avaialbleItems, onDelete }) => {
  return (
    <ul className="admin-list">
      {avaialbleItems?.map((category) => (
        <AdminCategory {...{ category, onDelete }} key={category.id} />
      ))}
    </ul>
  );
};
export default ItemsList;
