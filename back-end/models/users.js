module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
            idUser: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Users;
};
