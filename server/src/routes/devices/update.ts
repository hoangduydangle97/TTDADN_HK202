import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Device } from '../../models/Devices';
import { mqttAutomation } from '../../mqtt-automation';
import { BadRequestError } from '../../utils/errors/bad-request-error';
const router = express.Router();

router.put(
  '/:id',
  [
    body('name').trim().notEmpty(),
    body('feed').trim().notEmpty(),
    body('type').trim().notEmpty(),
    body('room').trim().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, feed, type, room } = req.body;
    const _id = req.params.id;
    const device = await Device.findOneAndUpdate(
      { _id },
      { name, feed, type, room }
    );

    if (!device) throw new BadRequestError('Device is not existed');

    await mqttAutomation.updateListeners();

    return res.status(200).send(true);
  }
);

export { router as updateDeviceRouter };
