import "../shared/AdminItemsList.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CategoryItem } from "../../../types/types";

interface CategoryProps {
  category: CategoryItem;
  onDelete: (id: number) => void;
}

const AdminCategory: FC<CategoryProps> = ({ category, onDelete }) => {
  return (
    <li className="admin-item">
      <figure>
        <img
          srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${
            category.image
          }`}
          alt={category.name}
        />
        <figcaption className="admin-info">
          <h2>{category.name}</h2>

          <div className="btns">
            <Link to={`../admin/update-category/${category.id}`}>
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="btn-edit"
              >
                <path d="M21.707,4.475,19.525,2.293a1,1,0,0,0-1.414,0L9.384,11.021a.977.977,0,0,0-.241.39L8.052,14.684A1,1,0,0,0,9,16a.987.987,0,0,0,.316-.052l3.273-1.091a.977.977,0,0,0,.39-.241l8.728-8.727A1,1,0,0,0,21.707,4.475Zm-9.975,8.56-1.151.384.384-1.151,7.853-7.854.768.768ZM2,6A1,1,0,0,1,3,5h8a1,1,0,0,1,0,2H4V20H17V13a1,1,0,0,1,2,0v8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1Z" />
              </svg>
            </Link>
            <button
              className="btn-delete"
              onClick={() => onDelete(category.id)}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
              </svg>
            </button>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};
export default AdminCategory;
