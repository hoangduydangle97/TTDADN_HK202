import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Room } from '../../models/Room';
import { BadRequestError } from '../../utils/errors/bad-request-error';
const router = express.Router();

router.put(
  '/:id',
  [body('name').trim().notEmpty(), body('icon').trim().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, icon } = req.body;
    const _id = req.params.id;
    const room = await Room.findOneAndUpdate({ _id }, { name, icon });

    if (!room) throw new BadRequestError('Room is not existed');

    return res.status(200).send(true);
  }
);

export { router as updateRoomRouter };
