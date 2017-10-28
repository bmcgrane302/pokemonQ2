//Update the name of the controller below and rename the file.
const pokemon = require("../controllers/pokemon.js")
module.exports = function(app){

  app.get('/', pokemon.index);

  app.get('/pokemon', pokemon.allPokemon);

  app.get('/create', pokemon.createPoke);

  app.get('/update/:id', pokemon.getOne);

  app.get(`/profile/:id`, pokemon.profile);

  app.get(`/delete/:id`, pokemon.del);


  app.post('/createone', pokemon.create);

  app.post('/update/:id', pokemon.update);

  app.use(function(req, res){

    res.render('./error');
  })

}
