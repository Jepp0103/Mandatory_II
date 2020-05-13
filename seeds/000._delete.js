exports.seed = function(knex) {
  return knex('electives').del()
    .then(function () {
      return knex('users').del();
    });
};
