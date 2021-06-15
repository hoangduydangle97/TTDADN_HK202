import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Rule } from '../../models/Rules';
const router = express.Router();

router.post(
  '/create',
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

    const rule = Rule.build({
      name,
      conditionDevice,
      conditionOperator,
      conditionValue,
      targetDevice,
      targetValue,
    });

    await rule.save();

    return res.status(200).send(rule.toJSON());
  }
);

export { router as createRuleRouter };
