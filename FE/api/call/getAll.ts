import api from "..";

const GetAll = async () => {
  const data = await api.get("/products");

  return data;
};

export default GetAll;
