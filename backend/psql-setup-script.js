const { sequelize } = require('./db/models');

const scemaName = 'Everswole';

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(schemaName)) {
        await sequelize.createSchema(schemaName);
    }
});