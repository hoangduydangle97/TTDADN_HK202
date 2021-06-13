import { Router } from 'express';
import { createRoomRouter } from './create';
import { deleteRoomRouer } from './delete';
import { getAllRoomsRouter } from './getAll';
import { getAllDevicesInRoomRouter } from './getAllDevices';
import { getOneRoomRouter } from './getOne';
import { updateRoomRouter } from './update';

const roomRouter = Router();

roomRouter.use(
  '/rooms',
  getAllRoomsRouter,
  getAllDevicesInRoomRouter,
  createRoomRouter,
  getOneRoomRouter,
  updateRoomRouter,
  deleteRoomRouer
);

export default roomRouter;
