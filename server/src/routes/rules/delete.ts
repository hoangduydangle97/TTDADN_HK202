import express, { Request, Response } from 'express';
import { Rule } from '../../models/Rules';
import { mqttAutomation } from '../../mqtt-automation';
import { BadRequestError } from '../../utils/errors/bad-request-error';

const router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;
  const rule = await Rule.findOne({ _id });

  if (!rule) throw new BadRequestError('Rule is not existed');

  rule.remove();

  await mqttAutomation.updateListeners();

  return res.status(200).send(true);
});

export { router as deleteRuleRouer };
