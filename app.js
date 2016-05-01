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
var roomcount=1;

io.on('connection', function(socket){



	socket.emit('playerlist',users);
	 var cookie = socket.request.headers.cookie.username;

	 console.log(socket.id);


})



app.get('/', function ( req, res){
	
	//res.send('hello world!');

    
    if(req.body.fname != null){

    	//console.log(req.body.fname);
    }else{
	res.sendFile(path.join(__dirname + '/public/hello.html'));}
	
})



app.post('/', function(req, res){
 

    // testing with 2 users only
    if(users.length <2  && req.body.fname){

         var client = {
    		username: req.body.fname ,
    		ip: req.ip,
    		roomid: roomcount,
    		Hand: []
         }
		users.push(client);

		res.cookie("username",client.username);
		res.cookie("roomid",client.roomid);
		//res.cookie=null;
		io.emit('updateList',users);
		res.sendFile(path.join(__dirname + '/public/game.html'));
		
		//res.send('waiting for more players');
		//console.log(users);


	}

	else if (users.length==2){
		
        var tempDeck = new Deck();
        tempDeck.shuffle();
       // DealCards(users,tempDeck);
        roomcount++;
        // send the updated list of players with hands to game
         io.emit('startGame',DealCards(users,tempDeck));
         //users=[];

		//res.sendFile(path.join(__dirname + '/public/game.html'));
	} else{
		res.send('game full');
		users=[];
	}
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
			this.rank-1;
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

function DealCards(playerlist,Deck){
	// for each player in the room, give him cards from the deck and add it to the listof players
	var updatedlist = [];
	var tmpuser;
	for(var i = 0; i <playerlist.length; i ++){
		tmpuser = playerlist[i];


		for(var x =0; x<13;x++){
			tmpuser.Hand.push(Deck.Draw());




		}



			


		console.log(tmpuser);
		updatedlist.push(tmpuser);








	}

	return updatedlist;




}




module.exports = app;
