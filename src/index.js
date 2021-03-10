const express = require('express');
const movies = require('./movies');
const connection = require("./config");

const port = 3000;
const app = express();

app.listen(port, () => {
  console.log('server 3000');
});

app.get("/", (request, response) => {
  response.send('Welcome to ingrid favourite movie list');
});

app.get('/api/movies', (request, response) => {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      response.status(500).send('error retrieving data');
    } else {
      response.status(200).json(results);
    }
  })
});

app.get('/api/movies/:id', (request, response) => {
  connection.query(
    "SELECT * from movies WHERE id=?",
    [request.params.id],
    (err, results) => {
      if(err) {
        console.log(err);
        response.status(500).send("errof retrieving data");
      } else {
        response.status(200).json(results);
      }
    }
  )
})
//response.json(movies.find(movie => movie.id === parseInt(request.params.id)))

app.get('/api/search', (request, response) => {
  connection.query (
    "SELECT * from movies WHERE duration<=?",
    [request.query.maxDuration],
    (err, results) => {
      if(err) {
        response.status(500).send("no movie with this duration");
      } else {
        response.status(200).json(results);
      }
    }
    )
}
)

  //const movies1 = movies.filter(
    //(target) => target.duration <= request.query.maxDuration
  //);

  //if (movies1.length > 0) {
    //response.json(movies1);
  //} else {
    //response.status(404).send('No movie found for this duration');
  //}
//}
//);
//});


