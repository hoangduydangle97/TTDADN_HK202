import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/User';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { __JWT_KEY__ } from '../../utils/environments';

const router = express.Router();

router.post(
  '/signup',
  [
    body('fullName').trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({
      fullName,
      email,
      password,
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      __JWT_KEY__!
    );

    return res.status(201).send({ ...user.toJSON(), token: userJwt });
  }
);

export { router as signupRouter };
