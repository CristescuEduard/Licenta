module.exports = (sequelize, DataTypes) => {
    const Tables = sequelize.define(
        "Tables",
        {
            idTable: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            isReserved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            tableX: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            tableY: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            tableName: {
                type: DataTypes.STRING,
            },
            orientation: {
                type: DataTypes.STRING,
            },
            tableSize: {
                type: DataTypes.INTEGER,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Tables;
};
