'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db';
import { v4 as uuid } from 'uuid';
import { IBooking, BookingInput } from '../../interfaces';
import User from './user';
import Event from './event';

class Booking
  extends Model<IBooking, BookingInput>
  implements IBooking {
  declare id: string;
  public eventId!: string;
  public proposedDate!: Date[];
  public location!: {
    postalCode: number;
    address: string;
  };
  public status!: string;
  public remark: string | undefined;
  public confirmDate: Date | undefined;
  public hrId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    eventId: {
      type: DataTypes.UUID,
      references: {
        model: 'Events', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    proposedDate: {
      type: DataTypes.ARRAY(DataTypes.DATE),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Proposed date is required'
        }
      }
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Location is required'
        }
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Approved', 'Rejected'],
      defaultValue: 'Pending',
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hrId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);


Booking.beforeCreate((type) => {
  type.id = uuid();
});

Booking.belongsTo(User, {
  foreignKey: 'hrId',
  as: 'hr',
});

Booking.belongsTo(Event, {
  foreignKey: 'eventId',
  as: 'event',
});

Booking.addScope('hr', {
  include: [
    {
      model: User,
      as: 'hr',
      attributes: ['id', 'name']
    }
  ],
});

Booking.addScope('event', {
  include: [
    {
      model: Event,
      as: 'event',
      attributes: ['id', 'eventName'],
      include: [
        {
          model: User,
          as: 'vendor',
          attributes: ['id', 'name']
        }
      ]
    }
  ],
});

export default Booking;