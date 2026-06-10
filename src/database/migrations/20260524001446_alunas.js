exports.up = (knex) => {
  return knex.schema.createTable('alunas', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.date('data_nascimento').notNullable(); 
    table.enu('turma', ['1', '2']).defaultTo('1');
    table.string('responsavel').notNullable();
    table.string('telefone').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('alunas');
};