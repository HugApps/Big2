var Card= function( suit, value ){
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
			this.rank=1;
			break;
		case 'c':
			this.rank=2;
			break;
		case 'h':
			this.rank=3;
			break;
		case 's':
			this.rank=4;
			break;
		

	}};
	module.exports=Card;