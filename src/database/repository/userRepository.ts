import User from '../models/user';
import { getAllDataFilters, paginate } from '../../dto';
import { UserInput, UserOutput } from '../../interfaces';

class UserRepository {
    async User(filters?: getAllDataFilters
    ): Promise<paginate> {
        const limit = filters?.limit ? +filters?.limit : 10;
        const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
        const allUser = User.scope('withoutPassword').findAndCountAll({
            ...filters?.page && { offset: offset },
            ...filters?.limit && { limit: limit },
            order: [
                ['createdAt', 'ASC'],
            ],
        });
        return allUser;
    }

    async Create(payload: UserInput): Promise<UserOutput> {
        const exist = await User.findOne({
            where: {
                username: payload.username
            }
        });
        if (exist) {
            throw new Error('User already exists');
        }
        const user = await User.create(payload);
        return user;
    }

    async UpdateById(id: string, payload: Partial<UserInput>): Promise<UserOutput> {
        const user = await User.findByPk(id);
        if (!user) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedUser = await (user as User).update(payload);
        return updatedUser;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteUser = await User.destroy({
            where: { id }
        });
        return !!deleteUser;
    }

    async FindById(id: string): Promise<UserOutput> {
        const user = await User.findByPk(id);
        if (!user) {
            // @todo throw custom error
            throw new Error('not found');
        }
        return user;
    }
}

export default UserRepository;