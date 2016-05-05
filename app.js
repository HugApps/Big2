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




var app = express(),server=require('http').createServer(app),io=io.listen(server);
app.use(cookieParser());
//var server = require('http').createServer(app);
var id ="";



server.listen(3000);
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var users=[];
var sockets=[];
var roomcount=1;
var clientcount=0;
var Deck  = new Deck();
Deck.shuffle();


io.on('connection', function(socket){
     // player list shuld be shared with all users..
     clientcount++;
     console.log(socket.id);
     sockets.push(socket.id);
     console.log("The NUMBER OF IDS is : " + sockets.length);

   

	//socket.emit('playerlist',users);
	// var cookie = socket.request.headers.cookie.username;
    socket.emit('updateList',users);
	socket.broadcast.emit('playerlist',users);
	
		console.log("BUILDING NEW DECK");
		console.log(users[users.length-1]);
		console.log(socket.id);
		io.to(socket.id).emit('startgame',DealCards(users[users.length-1],Deck));
	
	
     
  

  	
	
             
              
       
        // users=[];

		//res.sendFile(path.join(__dirname + '/public/game.html'));

		
		 	//console.log(full);
	 	 

	
	 


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
   

         var client = {
    		username: req.body.fname ,
    		ip: req.ip,
    		roomid: roomcount,
    		Hand: [],
    		first: false
         }
		users.push(client);

		res.cookie("username",client.username);
		res.cookie("roomid",client.roomid);
		//res.cookie=null;

		
		res.sendFile(path.join(__dirname + '/public/game.html'));
		//io.sockets.emit('updateList',users);
		//io.sockets.emit('updateList',users);
		//res.send('waiting for more players');
		//console.log(users);


	


	

	//res.send(' ' + username);
    //console.log(req.body.form);
   // console.log(req.body.fname);
   // console.log(req.body.roomid);
  //  



});



function Card( suit, value ){
	this.value;
	this.rank;
	this.name;
	this.suit;
	// Intialize cards 
	if(value==2){
		this.value=100;
	}else if (value==1){
		this.value=90;
	}else{
		this.value=value;
	}

	this.suit=suit;


	switch(value){

		case 11:
			this.name = "J of " + this.suit;
			break;
		case 12:
			this.name = "Q of " +this.suit;
			break;
		case 13:
			this.name = "K of " +this.suit;
			break;
		case 1:
			this.name= "A of" +this.suit;
			break;
		default:
			this.name= value + " of " +this.suit;

	}


	switch(this.suit){

		case 'd':
			this.rank=0;
			break;
		case 'c':
			this.rank=1;
			break;
		case 'h':
			this.rank=2;
			break;
		case 's':
			this.rank=3;
			break;
		

	}
    
	function Compare (CardA , CardB){

		if(CardA.value > CardB.value){
			return true;
		}
		else if(CardA.value==CardB.value){
				if(CardA.rank > CardB.rank){
					return true;
				}else{
					return false;
				}


		}
		else{
			return false;
		}




	}

}

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
		console.log(user);
	// for each player in the room, give him cards from the deck and add it to the listof players
		for(var x =0; x<13;x++){
			var drew = Deck.Draw();
			if(drew.value==3 && drew.rank==0){
				user.first=true;



			}
			user.Hand.push(drew);





		}

		console.log(user);

			


		//console.log(tmpuser);
		//updatedlist.push(tmpuser);








	

	return user;



}




module.exports = app;
