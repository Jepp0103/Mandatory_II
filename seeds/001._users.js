exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'admin', password: 'password' },
    { username: 'seconduser', password: 'anotherpassword' }
  ]);
};
