import { axiosCID } from "@/config/axios.config";
import ICid from "@/types/ICid";

const fetchCids = async (
  page: number = 1,
  pageSize: number = 500
): Promise<ICid[]> => {
  try {
    const response = await axiosCID.get(`/cid`, {
      params: {
        page,
        page_size: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar CIDS", error);
    throw new Error("Falha ao pegar CIDS");
  }
};

const fetchCIDByCode = async (code: string): Promise<ICid[]> => {
  try {
    const response = await axiosCID.get(`/cid/${code}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar CID", error);
    throw new Error("Falha ao pegar CID");
  }
};

const fetchCIDByName = async (name: string): Promise<ICid[]> => {
  try {
    const response = await axiosCID.get(`/cid/search/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar CID", error);
    throw new Error("Falha ao pegar CID");
  }
};

export { fetchCids, fetchCIDByCode, fetchCIDByName };
