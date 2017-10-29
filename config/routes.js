//Update the name of the controller below and rename the file.
const pokemon = require("../controllers/pokemon.js")
const trainers = require("../controllers/trainers.js")
const gym = require("../controllers/gym.js")
module.exports = function(app){

  app.get('/', pokemon.index);

  app.get('/pokemon', pokemon.allPokemon);

  app.get('/trainers', trainers.allTrainers);

  app.get('/trainers/:id', trainers.trainerprofile);

  app.get('/gym', gym.allGym);

  app.get('/create', pokemon.createPoke);

  app.get('/update/:id', pokemon.getOne);

  app.get(`/profile/:id`, pokemon.profile);

  app.get(`/delete/:id`, pokemon.del);

  app.get(`/addToGym/:id`, pokemon.addToGym);

  app.get('/removeFromGym/:id', pokemon.removeFromGym);


  app.post('/createone', pokemon.create);

  app.post('/update/:id', pokemon.update);

  app.use(function(req, res){

    res.render('./error');
  })

}
