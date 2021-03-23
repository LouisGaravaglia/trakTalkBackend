const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {ChatUser} = require('./chatuser');

app.use(express.static(__dirname + '/public'));
app.get('/test', (req, res) => res.send('Hello World From Express Server'))

app.ws('/chat/:roomName', function(ws, req, next) {
    console.log('hit chat in backend');

    try {
      const user = new ChatUser(
        ws.send.bind(ws), 
        req.params.roomName 
      );
    
      ws.on('message', function(data) {
        try {
          user.handleMessage(data);
        } catch (err) {
          console.error(err);
        }
      });
  
      ws.on('close', function() {
        try {
          if (user.name !== null) user.handleClose();
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

