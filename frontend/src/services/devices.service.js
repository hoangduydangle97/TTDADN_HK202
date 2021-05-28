import { axiosLocal } from 'api/local-api';

function getAll() {
  return axiosLocal.get(`/devices/`);
}
function getOne(id) {
  return axiosLocal.get(`/devices/${id}`);
}
function create(data) {
  return axiosLocal.post(`/devices/create`, data);
}
function update(id, data) {
  return axiosLocal.put(`/devices/${id}`, data);
}

function remove(id) {
  return axiosLocal.delete(`/devices/${id}`);
}

export const DeviceService = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
