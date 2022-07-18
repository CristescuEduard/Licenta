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
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Reservations;
};
