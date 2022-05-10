import { IUser } from './../interfaces';
import { Request, Response } from 'express';
import { IEvent } from '../interfaces';
import { EventService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isVendor, auth } from '../utils/auth';

const Event = (app: any) => {
    const service = new EventService();
    app.get('/event', auth, async (req: Request, res: Response) => {
        const filters: getAllDataFilters = req.query;
        // @ts-ignore
        const user: IUser = req.user;
        try {
            const data = await service.GetEvent(filters, user);
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

    app.post('/event', auth, isVendor, async (req: Request, res: Response) => {
        const payload: IEvent = req.body;
        // @ts-ignore
        const user: IUser = req.user;
        try {
            const data = await service.CreateEvent(payload, user);
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

    app.patch('/event/:id', auth, isVendor, async (req: Request, res: Response) => {
        const Event: IEvent = req.body;
        try {
            await service.UpdateEvent(req.params.id, Event);
            return res.status(200).send({
                success: true,
                message: 'Update Event successfully'
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });

    app.delete('/event/:id', auth, isVendor, async (req: Request, res: Response) => {
        try {
            await service.DeleteEvent(req.params.id);
            return res.status(201).send({
                success: true,
                message: 'Delete Event successfully'
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });

    app.get('/event/:id', auth, async (req: Request, res: Response) => {
        try {
            const data = await service.GetEventById(req.params.id);
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

export default Event;