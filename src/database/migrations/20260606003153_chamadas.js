exports.up = (knex) => {
    return knex.schema.createTable('chamadas', (table) => {
        table.increments('id').primary();

        table.timestamp('data')
            .notNullable();

        table.enu('status', [
            'PRESENTE',
            'AUSENTE'
        ]).defaultTo('PRESENTE');

        table.timestamps(true, true);

        table
            .string('turma')
            .nullable();

        table
            .integer('aluna_id')
            .nullable()
            .references('id')
            .inTable('alunas')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });

};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('chamadas');
};