const express = require('express');
const app = express();
const router = express.Router()
const expressWs = require('express-ws')(app);
app.use(express.static(__dirname + '/public'));
const serverless = require('serverless-http');

router.get('/test', (req, res) => res.send('Hello World From Express Server'))

const ChatUser = require('../ChatUser');

router.ws('/chat/:roomName', function(ws, req, next) {
    console.log('hit chat in backend');

    try {
      const user = new ChatUser(
        ws.send.bind(ws), // fn to call to message this user
        req.params.roomName // name of room for user
      );
  
      // register handlers for message-received, connection-closed
  
      ws.on('message', function(data) {
        try {
          user.handleMessage(data);
        } catch (err) {
          console.error(err);
        }
      });
  
      ws.on('close', function() {
        try {
          user.handleClose();
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

  // app.use('/', router)
  app.use('/.netlify/functions/api', router)
  // app.listen(3000, () => console.log('listening on port: 3000'))

module.exports.handler = serverless(app);