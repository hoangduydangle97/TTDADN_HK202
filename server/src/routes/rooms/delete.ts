import express, { Request, Response } from 'express';
import { Room } from '../../models/Room';
import { BadRequestError } from '../../utils/errors/bad-request-error';

const router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;
  const room = await Room.findOne({ _id });

  if (!room) throw new BadRequestError('Room is not existed');

  room.remove();

  return res.status(200).send(true);
});

export { router as deleteRoomRouer };
