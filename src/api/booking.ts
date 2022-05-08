import { IUser } from './../interfaces';
import { Request, Response } from 'express';
import { IBooking } from '../interfaces';
import { BookingService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { auth, isVendor } from '../utils/auth';

const Booking = (app: any) => {
    const service = new BookingService();
    app.get('/booking', auth, async (req: Request, res: Response) => {
        const filters: getAllDataFilters = req.query;
        // @ts-ignore
        const user: IUser = req.user;
        try {
            const data = await service.GetBooking(filters, user);
            const results = paginate(data, filters?.page, filters?.limit);
            return res.status(200).send({
                success: true,
                data: results
            });
        } catch (err: any) {
            return res.status(500).send({
                success: false,
                message: err.message
            });
        }
    });

    app.post('/booking', auth, async (req: Request, res: Response) => {
        const payload: IBooking = req.body;
        // @ts-ignore
        const user: IUser = req.user;
        try {
            const data = await service.CreateBooking(payload, user);
            return res.status(200).send({
                success: true,
                data: data
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });

    app.patch('/booking/:id', auth, isVendor, async (req: Request, res: Response) => {
        const Booking: IBooking = req.body;
        try {
            await service.UpdateBooking(req.params.id, Booking);
            return res.status(200).send({
                success: true,
                message: 'Confirm Booking successfully'
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });

    app.delete('/booking/:id', auth, async (req: Request, res: Response) => {
        try {
            await service.DeleteBooking(req.params.id);
            return res.status(201).send({
                success: true,
                message: 'Delete Booking successfully'
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });

    app.get('/booking/:id', auth, async (req: Request, res: Response) => {
        try {
            const data = await service.GetBookingById(req.params.id);
            return res.status(200).send({
                success: true,
                data: data
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });
};

export default Booking;