import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Device } from '../../models/Devices';
const router = express.Router();

router.post(
  '/create',
  [
    body('name').trim().notEmpty(),
    body('feed').trim().notEmpty(),
    body('type').trim().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, feed, type } = req.body;

    const device = Device.build({
      name,
      feed,
      type,
    });

    await device.save();

    return res.status(200).send(device.toJSON());
  }
);

export { router as createDeviceRouter };
