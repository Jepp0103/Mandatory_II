exports.seed = function(knex) {
  return knex('users').select().then(users => {
    if (users.length >= 2) {
      return knex('electives').insert([
        { course_name: 'Python', user_id: users[0].id },
        { course_name: 'Android', user_id: users[0].id },
        { course_name: 'iOS', user_id: users[0].id },
        { course_name: 'PADC', user_id: users[1].id },
        { course_name: 'Node.js', user_id: users[1].id },
        { course_name: 'C', user_id: users[1].id }
      ]);
    }
  });
};
