const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let mars = new Rover(5);
    expect(mars.position).toEqual(5);
    expect(mars.mode).toEqual('NORMAL');
    expect(mars.generatorWatts).toEqual(110);
    
  });

  it("response returned by receiveMessage contains name of message", function(){
    let mars = new Rover(5);
    let testMess = new Message('test', []);
    expect(mars.receiveMessage(testMess).message).toEqual('test');
    });
  
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let mars = new Rover(5);
    let command = new Command('STATUS_CHECK');
    let command2 = new Command('STATUS_CHECK');
    let testMess = {message: 'test', commands: [command, command2]};

    expect(mars.receiveMessage(testMess).results.length).toEqual(testMess.commands.length);
  });

  it("responds correctly to status check command", function(){
    let mars = new Rover(5);
    let command = new Command('STATUS_CHECK');
    let testMess = {message: 'test', commands: [command]};
    let expected = {completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 5}};
    let actual = mars.receiveMessage(testMess).results[0];
    expect(actual.completed).toEqual(expected.completed);
    for(prop in actual.roverStatus){
      expect(actual.roverStatus[prop]).toEqual(expected.roverStatus[prop]);
    };
    
  });

  it("responds correctly to mode change command", function(){
    let mars = new Rover(5);
    let command = new Command('MODE_CHANGE', 'LOW_POWER');
    let testMess = {message: 'test', commands: [command]};
    let expected = {completed: true}
    let actual = mars.receiveMessage(testMess).results[0];
    expect(actual.completed).toEqual(expected.completed);
    expect(mars.mode).toEqual('LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let mars = new Rover(5);
    mars.receiveMessage({message:'test setup', commands: [{commandType: 'MODE_CHANGE', value: 'LOW_POWER'}]});
    let actual = mars.receiveMessage({message:'test move', commands: [{commandType: 'MOVE', value: 10}]});
    //console.log(`actual ${actual.results[0].completed}`);
    expect(actual.results[0].completed).toEqual(false);
  });

  it("responds with position for move command", function(){
    let mars = new Rover(5);
    let actual = mars.receiveMessage({message:'test move', commands: [{commandType: 'MOVE', value: 10}]});

    expect(mars.position).toEqual(10);
    expect(actual.results[0].completed).toEqual(true);
  });
});
