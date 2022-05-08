import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../database/models/user';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
require('dotenv').config();

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            const user = await User.findOne({ where: { username: username }, });
            //@ts-ignore
            if (!user) {
                return done(null, false);
            } else {
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        }
    ));

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env['JWT_SECRET'] || 'secret',
            algorithms: ['HS256'],
        },
        async (jwtPayload, done) => {
            const user = await User.scope('withoutPassword').findOne({ where: { [Op.and]: [{ username: jwtPayload.user.username }]
            } });
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
    )
);


passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (req: Request, id: string, done: any) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;