import express, { Request, Response } from 'express';
import { CollectionName } from '../../models/CollectionName';
import { Device } from '../../models/Devices';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const devices = await Device.find({}).populate('room');

  return res.status(200).send(devices);
});

export { router as getAllDevicesRouter };
