var GameRoom = function(roomname){

  
    
	this.roomname=room_name;

	this.currPlayer=null;




	this.Node = function(){


		this.next=null;
		this.value=null;
	};

	this.TurnList = function(){

		this.Head = null;
		this.Tail =null;
		this.turn= null;
		


		function insert(p){
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

	











};
module.exports=GameRoom;
