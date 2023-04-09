import http from "../http-axios";

const create = (data) => {
  return http.post("/regions", data);
};

const update = (id, data) => {
  return http.put(`/regions/${id}`, data);
};

const getAll = () => {
  return http.get("/regions");
};

const getById = (id) => {
  return http.get(`/regions/${id}`);
};

const remove = (id) => {
  return http.delete(`/regions/${id}`);
};

const RegionService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default RegionService;