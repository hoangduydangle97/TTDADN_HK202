import express, { Request, Response } from 'express';
import { Rule } from '../../models/Rules';
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  const rule = await Rule.findOne({ _id });

  return res.status(200).send(rule);
});

export { router as getOneRuleRouter };
