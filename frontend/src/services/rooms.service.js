import { axiosLocal } from 'api/local-api';

function getAll() {
  return axiosLocal.get(`/rooms/`);
}
function getAllDevicesInRoom(id) {
  return axiosLocal.get(`/rooms/${id}/devices/`);
}
function getOne(id) {
  return axiosLocal.get(`/rooms/${id}`);
}
function create(data) {
  return axiosLocal.post(`/rooms/create`, data);
}
function update(id, data) {
  return axiosLocal.put(`/rooms/${id}`, data);
}

function remove(id) {
  return axiosLocal.delete(`/rooms/${id}`);
}

export const RoomService = {
  getAll,
  getAllDevicesInRoom,
  getOne,
  create,
  update,
  remove,
};
