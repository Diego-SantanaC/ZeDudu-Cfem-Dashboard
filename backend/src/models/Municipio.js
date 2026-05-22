module.exports = (sequelize, DataTypes) => {
  const Municipio = sequelize.define('Municipio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'PA'
    },
    codigo_ibge: {
      type: DataTypes.STRING(10)
    },
    regiao: {
      type: DataTypes.STRING(50)
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'municipios'
  });

  return Municipio;
};
