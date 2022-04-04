module.exports = {
  async up(db, client) {
    await db.collection('openlibraries').createIndex( { lastModifiedDate: 1 }, { expireAfterSeconds: 86400 } );
    await db.collection('tokens').createIndex( { lastModifiedDate: 1 }, { expireAfterSeconds: 86400 } );
  },

  async down(db, client) {}
};
