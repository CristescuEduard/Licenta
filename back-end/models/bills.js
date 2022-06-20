module.exports = (sequelize, DataTypes) => {
    const Bills = sequelize.define(
        "Bills",
        {
            productQuantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Bills;
};
