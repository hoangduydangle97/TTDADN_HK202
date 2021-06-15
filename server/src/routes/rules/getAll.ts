import express, { Request, Response } from 'express';
import { Rule } from '../../models/Rules';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const rules = await Rule.find()
    .populate('conditionDevice')
    .populate('targetDevice');

  return res.status(200).send(rules);
});

export { router as getAllRulesRouter };
