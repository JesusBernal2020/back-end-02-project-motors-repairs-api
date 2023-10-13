const Repairs = require('./repairs.model');
const User = require('./users.model');


const initModel = () => {
    User.hasMany(Repairs, { foreignKey: 'userId' });
    Repairs.belongsTo(User, { foreignKey: 'userId' });
}



module.exports = initModel