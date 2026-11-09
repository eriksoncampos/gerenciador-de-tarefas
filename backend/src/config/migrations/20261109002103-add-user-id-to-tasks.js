'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Cria a coluna aceitando NULL primeiro para não travar os dados existentes
    await queryInterface.addColumn('tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // 2. Insere um usuário padrão (mude o e-mail e use o hash de uma senha padrão se preferir)
    // Nota: Insira uma senha em texto puro se seu backend não usar criptografia (ex: bcrypt)
    await queryInterface.bulkInsert('Users', [{
      email: 'usuario.antigo@sistema.com',
      password: 'mude_essa_senha_depois', 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // Busca o ID do usuário que acabou de ser criado
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'usuario.antigo@sistema.com' LIMIT 1;`
    );
    const defaultUserId = users[0].id;

    // 3. Atualiza todas as tarefas órfãs injetando o ID do usuário criado
    await queryInterface.sequelize.query(
      `UPDATE "tasks" SET "userId" = ${defaultUserId} WHERE "userId" IS NULL;`
    );

    // 4. Agora que todas as tasks possuem dono, ativa a obrigatoriedade (NOT NULL)
    await queryInterface.changeColumn('tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'userId');
  }
};
