/** Functionality related to chatting. */

// Room is an abstraction of a chat channel

// import Room from "./room.js";
const {Room} = require('./room');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    console.log("handling join/ name: ", name);
    this.room.join(this);
    this.room.broadcast({
      user: 'Admin',
      message: `${this.name} joined the "${this.room.name}" room.`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      user: this.name,
      message: text
    });
  }

  /** Handle messages from client:*/

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);
    console.log("this is msg: ", msg);
 

    if (msg.type === 'join') this.handleJoin(msg.user);
    else if (msg.type === 'chat') this.handleChat(msg.message);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      user: 'Admin',
      message: `${this.name} left the "${this.room.name}" room.`
    });
  }
}
module.exports = { ChatUser }
// module.exports = ChatUser;
// export default ChatUser;
