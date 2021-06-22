class Rover {
   // Write code here!
   constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
   receiveMessage(message){
     let response = {};
     let results = [];
     let commands = message.commands;
     response.message = message.name;
     //completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 5
     for(let i = 0; i < commands.length; i++){
       if(commands[i].commandType === 'STATUS_CHECK'){
         //console.log('this');
         //console.log(this);
         results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
       };
       if(commands[i].commandType === 'MODE_CHANGE'){
         this.mode = commands[i].value;
         results.push({completed: true});
       }
       if(commands[i].commandType === 'MOVE'){
         if(this.mode === "LOW_POWER"){
           results.push({completed: false});
         } else{
           results.push({completed: true});
           this.position = commands[i].value;
         }
       };
     };
     response.results = results;
    
     return response;
   }
}

module.exports = Rover;