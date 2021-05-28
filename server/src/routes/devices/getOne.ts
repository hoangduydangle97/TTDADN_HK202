import express, { Request, Response } from 'express';
import { Device } from '../../models/Devices';
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  const devices = await Device.findOne({ _id });

  return res.status(200).send(devices);
});

export { router as getOneDevicesRouter };
