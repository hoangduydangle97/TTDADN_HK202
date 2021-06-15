import { Router } from 'express';
import { createRuleRouter } from './create';
import { deleteRuleRouer } from './delete';
import { getAllRulesRouter } from './getAll';
import { getOneRuleRouter } from './getOne';
import { updateRuleRouter } from './update';

const ruleRouter = Router();

ruleRouter.use(
  '/rules',
  getAllRulesRouter,
  createRuleRouter,
  getOneRuleRouter,
  updateRuleRouter,
  deleteRuleRouer
);

export default ruleRouter;
