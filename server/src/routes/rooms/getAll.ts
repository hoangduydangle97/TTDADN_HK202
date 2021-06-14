import express, { Request, Response } from 'express';
import { Room } from '../../models/Room';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const rooms = await Room.find();

  return res.status(200).send(rooms);
});

export { router as getAllRoomsRouter };
