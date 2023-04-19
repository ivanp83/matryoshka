import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { Api } from "../api";
import { ProductItemCreate } from "../types/types";

const useCreateProduct = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  fileInput: string,
  data: ProductItemCreate,
  setData: Dispatch<SetStateAction<ProductItemCreate>>
) => ({
  onClick: async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        !data.category ||
        !data.description ||
        !data.name ||
        !data.price ||
        !data.image
      ) {
        alert("Все поля должны быть заполнены!");
        return;
      }
      await Api().product.create(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  },
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const reader: FileReader = new FileReader();
    fileInput = `Выбран ${files?.length} файл`;
    reader.onloadend = function () {
      setData({ ...data, image: reader.result });
    };

    reader.onerror = function () {
      alert("Файл не читается!");
    };
    reader.readAsDataURL(files?.[0] as File);
  },
  handleChange: (event: ChangeEvent<any>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  },
});

export default useCreateProduct;
