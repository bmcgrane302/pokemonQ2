const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  allGym: function(req, res){
    knex('pokemon')

      .then((result)=>{
        res.render('gym', {pokelist: result, gym: req.session.gym});
      })
  }


}
