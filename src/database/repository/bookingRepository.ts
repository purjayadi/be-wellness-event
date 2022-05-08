import Logger from '../../utils/logger';
import { Op } from 'sequelize';
import Booking from '../models/booking';
import { getAllDataFilters, paginate } from '../../dto';
import { BookingInput, BookingOutput, IUser } from '../../interfaces';

class BookingRepository {
    // @ts-ignore
    async Booking(filters?: getAllDataFilters, user: IUser
    ): Promise<paginate> {
        const limit = filters?.limit ? +filters?.limit : 10;
        const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
        const allBooking = Booking.scope(['hr','event']).findAndCountAll({
            ...filters?.page && { offset: offset },
            ...filters?.limit && { limit: limit },
            where: {
                [Op.or]: [{ hrId: user.id }, { '$event.vendorId$': user.id }]
            },
            order: [
                ['createdAt', 'ASC'],
            ],
        });
        return allBooking;
    }

    async Create(payload: BookingInput, user: IUser): Promise<BookingOutput> {
        const data = {
            ...payload,
            hrId: user.id,
        };
        Logger.debug(data);
        const booking = await Booking.create(data);
        return booking;
    }

    async UpdateById(id: string, payload: Partial<BookingInput>): Promise<BookingOutput> {
        const booking = await Booking.findByPk(id);
        if (!Booking) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const data = {
            remark: payload.remark,
            confirmDate: payload.confirmDate,
            status: payload.status,
        };
        Logger.debug(data);
        // @ts-ignore
        const updatedBooking = await (booking as Booking).update(data);
        return updatedBooking;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteBooking = await Booking.destroy({
            where: { id }
        });
        return !!deleteBooking;
    }

    async FindById(id: string): Promise<BookingOutput> {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            // throw custom error
            throw new Error('not found');
        }
        return booking;
    }

}

export default BookingRepository;