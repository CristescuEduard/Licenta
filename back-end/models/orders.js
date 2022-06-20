module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define(
        "Orders",
        {
            idOrder: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            totalSum: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isFinished: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isPending: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            cookingTime: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Orders;
};
