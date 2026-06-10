exports.seed = async function (knex) {
  await knex('configuracao').del();
  const mensagem_falta =
    `🌸🩰 Olá, {{responsavel}}!

  Notamos que a aluna **{{nome_aluna}}** não esteve presente na aula de Ballet da **{{turma}}** com a **{{professora}}**. 💖

  Esperamos que esteja tudo bem com ela. ✨ Caso tenha acontecido algo ou precisem de qualquer apoio, estamos à disposição.

  Aguardamos sua bailarina em breve! 🌷🦋💕`;

  const mensagem_aniversario =
    `🎉🩰 Feliz Aniversário, {{nome_aluna}}! 🎂💖

  Hoje é um dia muito especial! Toda a equipe da **{{turma}}** e a **{{professora}}** desejam a você muita alegria, saúde, amor e sonhos realizados. ✨🌸

  Que seu dia seja tão lindo e encantador quanto os seus passos na dança! 🦋💕

  Parabéns! 🎈🎁`;

  const mensagem_lembrete_horario =
    `🩰✨ Olá, {{responsavel}}!

  Passando para lembrar que hoje é dia de Ballet para a nossa querida aluna **{{nome_aluna}}**. 💖

  A aula da **{{turma}}** será conduzida pela **{{professora}}**, em um momento especial de aprendizado, disciplina e muita dança. 🌸

  Esperamos vocês com carinho! Procurem chegar alguns minutos antes do horário para que a aula possa começar tranquilamente. ⏰✨

Até logo! 🩰💕`;

  const nome = 'Ballet';
  await knex('configuracao')
    .insert([
      {
        nome: nome,
        mensagem_falta: mensagem_falta,
        mensagem_aniversario: mensagem_aniversario,
        mensagem_lembrete_horario: mensagem_lembrete_horario
      }
    ]);
};