'use strict';
const dotenv = require('dotenv').config();

let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('./middleware/initPassport');
let path = require('path');
let Message = require('./models/messages');

let app = express();
let port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  console.log('we are now listening on: ' + port);
});
let io = require('./io.js').init(server);
let handler = require('./routes/request_handler');

// const db = require('./config.js');
// const importdata = require('./fakeData.js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session( {
  secret: 'I didn\'t get Inception',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', express.static(path.join(__dirname, '../src/client')));

app.get('/users', handler.getUsers);

app.post('/users/friends', function(req, res) {
  /*req.body {
    user_id:
  }*/
  console.log('this is the user_id from react', req.body);
  Message.getUserFriends(req.body.user_id)
  .then(function(result) {
    res.status(200).send(result);
  })
  .catch(function(error) {
    res.status(400).send(error);
  })
})

app.post('/users/add', function(req, res) {
  /*req.body {
    user_id:
    friend_id:
  }*/
  Message.getUserFriendsID(req.body.user_id)
  .then(function(result) {
    var found = false;
    result.map(function(item) {
      if (item.user_id === `${req.body.friend_id}`) {
        found = true;
        console.log(found);
      }
    });
    if (found === true) {
      res.status(400).send('person is already a friend');
    } else {
      return Message.addUserFriend(req.body)
      .then(function(result) {
        res.status(201).send('friend request completed');
      })
    }
  })
  .catch(function(error) {
    res.status(400).send('bad request');
  })
})

app.get('/events', passport.authenticate('facebook-token'), handler.getEvents);

app.post('/events/users', passport.authenticate('facebook-token'), handler.addUsersEvents);

app.post('/events/create', passport.authenticate('facebook-token'), handler.createEvent);

app.get('/messages', function(req, res) {
  Message.getAll()
    .then(function(messages) {
      // console.log(messages);
      res.status(200).send(messages);
    })
});

app.post('/messages', function(req, res) {
  Message.write(req.body)
    .then(function(result) {
      console.log('Add: ', result);
      res.status(200).send(result);
    })
})

app.post('/accept', passport.authenticate('facebook-token'), handler.acceptEvent);

app.post('/reject', passport.authenticate('facebook-token'), handler.rejectEvent);

app.post('/delete', passport.authenticate('facebook-token'), handler.deleteEvent);

app.post('/delete/owner', passport.authenticate('facebook-token'), handler.deleteOwnerEvent);

app.post('/checkStatus', passport.authenticate('facebook-token'), handler.checkStatus);

app.get('/test', passport.authenticate('facebook-token'), function(req, res) {
  if (req.user) {
    res.status(200).json(
      { message: 'success',
        user: req.user
      });
  } else {
    res.status(404).send('login failed');
  }
});

app.get('*', handler.wildCard);




// SERVER SOCKET STUFF
// *************************
// const io = require('socket.io')(server);
/*
  message objects received in the form of
  {
    user_id: int
    event_id: int
    text: string
    created: object/timestamp
    token: string
  }
*/
