import  { Request, Response, NextFunction} from 'express';
import passport from 'passport';

export const auth = passport.authenticate('jwt', { session: false });

export const isVendor = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this resource'
    });
    const user = req.user;
    //@ts-ignore
    if (user.role === 'Vendor') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'You are not an Vendor'
        });
    }
};

export const userId = async (req: Request) => {
    const user = req.user;
    // @ts-ignore
    return user?.id!;
};