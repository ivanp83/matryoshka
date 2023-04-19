import { Suspense, useRef, useState } from "react";
import {
  Await,
  defer,
  Navigate,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Api } from "../../../api";
import { useAppContext } from "../../../context/app.context";
import useCreateProduct from "../../../hooks/useCreateProduct";
import Container from "../../../components/container/Container";
import Loader from "../../../components/loader/Loader";
import "../Form.scss";
import UploadFile from "../shared/UploadFile";
import {
  ProductItemCreate,
  ResolvedCategoriesResponse,
} from "../../../types/types";

function CreateProduct() {
  const navigate = useNavigate();
  const { loading, setLoading } = useAppContext();
  const fileInput = useRef("Файл не выбран");
  const { categories } = useLoaderData() as ResolvedCategoriesResponse;
  if (!categories.length) {
    return <Navigate to="/admin/create-category" />;
  }

  const [data, setData] = useState<ProductItemCreate>({
    name: "",
    price: "",
    description: "",
    category: categories[0].id,
    image: null,
  });

  const { onClick, handleFileChange, handleChange } = useCreateProduct(
    setLoading,
    fileInput.current,
    data,
    setData
  );

  return (
    <section>
      {loading && <Loader />}
      <Container>
        <Suspense fallback={<Loader />}>
          <Await resolve={categories}>
            <form onSubmit={(e) => onClick(e).then((_) => navigate(-1))}>
              <h1>Cоздать товар</h1>
              <div>
                <label htmlFor="name">Название</label>
                <input type="text" name="name" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="price">Цена</label>
                <input type="number" name="price" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="description">Описание</label>
                <textarea rows={4} name="description" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="description">Категория</label>
                <select name="category" onChange={handleChange}>
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <UploadFile
                fileInput={fileInput.current}
                handler={handleFileChange}
              />

              <button type="submit" disabled={loading}>
                Ок
              </button>
            </form>
          </Await>
        </Suspense>
      </Container>
    </section>
  );
}
async function getCategories() {
  const data = await Api().category.getAll();

  return data;
}

const createProductLoader = async () => {
  return defer({
    categories: await getCategories(),
  });
};

export { CreateProduct, createProductLoader };
