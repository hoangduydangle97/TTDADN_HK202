import express, { Request, Response } from 'express';
import { Device } from '../../models/Devices';
import { BadRequestError } from '../../utils/errors/bad-request-error';

const router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;
  const device = await Device.findOne({ _id });

  if (!device) throw new BadRequestError('Device is not existed');

  device.remove();

  return res.status(200).send(true);
});

export { router as deleteDeviceRouer };
