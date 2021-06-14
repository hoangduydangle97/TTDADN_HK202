import express, { Request, Response } from 'express';
import { Room } from '../../models/Room';
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  const room = await Room.findOne({ _id });

  return res.status(200).send(room);
});

export { router as getOneRoomRouter };
