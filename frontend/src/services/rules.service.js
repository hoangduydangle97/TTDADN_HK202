import { axiosLocal } from 'api/local-api';

function getAll() {
  return axiosLocal.get(`/rules/`);
}
function getOne(id) {
  return axiosLocal.get(`/rules/${id}`);
}
function create(data) {
  return axiosLocal.post(`/rules/create`, data);
}
function update(id, data) {
  return axiosLocal.put(`/rules/${id}`, data);
}

function remove(id) {
  return axiosLocal.delete(`/rules/${id}`);
}

export const RuleService = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
