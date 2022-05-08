'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db';
import { v4 as uuid } from 'uuid';
import { IEvent, EventInput } from '../../interfaces';
import User from './user';

class Event
  extends Model<IEvent, EventInput>
  implements IEvent {
  declare id: string;
  public eventName!: string;
  public vendorId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Event name is required'
        }
      }
    },
    vendorId: {
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


Event.beforeCreate((type) => {
  type.id = uuid();
});

Event.belongsTo(User, {
  foreignKey: 'vendorId',
  as: 'vendor'
});

Event.addScope('vendor', {
  include: [
    {
      model: User,
      as: 'vendor',
      attributes: ['id', 'name']
    }
  ],
});

export default Event;