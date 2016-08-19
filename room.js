var GameRoom = function(roomname){
	this.io = require('socket.io');
  
    // unique identifier for this room
	this.roomname=roomname;

	//gets playerlist's turn value
	this.currPlayer=null;

	this.PlayerList = new TurnList();
	//Current state of the game table (cards played)

	this.Table=null;
	this.displayPlayersArray=[];

     function ClearHand (Hand,play){
     	var index =[];



     	if(play.length > Hand.length){
			return false;



		}
		var num=null;;
		for (var i =0; i<=play.length-1;i++){

			index = Hand.findIndex( function (Hand){
				return (Hand.rank == play[i].rank && Hand.value==play[i].value);


			});


			if (num==null){

				// card not found 
				return false;
			} else{

				index.push(num)
			}



		}
		 // contains all the cards from the player;s hands


		 for ( var x = 0 ;x<play.length-1;x++){

		 	Hand.remove(index[x]);



		 }


		 return true;








     }
	function CompareHands (Hand,play){
		var index=null;
		if(play.length > Hand.length){
			return false;



		}
		for (var i =0; i<=play.length-1;i++){

			index = Hand.findIndex( function (Hand){
				return (Hand.rank == play[i].rank && Hand.value==play[i].value);


			});


			if (index==null){

				// card not found 
				return false;
			}



		}
		return true; // contains all the cards from the player;s hands








	}



	this.addPlayer = function(Player){
		this.displayPlayersArray.push(Player);
		this.PlayerList.insert(Player);
		if(this.PlayerList.turn!=null){
			this.currPlayer=this.PlayerList.turn;
		}







	}


	// receives play after socket event from server, checks roomId, PlayerName and then compares card with table
	function receievePlay(Roomid,Player,Cards){
		// check if player is in the right room or if play is sent to the right room
		if(Roomid !=this.roomname){
			console.log("error , wrong room");
			return false;
		}
		// check if player is the current player making turns
		else if(this.currPlayer.username !=Player.username){
				console.log ("Player doesn ot exist");
				return false;
			}
			// Check for winning condition

		else if (this.currPlayer.Hand==null && Player.Hand==null){
			console.log(Player.username + "  wins the game");
			return true;
		}
		// checks if player contains the actual cards
		else if (!CompareHands(this.currPlayer.Hand,Cards)){
			// cards played do not match cards in hand

			return false;


		}


		// compare cards played with table and update players
		else{

			// played cards is a combo
			if(Cards.length >=2 ){
			var a = new Combo(Cards);
			var b = new Combo(this.Table);

			if(a.compare(b)){

				// Hand beats table cards 

				this.Table=Cards;
				this.ClearHand(this.currPlayer.Hand,Cards); // replace table with the cards played 
				return true;
				// need to remove cards played from player's hand 






			}





		}else{

			console.log("Try again");
			return false;





		}











		}



		}



		this.getPlayer = function (user){
			//console.log(user);
			for (i =0 ;i<=this.displayPlayersArray.length-1;i++){

				var temp = this.displayPlayersArray[i];
				//console.log(temp);
				if (temp.username==user){
					//console.log(temp.username);
					return temp;



				}




			}
			
			






		};


}		

module.exports=GameRoom;



var Node = function(){


		this.next=null;
		this.value=null;
	};

var TurnList = function(){

		this.Head = null;
		this.Tail =null;
		this.turn= null;
		


		this.insert = function(p){
			if(this.Head==null){
				// Create new node 

				var n = new Node();
				n.value =p;
				n.next=n;
				this.Tail=n;
				this.Head=n;
				if(p.rank==1 && p.value==3){
					this.turn=n;


				}
			}
			else{
				var x = new Node();
				x.value=p;
				this.Tail.next=x;
				x.next=this.Head;
				this.Tail=x;
				if(p.rank==1 && p.value==3){
					this.turn=x;


				}




			}




		}





	};