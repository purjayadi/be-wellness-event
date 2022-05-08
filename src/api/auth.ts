import { IUser } from '../interfaces';
import { NextFunction, Request, Response } from 'express';
import passport from '../middleware/passportMiddleware';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/passport';
import Logger from '../utils/logger';

const Auth = (app: any) => {
    app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', { session: false }, (_err, user: IUser) => {
            Logger.debug(user);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }
            req.logIn(user, (err) => {
                if (err) throw err;
                const accessToken = jwt.sign({ user }, JWT_SECRET || 'secret', { expiresIn: '1d' });
                return res.status(200).json({
                    success: true,
                    message: 'Login successfully',
                    accessToken: accessToken
                });
            });
        })(req, res, next);
    });
};

export default Auth;