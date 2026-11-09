'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remove a coluna userId de 'tasks' (isso também remove a foreign key ligada a 'Users')
    await queryInterface.removeColumn('tasks', 'userId');

    // 2. Exclui as duas tabelas duplicadas usando CASCADE para evitar travas de dependências
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS "Users" CASCADE;');
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS "users" CASCADE;');

    // 3. Cria a tabela definitiva 'users' (tudo em minúsculo)
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });

    // 4. Recria a coluna 'userId' na tabela 'tasks' apontando para a nova 'users'
    await queryInterface.addColumn('tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // 5. Insere o usuário padrão para vincular as tarefas que já existem no banco
    await queryInterface.bulkInsert('users', [{
      email: 'usuario.antigo@sistema.com',
      password: 'mude_essa_senha_depois',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "users" WHERE email = 'usuario.antigo@sistema.com' LIMIT 1;`
    );
    const defaultUserId = users[0].id;

    // 6. Vincula as tarefas existentes ao usuário padrão e ativa o NOT NULL
    await queryInterface.sequelize.query(
      `UPDATE "tasks" SET "userId" = ${defaultUserId} WHERE "userId" IS NULL;`
    );

    await queryInterface.changeColumn('tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'userId');
    await queryInterface.dropTable('users');
  }
};
