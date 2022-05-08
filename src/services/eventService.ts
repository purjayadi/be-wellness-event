import EventRepository from '../database/repository/eventRepository';
import { getAllDataFilters, paginate } from '../dto';
import { EventInput, IUser } from '../interfaces';

class EventService {
    repository: EventRepository;

    constructor() {
        this.repository = new EventRepository();
    }

    async GetEvent(filters: getAllDataFilters, user: IUser): Promise<paginate> {
        return this.repository.Event(filters, user);
    }

    async CreateEvent(payload: EventInput, user: IUser) {
        return this.repository.Create(payload, user);
    }

    async UpdateEvent(id: string, payload: EventInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteEvent(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetEventById(id: string) {
        return this.repository.FindById(id);
    }
}

export default EventService;