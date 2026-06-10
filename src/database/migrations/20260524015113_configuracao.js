exports.up = (knex) => {
  return knex.schema.createTable('configuracao', (table) => {
    table.string('id');
    table.string('nome');
    table.string('conectado');
    table.timestamps(true, true);
    table.text('mensagem_falta').nullable();
    table.text('mensagem_aniversario').nullable();
    table.text('mensagem_lembrete_horario').nullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('configuracao');
};