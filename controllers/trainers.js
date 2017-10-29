const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION


  allTrainers: function(req, res){
    knex('trainers')

      .then((result)=>{
        res.render('trainers', {trainersList: result});
      })
  },

  trainerprofile: function(req, res){
    knex('trainers')
      .where('id', req.params.id)
      .then((result)=>{
        knex('pokemon')
          .then((pokelist)=>{

           res.render('trainersPoke', {trainer: result[0], poke: pokelist });
          })

      });
    },




}
