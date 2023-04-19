import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function currencyFormat(num: number) {
  const value = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
  return value;
}
export const handleErrors = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    console.log(error);
    const err = error as AxiosError<{
      error: string;
      message: string | string[];
      statusCode: number;
    }>;
    if (Array.isArray(err.response?.data.message)) {
      toast.error(err.response?.data.message[0]);
    } else {
      toast.error(err.response?.data.message);
    }
  }
};
