import api from "..";

const GetUserByToken = async ({ token }: any) => {
  const data = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export default GetUserByToken;
