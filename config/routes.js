//Update the name of the controller below and rename the file.
const pokemon = require("../controllers/pokemon.js")
module.exports = function(app){

  app.get('/', pokemon.index);

  app.get('/pokemon', pokemon.allPokemon);

  app.get(`/delete/:id`, pokemon.del);

  app.post('/pokemon', pokemon.create);



  app.use(function(req, res){

    res.render('./error');
  })

}
