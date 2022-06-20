module.exports = (sequelize, DataTypes) => {
    const Layouts = sequelize.define(
        "Layouts",
        {
            idLayout: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            layoutName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Layouts;
};
