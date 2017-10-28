const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
  res.redirect('/pokemon');
  },

  allPokemon: function(req, res){
    knex('pokemon')

      .then((result)=>{
        res.render('pokemon', {pokemonList: result});
      })
  },

  createPoke: function(req, res){
    knex('trainers')
    .then((result)=>{
      res.render('create', {trainer: result});
    })
  },

  create: function(req, res){
    knex('pokemon')
     .insert({
       name: req.body.name,
       cp: req.body.cp,
       trainer_id: req.body.trainer_id,
       in_gym: false
     })
     .then(()=>{
       res.redirect('/');
     })
  },

  del: function(req,res){
    knex('pokemon')
      .del()
      .where('id', req.params.id)
      .then((result)=>{
        res.redirect('/');
      })
      .catch((err)=>{
        console.error(err);
      });

  },

  getOne: function(req, res){
    knex('pokemon')
      .where('id', req.params.id)
      .then((result)=>{

        res.render('update', {poke: result[0]});
      });
  },

  update: function(req, res){
    knex('pokemon')
    .update({
      name: req.body.name,
      cp: req.body.cp,
      trainer_id: req.body.trainer_id,
      in_gym: false
    })
    .where('id', req.params.id)
    .then(()=>{
      res.redirect('/');
    })
  },

  profile: function(req, res){
    knex('pokemon')
      .where('id', req.params.id)
      .then((result)=>{
        console.log(result);
        knex('trainers')
          .where('id', result[0].trainer_id)
          .then((trainerResult)=>{
                console.log(result[0].trainer_id);
           res.render('profile', {poke: result[0], trainer: trainerResult[0]});
          })

      });
    }


}
