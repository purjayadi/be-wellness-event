'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      eventId: {
        type: Sequelize.UUID,
        references: {
          model: 'Events', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      proposedDate: {
        type: Sequelize.ARRAY(Sequelize.DATEONLY),
        allowNull: false
      },
      location: {
        type: Sequelize.JSON,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Pending','Approved','Rejected'],
        defaultValue: 'Pending'
      },
      hrId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      remark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      confirmDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Bookings');
  }
};