'use strict';

// The original seed gave the demo user 13 of the 16 spots, so a recruiter logging in as the
// demo saw "Your listing" almost everywhere and could book only 3 places. Keep two listings
// for the demo user (so "Manage Spots" has something in it) and hand the rest to the other
// seed users, never to someone who reviewed that spot.

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface) {
    const q = (sql) => queryInterface.sequelize.query(sql, { type: queryInterface.sequelize.QueryTypes.SELECT });
    const t = (name) => (options.schema ? `"${options.schema}"."${name}"` : `"${name}"`);
    const [demo] = await q(`SELECT id FROM ${t('Users')} WHERE username = 'Rich-Guy'`);
    if (!demo) return;
    const others = (await q(`SELECT id FROM ${t('Users')} WHERE id <> ${demo.id} ORDER BY id`)).map((u) => u.id);
    if (!others.length) return;
    const spots = await q(`SELECT id FROM ${t('Spots')} WHERE "ownerId" = ${demo.id} ORDER BY id`);
    const reviews = await q(`SELECT "spotId", "userId" FROM ${t('Reviews')}`);
    const reviewed = (spotId, userId) => reviews.some((r) => r.spotId === spotId && r.userId === userId);

    // Keep the first two spots the demo user hasn't reviewed; give away the rest.
    const keep = spots.filter((s) => !reviewed(s.id, demo.id)).slice(0, 2).map((s) => s.id);
    let i = 0;
    for (const s of spots) {
      if (keep.includes(s.id)) continue;
      const candidates = others.filter((u) => !reviewed(s.id, u));
      const owner = candidates.length ? candidates[i++ % candidates.length] : others[i++ % others.length];
      await queryInterface.sequelize.query(`UPDATE ${t('Spots')} SET "ownerId" = ${owner} WHERE id = ${s.id}`);
    }
  },

  async down() {
    // Ownership changes aren't reversed.
  },
};
