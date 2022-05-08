import { Optional } from 'sequelize/types';

export interface IUser{
    id: string;
    username: string;
    password: string;
    name: string;
    role: string;
}

export interface UserInput extends Optional<IUser, 'id'> {}
export interface UserOutput extends Required<IUser> {}

export interface IEvent{
    id: string;
    eventName: string;
    vendorId?: string;
}

export interface EventInput extends Optional<IEvent, 'id'> {}
export interface EventOutput extends Required<IEvent> {}

export interface IBooking{
    id: string;
    eventId: string;
    proposedDate: Date[];
    location: {
        postalCode: number;
        address: string;
    };
    status: string | undefined;
    hrId: string;
    confirmDate: Date | undefined;
    remark: string | undefined;
}

export interface BookingInput extends Optional<IBooking, 'id'> {}
export interface BookingOutput extends Required<IBooking> {}