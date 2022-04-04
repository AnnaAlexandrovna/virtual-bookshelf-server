module.exports = {
  async up(db) {
    await db.collection('comments');
    await db.createCollection('comments');
    await db.createCollection('favorites');
    await db.createCollection('logs');
    await db.createCollection('openlibraries');
    await db.createCollection('tokens');
    await db.createCollection('users');
  },

  async down(db) {
    await db.comments.drop();
    await db.favorites.drop();
    await db.logs.drop();
    await db.openlibraries.drop();
    await db.tokens.drop();
    await db.users.drop();
  }
};