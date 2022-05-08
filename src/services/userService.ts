import UserRepository from '../database/repository/userRepository';
import { getAllDataFilters, paginate } from '../dto';
import { UserInput } from '../interfaces';

class UserService {
    repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async GetUser(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.User(filters);
    }

    async CreateUser(payload: UserInput) {
        return this.repository.Create(payload);
    }

    async UpdateUser(id: string, payload: UserInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteUser(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetUserById(id: string) {
        return this.repository.FindById(id);
    }
}

export default UserService;