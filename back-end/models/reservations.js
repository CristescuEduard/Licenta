module.exports = (sequelize, DataTypes) => {
    const Reservations = sequelize.define(
        "Reservations",
        {
            idReservation: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reservationStartTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            time: {
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Reservations;
};
