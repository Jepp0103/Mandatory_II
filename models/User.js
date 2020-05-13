const { Model } = require('objection');

const Elective = require('./Elective.js');

class User extends Model {
    static tableName = 'users';

    static relationMappings = {
        electives: {
            relation: Model.HasManyRelation,
            modelClass: Elective,
            join: {
              from: 'users.id',
              to: 'electives.userId'
            }
        }
    }
}

module.exports = User;
