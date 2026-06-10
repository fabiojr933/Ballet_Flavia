exports.up = (knex) => {
  return knex.schema.createTable('campanhas', (table) => {
    table.increments('id').primary();
    table.string('nome', 150).notNullable();
    table.text('mensagem').notNullable();
    table.text('enviar_todos').notNullable();  //Sim: envia para todos Não; para para ativo
    table.timestamp('data_hora_criacao').notNullable().defaultTo(knex.fn.now());
    table.enu('repete', [
      'NAO',
      'DIARIO',
      'SEMANAL',
      'MENSAL'
    ]).defaultTo('NAO');

    table.enu('status', [
      'PENDENTE',
      'ENVIADO',
      'CANCELADO'
    ]).defaultTo('PENDENTE');    

    table.timestamp('proxima_execucao');
    table.boolean('ativo').defaultTo(true);
    table.timestamps(true, true);

    // índices
    table.index('status');
    table.index('data_hora_criacao');
    table.index('ativo');

  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('campanhas');
};