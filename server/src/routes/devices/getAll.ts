import express, { Request, Response } from 'express';
import { Device } from '../../models/Devices';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const devices = await Device.find();

  return res.status(200).send(devices);
});

export { router as getAllDevicesRouter };
