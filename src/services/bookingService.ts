import BookingRepository from '../database/repository/bookingRepository';
import { getAllDataFilters, paginate } from '../dto';
import { BookingInput, IUser } from '../interfaces';

class BookingService {
    repository: BookingRepository;

    constructor() {
        this.repository = new BookingRepository();
    }

    async GetBooking(filters: getAllDataFilters, user: IUser): Promise<paginate> {
        return this.repository.Booking(filters, user);
    }

    async CreateBooking(payload: BookingInput, user: IUser) {
        return this.repository.Create(payload, user);
    }

    async UpdateBooking(id: string, payload: BookingInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteBooking(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetBookingById(id: string) {
        return this.repository.FindById(id);
    }
}

export default BookingService;