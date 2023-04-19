import { AxiosInstance } from "axios";
import { PageItem } from "../types/types";

export const PagetApi = (instance: AxiosInstance) => ({
  async getOne(name: string) {
    const { data } = await instance.get<PageItem>(`/page/${name}`);

    return data;
  },
});
