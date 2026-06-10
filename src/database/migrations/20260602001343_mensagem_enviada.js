exports.up = (knex) => {
  return knex.schema.createTable('mensagem_enviada', (table) => {
    table.increments('id').primary();  

    table.text('mensagem').notNullable();
    table.string('numero').notNullable();

    table.timestamp('enviado')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.enu('status', [
      'ERROR',
      'ENVIADO'
    ]).defaultTo('ENVIADO');

    table.timestamps(true, true);

    table
      .integer('campanha_id')
      .nullable()
      .references('id')
      .inTable('campanhas')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('mensagem_enviada');
};