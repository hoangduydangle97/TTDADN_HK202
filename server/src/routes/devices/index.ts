import { Router } from 'express';
import { createDeviceRouter } from './create';
import { deleteDeviceRouer } from './delete';
import { getAllDevicesRouter } from './getAll';
import { getOneDevicesRouter } from './getOne';
import { updateDeviceRouter } from './update';

const deviceRouter = Router();

deviceRouter.use(
  '/devices',
  getAllDevicesRouter,
  createDeviceRouter,
  getOneDevicesRouter,
  updateDeviceRouter,
  deleteDeviceRouer
);

export default deviceRouter;
