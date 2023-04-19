import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../api";
import Container from "../../../components/container/Container";
import Loader from "../../../components/loader/Loader";
import "../Form.scss";
import UploadFile from "../shared/UploadFile";
import { CategoryItem } from "../../../types/types";

export default function CreateCategory() {
  const fileInput = useRef("Файл не выбран");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Partial<CategoryItem>>({
    name: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const reader: FileReader = new FileReader();
    fileInput.current = `Выбран ${files?.length} файл`;
    reader.onloadend = function () {
      setData({ ...data, image: reader.result });
    };
    reader.onerror = function () {
      alert("Error file not reading");
    };
    reader.readAsDataURL(files?.[0] as File);
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const onClick = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Api().category.create(data);
      navigate(-1);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {loading && <Loader />}
      <Container>
        <form onSubmit={onClick}>
          <h1>Cоздать категорию</h1>
          <div>
            <label htmlFor="name">Название</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Описание</label>
            <textarea rows={4} name="description" onChange={handleChange} />
          </div>

          <UploadFile
            fileInput={fileInput.current}
            handler={handleFileChange}
          />
          <button type="submit">Ок</button>
        </form>
      </Container>
    </section>
  );
}
