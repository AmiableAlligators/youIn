'use strict';

let db = require('../config');
let io = require('../io').io();

module.exports = (req, res) => {
  // let userId = req.user['user_id'];
  let eventId = req.body['eventId'];
  console.log('event id from delete owner events', eventId);
  db.task(t=> {
        return t.batch([
            t.query('DELETE from users_events where event_id =$1', [eventId]),
            t.query('DELETE from events where event_id = $1 returning *', [eventId])
        ]);
    })
    .then(data=> {
        // data[0] = result from the first query;
        // data[1] = result from the second query;
        console.log('.thening', data[1][0].event_id);
        io.to('room:new-rooms').emit('delete-room', {
          event: data[1][0]
        });
        res.status(201).send(data);
    })
    .catch(error=> {
        // error
        console.log('error in delete_owner_events.js catch block', error)
        res.status(404).send();
    });

};




    // console.log('event id from delete_owner_events', eventId);
    // db.query('DELETE from users_events where event_id =$1', [eventId])
    // .then((result) => {
    //   console.log('inside the delete for Events');
    //   db.query('DELETE from events where event_id = $1', [eventId])
    // })
    // .then((result) => {
    //   console.log('deleted route success', result);
    //   res.status(201).send('event deleted');
    // })
    // .catch((err) => {
    //   console.log('deleted route error', err);
    //   res.status(404);
    // });