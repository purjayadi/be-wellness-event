import Event from '../models/event';
import { getAllDataFilters, paginate } from '../../dto';
import { EventInput, EventOutput, IUser } from '../../interfaces';

class EventRepository {
    // @ts-ignore
    async Event(filters?: getAllDataFilters, user: IUser
    ): Promise<paginate> {
        const limit = filters?.limit ? +filters?.limit : 10;
        const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
        const allEvent = Event.scope('vendor').findAndCountAll({
            attributes: {exclude: ['vendorId']},
            ...filters?.page && { offset: offset },
            ...filters?.limit && { limit: limit },
            ...user?.role === 'Vendor' && { where: { vendorId: user.id } },
            order: [
                ['createdAt', 'ASC'],
            ],
            raw: true
        });
        return allEvent;
    }

    async Create(payload: EventInput, user: IUser): Promise<EventOutput> {
        const exist = await Event.findOne({
            where: {
                eventName: payload.eventName
            }
        });
        if (exist) {
            throw new Error('Event already exists');
        }
        const data = {
            ...payload,
            vendorId: user.id 
        };
        const event = await Event.create(data);
        return event;
    }

    async UpdateById(id: string, payload: Partial<EventInput>): Promise<EventOutput> {
        const event = await Event.findByPk(id);
        if (!event) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedEvent = await (event as Event).update(payload);
        return updatedEvent;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteEvent = await Event.destroy({
            where: { id }
        });
        return !!deleteEvent;
    }

    async FindById(id: string): Promise<EventOutput> {
        const event = await Event.scope('vendor').findByPk(id);
        if (!event) {
            // @todo throw custom error
            throw new Error('not found');
        }
        return event;
    }
}

export default EventRepository;