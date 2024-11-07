import axios, { AxiosResponse } from "axios";
import useFirebase from "./useFirebase";

const useAPI = () => {
  const { url, getValue } = useFirebase();

  const get_endpoint = async (end_point: string) => {
    if (url) return url + end_point;

    const new_url = await getValue();
    return new_url + end_point;
  };

  const validate = (status: number) => {
    // TODO: Change to 500 in production
    return status < 600;
  };

  const result = async (response: AxiosResponse<any, any>) => {
    // console.log("🚀 ~ result ~ response:", response);
    // console.log("🚀 ~ result ~ response.status:", response.status);
    // console.log("🚀 ~ result ~ response.data:", response.data);

    if (response.status >= 300) return false;

    return response.data;
  };

  const get = async (end_point: string, token?: string) => {
    const response = await axios.get(await get_endpoint(end_point), {
      headers: {
        Authorization: "Bearer " + token,
      },
      validateStatus: validate,
    });

    return result(response);
  };

  const post = async (end_point: string, body: string, token?: string) => {
    const response = await axios.post(await get_endpoint(end_point), body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      validateStatus: validate,
    });

    return result(response);
  };

  const put = async (end_point: string, body: string, token?: string) => {
    const response = await axios.put(await get_endpoint(end_point), body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      validateStatus: validate,
    });

    return result(response);
  };

  const del = async (end_point: string, token?: string) => {
    const response = await axios.delete(await get_endpoint(end_point), {
      headers: {
        Authorization: "Bearer " + token,
      },
      validateStatus: validate,
    });

    return result(response);
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default useAPI;
