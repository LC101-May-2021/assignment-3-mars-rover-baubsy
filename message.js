class Message {
   // Write code here!
   constructor(name, commands){
     this.name = name;
     this.commands = commands;
     if(this.name === undefined){
       throw Error("Message name required.");
     }
   }
}

module.exports = Message;