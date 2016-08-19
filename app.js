
// Libraries and Modules needed from node.js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var io = require('socket.io');
var routes = require('./routes/index');
var users = require('./routes/users');
var math = require('mathjs');
var username=0;

// Card Game Libraries 
var Combo = require('./public/rules.js');
var Card = require('./public/cards.js');
var GameRoom = require('./room.js');





// sets up express and server
var app = express(),server=require('http').createServer(app),io=io.listen(server);
app.use(cookieParser());
var id ="";


// LIsten to port 3000
server.listen(3000);
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Global ingame variables
// server list of players
var users=[];

var sockets=[];
// counter for rooms created
var roomcount=0;
var clientcount=0;

// Create a new deck of cards
var Deck  = new Deck();
Deck.shuffle();


var RoomsList=[];













// Handle on connection socket event

io.on('connection', function(socket){


	 
     sockets.push(socket.id);
    
     // Gets user room number and username
     var CurrRoomid = socket.request.headers.cookie.split('room')[2];
    
   
     var Curruser = socket.request.headers.cookie.split('username=')[1].split(';')[0]
     
     // get current Room and users
     var CurrRoom = RoomsList[CurrRoomid];
     var currPlayer = CurrRoom.getPlayer(Curruser);
     // Assigns socket id for user
    	currPlayer.socketid=socket.id;
     var CurrRoomName =CurrRoom.roomname; 
     var CurrRoomPlayers=CurrRoom.displayPlayersArray;	
 	 
     
    

  	// Attach client socket to socket. io room
    socket.join(CurrRoomName);


    
    // Update client player list
   	socket.emit('playerlist',CurrRoomPlayers);

    // Update all players in the room when new players join
    socket.to(CurrRoomName).emit('updateList',CurrRoomPlayers);
  	
		// When room is full, send cards out to player	
		if(CurrRoomPlayers.length==4){

				//socket .io does not allow sending to socket id that matches the sender, must use built in emit
				socket.emit('startgame',DealCards(currPlayer,Deck));
				// For each player except current player, send out cards to each individual player
				for (var i =0 ; i <CurrRoom.displayPlayersArray.length-1;i++){

						var sendToUser = CurrRoom.displayPlayersArray[i].socketid;

						console.log(sendToUser);
						socket.to(sendToUser).emit('startgame',DealCards(CurrRoom.displayPlayersArray[i],Deck));




				}
		//## HAS TO SEND TO ALL USERS IN A ROOM
		
			//console.log(CurrRoomPlayers);
			// Deal Hand to Player

			//for()
			//socket.to(CurrRoomName).emit('startgame',DealCards(currPlayer,Deck));
		

		// Deck Reset
		Deck.Renew();
		Deck.shuffle();
		CurrRoomPlayers=[];
		
		}
		
        
		
		

	
	
     
 
	 	 

	
	 


});



app.get('/', function ( req, res){
	
	//res.send('hello world!');

    
    if(req.body.fname != null){

    	//console.log(req.body.fname);
    }else{
	res.sendFile(path.join(__dirname + '/public/hello.html'));}
	
});



app.post('/', function(req, res){
 
    //Home sends post request to server when joning server

    // testing with 2 users only
   
    	


		if(users.length >=4){
			roomcount=roomcount+1;
			users=[];
			clientcount=0;
		}
         var client = {
    		username: req.body.fname ,
    		ip: req.ip,
    		socketid: null,
    		roomid: "room"+roomcount,
    		Hand: [],
    		turn: false
         }
		users.push(client);


		res.cookie("username",client.username);
		res.cookie("roomid",client.roomid);
		//res.cookie=null;
		clientcount++;

		if(clientcount==1){
		console.log("Creating brand new room");
		var temp = new GameRoom("room"+roomcount);
		
		temp.addPlayer(users[users.length-1]);
		RoomsList.push(temp);
		
		
	
		





	} else{
			 
		// add to existing room 

		console.log("Adding to existing room");
		var currroom = RoomsList[RoomsList.length-1];
		
		currroom.addPlayer(users[users.length-1]);
		
		clientcount++;

	}
	
		res.sendFile(path.join(__dirname + '/public/game.html'));
		
		

});





function Deck(){
 
 //console.log(math.randomInt(12,24));
 this.Cards = [];



 for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('d',i));


 }
  for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('c',i));


 }

 for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('s',i));


 }

 for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('h',i));


 }


 this.Renew = function (){
 	this.Cards=[];

 	for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('d',i));


 }
  for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('c',i));


 }

 for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('s',i));


 }

 for (var i =1; i <=13 ;i ++){
 		this.Cards.push(new Card('h',i));


 }



 }

this.shuffle = function (){
	for(var i =0; i<52;i++){
		var ran = math.randomInt(1,52);
		var pos = math.mod(ran,52);
		//console.log(ran);
		//console.log(pos);
		var swap = this.Cards[pos];
		this.Cards[pos]=this.Cards[i];
		this.Cards[i]=swap;






	}





	
}
this.Draw = function(){

  return this.Cards.pop();



}


//console.log(this.Cards);
//console.log(Cards.length);

}

 function DealCards(user,Deck){
		
		var templist =[]
	// for each player in the room, give him cards from the deck and add it to the listof players
		for(var x =0; x<13;x++){
			var drew = Deck.Draw();
			if(drew.value==3 && drew.rank==0){
				user.turn=true;



			}
			user.Hand.push(drew);





		}

		

			


		//console.log(tmpuser);
		//updatedlist.push(tmpuser);








	
   
	return user;



}




module.exports = app;
