import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Rule } from '../../models/Rules';
import { mqttAutomation } from '../../mqtt-automation';
import { BadRequestError } from '../../utils/errors/bad-request-error';
const router = express.Router();

router.put(
  '/:id',
  [
    body('name').trim().notEmpty(),
    body('conditionDevice').trim(),
    body('conditionOperator').trim(),
    body('conditionValue').trim(),
    body('targetDevice').trim(),
    body('targetValue').trim(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      conditionDevice,
      conditionOperator,
      conditionValue,
      targetDevice,
      targetValue,
    } = req.body;
    const _id = req.params.id;

    const rule = await Rule.findOneAndUpdate(
      { _id },
      {
        name,
        conditionDevice,
        conditionOperator,
        conditionValue,
        targetDevice,
        targetValue,
      }
    );

    if (!rule) throw new BadRequestError('Rule is not existed');

    await mqttAutomation.updateListeners();

    return res.status(200).send(true);
  }
);

export { router as updateRuleRouter };
