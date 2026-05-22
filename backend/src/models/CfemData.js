module.exports = (sequelize, DataTypes) => {
  const CfemData = sequelize.define('CfemData', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    municipio_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    municipio_nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 12 }
    },
    valor_cfem: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    moeda: {
      type: DataTypes.STRING(3),
      defaultValue: 'BRL'
    },
    fonte: {
      type: DataTypes.STRING(255),
      defaultValue: 'ANM'
    },
    data_coleta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    tableName: 'cfem_data',
    indexes: [
      { fields: ['municipio_id'] },
      { fields: ['ano', 'mes'] },
      { fields: ['municipio_nome', 'ano', 'mes'] }
    ]
  });

  return CfemData;
};
