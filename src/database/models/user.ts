'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db';
import { v4 as uuid } from 'uuid';
import { IUser, UserInput } from '../../interfaces';
import bcrypt from 'bcrypt';

class User
  extends Model<IUser, UserInput>
  implements IUser {
  declare id: string;
  public username!: string;
  public password!: string;
  public name!: string;
  public role!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        }
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Vendor', 'HR'],
      defaultValue: 'HR',
    },
  },
  {
    timestamps: true,
    sequelize: db
  }
);

User.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

User.beforeCreate((type) => {
  type.id = uuid();
});

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  }
});


User.addScope('withoutPassword', {
  attributes: { exclude: ['password'] }
});


export default User;