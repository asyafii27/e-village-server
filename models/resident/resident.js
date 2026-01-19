'use strict'

module.exports = (sequelize, DataTypes) => {
	const Resident = sequelize.define(
		'Resident',
		{
			full_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nik: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			gender: {
				type: DataTypes.STRING(1),
				allowNull: false,
			},
			religion: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			place_of_birth: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			date_of_birth: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			rt: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			rw: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			village: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'Sugihan',
			},
			marital_status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			formal_foto: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: 'residents',
			underscored: true,
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	)

	return Resident
}

