import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Device } from '../../models/Devices';
const router = express.Router();

router.get('/:room_id/devices', async (req: Request, res: Response) => {
  const { room_id } = req.params;
  const rooms = await Device.find({ room: new Types.ObjectId(room_id) });

  return res.status(200).send(rooms);
});

export { router as getAllDevicesInRoomRouter };
