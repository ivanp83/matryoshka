import { ChangeEvent, FormEvent, Suspense, useRef, useState } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { Api } from "../../../api";

import Container from "../../../components/container/Container";
import Loader from "../../../components/loader/Loader";
import UploadFile from "../shared/UploadFile";
import { ResolvedCategoryResponse } from "../../../types/types";

const UpdateCategory = () => {
  const fileInput = useRef("Файл не выбран");
  const [loading, setLoading] = useState<boolean>(false);
  const { category } = useLoaderData() as ResolvedCategoryResponse;
  const [base64Data, setBase64Data] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    id: category.id,
    name: category.name,
    description: category.description,
  });

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const reader: FileReader = new FileReader();
    fileInput.current = `Выбран ${files?.length} файл`;
    reader.onloadend = function () {
      setBase64Data(reader.result as string);
    };
    reader.onerror = function () {
      setError("Файл не читается!");
    };
    reader.readAsDataURL(files?.[0] as File);
  };
  const handleChange = (event: ChangeEvent<any>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const onClick = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Api().category.update({
        id: data.id,
        name: data.name,
        description: data.description,
        base64Data,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {loading && <Loader />}
      <Container>
        <Suspense fallback={<Loader />}>
          <Await resolve={category}>
            <form onSubmit={onClick}>
              <h1>Редактировать категорию</h1>
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
                <label htmlFor="description">Описание</label>
                <textarea
                  rows={4}
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                />
              </div>
              <UploadFile
                image={category.image}
                name={category.name}
                fileInput={fileInput.current}
                handler={handleFileChange}
              />

              <button type="submit">Ок</button>
            </form>
          </Await>
        </Suspense>
      </Container>
    </section>
  );
};

async function getCategory(id: number) {
  const data = await Api().category.getOne(id);

  return data[0];
}

const updateCategoryLoader = async ({ params }: any) => {
  return defer({
    category: await getCategory(params.id),
  });
};

export { UpdateCategory, updateCategoryLoader };
