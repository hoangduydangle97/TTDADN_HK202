import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Room } from '../../models/Room';
const router = express.Router();

router.post(
  '/create',
  [body('name').trim().notEmpty(), body('icon').trim()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, icon } = req.body;

    const room = Room.build({
      name,
      icon,
    });

    await room.save();

    return res.status(200).send(room.toJSON());
  }
);

export { router as createRoomRouter };
