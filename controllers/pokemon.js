const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {

  res.redirect('/pokemon');
  },

  allPokemon: function(req, res){
    if(!req.session.gym){
      req.session.gym = [];
    }

    knex('pokemon')
      .orderBy('id')
      .then((result)=>{
        res.render('pokemon', {pokemonList: result, gym: req.session.gym});
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
        knex('trainers')
          .then((trainerResult)=>{
            let currentTrainer = [];
            for(let i = 0; i < trainerResult.length; i++){
              if(trainerResult[i].id === result[0].trainer_id){
                currentTrainer = trainerResult.splice(i, 1);
              }
            }
            //console.log(currentTrainer);
          res.render('update', {poke: result[0], trainer: trainerResult, current: currentTrainer[0]});
          })
      });
  },

  profile: function(req, res){
    knex('pokemon')
      .where('id', req.params.id)
      .then((result)=>{
        //console.log(result);
        knex('trainers')
          .where('id', result[0].trainer_id)
          .then((trainerResult)=>{
                console.log(result[0].trainer_id);
           res.render('profile', {poke: result[0], trainer: trainerResult[0]});
          })

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

  addToGym: function(req, res){
    knex('pokemon')
      .where('id', req.params.id)
      .update({
        in_gym: 'true'
      })
      .then(()=>{
        req.session.gym.push(req.params.id);
        req.session.save(()=>{
          res.redirect('/pokemon');

        })


      })
  },

  removeFromGym: function(req, res){

    var gym = req.session.gym;
    for(let i =0; i <gym.length; i++){
      if(gym[i] ===  req.params.id){
        gym.splice(i,1);
      }
    }

    knex('pokemon')
      .where('id', req.params.id)
      .update({
        in_gym: 'false'
      })
      .then(()=>{
        req.session.save(()=>{
          res.redirect('/pokemon');
        })
      })
  }




}
