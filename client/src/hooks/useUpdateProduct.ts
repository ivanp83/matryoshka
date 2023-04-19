import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
} from "react";
import { Api } from "../api";
import { UpdateProductItem } from "../types/types";

const useUpdateProduct = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  fileInput: string,
  data: UpdateProductItem,
  setData: Dispatch<SetStateAction<UpdateProductItem>>,
  setBase64Data: Dispatch<SetStateAction<string | ArrayBuffer | null>>
) => ({
  onClick: async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!data.category_id || !data.description || !data.name || !data.price) {
        alert("Все поля должны быть заполнены!");
        return;
      }
      await Api().product.update(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  },
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    fileInput = `Выбран ${files?.length} файл`;
    const reader: FileReader = new FileReader();
    reader.onloadend = function () {
      setBase64Data(reader.result as string);
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

export default useUpdateProduct;
