import { useRef, Suspense, useState } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { Api } from "../../../api";
import { useAppContext } from "../../../context/app.context";
import Container from "../../../components/container/Container";
import Loader from "../../../components/loader/Loader";
import UploadFile from "../shared/UploadFile";
import useUpdateProduct from "../../../hooks/useUpdateProduct";
import {
  CategoryItem,
  ResolvedCategoriesResponse,
  ResolvedProductResponse,
} from "../../../types/types";
type Joined = ResolvedCategoriesResponse & ResolvedProductResponse;

const UpdateProduct = () => {
  const fileInput = useRef("Файл не выбран");
  const { categories, product } = useLoaderData() as Joined;
  const { loading, setLoading } = useAppContext();
  const currentCatеgory = categories.find(
    (cat) => cat.id == +product.category_id
  ) as CategoryItem;
  const [data, setData] = useState({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category_id: currentCatеgory.id,
  });
  const [base64Data, setBase64Data] = useState<string | ArrayBuffer | null>("");
  const navigate = useNavigate();
  const { onClick, handleFileChange, handleChange } = useUpdateProduct(
    setLoading,
    fileInput.current,
    {
      id: product.id,
      name: data.name,
      price: data.price,
      description: data.description,
      category_id: data.category_id,
      base64Data,
    },
    setData,
    setBase64Data
  );

  return (
    <section>
      {loading && <Loader />}
      <Container>
        <Suspense fallback={<Loader />}>
          <Await resolve={product}>
            <form onSubmit={(e) => onClick(e).then((_) => navigate(-1))}>
              <h1>Редактировать товар</h1>
              <div>
                <label htmlFor="name">Название</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
              <div>
                <label htmlFor="price">Цена</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                />
              </div>
              <div>
                <label htmlFor="description">Описание</label>
                <textarea
                  rows={4}
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                />
              </div>
              <div>
                <label htmlFor="description">Категория</label>
                <select
                  name="category"
                  onChange={handleChange}
                  defaultValue={currentCatеgory?.name}
                >
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <UploadFile
                image={product.small}
                name={product.name}
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
};
async function getProduct(id: number) {
  const data = await Api().product.getOne(id);
  return data;
}
async function getCategories() {
  const data = await Api().category.getAll();

  return data;
}

const updateProductLoader = async ({ params }: any) => {
  return defer({
    product: await getProduct(params.id),
    categories: await getCategories(),
  });
};

export { UpdateProduct, updateProductLoader };
