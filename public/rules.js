
            /*function Card (v , suit){
                this.value=v;
                this.rank;
                
                
                switch (suit){
                    
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
                    
                    
                    
                    
                }
                
               
                
                
                
            }*/
            function Combo(cardslist){
               
                this.cards=cardslist;
                
                this.kicker; //distinguish winner when combos have same value;
                this.value=0;
                this.level=0;
      
                if(this.cards.length ==2 ){
                    
                    if(this.cards[cards.length-1].value == this.cards[0].value){
                        console.log("is a pair");
                        this.value=cards[0].value;
                        console.log(this.value);
                    }
                    // Check for pair 
                    
                }
                else if( this.cards.length==3){
                    //check for triples
                    var count=0;
                    for( var i =0; i<this.cards.length;i++){
                        if(this.cards[i].value!=this.cards[0].value){
                            console.log("not a valid combo");
                            this.value=0;
                            continue;
                        }
                        count++;
                        
                    }
                    if(count==3){
                    this.value=this.cards[0].value;
                    console.log("is a triple");
                    console.log(this.value);}
                    
                }else if (this.cards.length==5){
                   // lots of different combos here 
                   
                   
                   var straight =checkStraight(this.cards);
                   var flush = checkFlush(this.cards);
                    var house = checkHouse(this.cards);
                   var fourkind = checkFourOfAKind(this.cards);
                   if(flush * straight>0){this.value=flush*straight;this.level=5; console.log(this.level);this.kicker=this.cards[this.cards.length-1].rank;}
                   else if(straight>0){this.value=straight;this.level=1; console.log(this.level);this.kicker=this.cards[this.cards.length-1].rank;}
                   else if(flush>0){this.value=flush;this.level=2;console.log(this.level);this.kicker=this.cards[this.cards.length-1].value;}
                
                   else if(house>0){this.value=house;this.level=3;}
                   else if(fourkind>0){this.value=fourkind;this.level=4;}
                 //  
                      else{console.log("not a combo");}
                   
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }
                else{
                    console.log("invalid combo");
                    this.value=0;
                }
                
                function checkStraight(Cards){
                    // Aces and 2's cant be the last card
                    
                    if (Cards[Cards.length-1].value == 100 || Cards[Cards.length-1].value == 90){
                        
                        console.log("Cant not include Ace 's and 2 's in straights");
                        return 0;
                    }
                        
                    else if (Cards[0].value == 2 || Cards[0].value == 1){
                        console.log("Cant have Aces and 2's in staights");
                        return 0;
                        
                        
                        
                    }else{
                        
                        var lastval = Cards[0].value;
                       
                        for(var i = 1; i < Cards.length; i++){
                           // console.log(Cards.length);
                            //console.log(i);
                            var temp = Cards[i].value;
                            if(temp==lastval+1){
                                
                                lastval=temp;
                                
                            }
                            else{return 0;}
                            
                        }
                     //   console.log(Cards[Cards.length-1].value);
                        console.log("its a straight");
                        this.kicker=Cards[Cards.length-1].rank;
                        console.log(this.kicker);
                        return Cards[Cards.length-1].value;
                        
                        
                        
                        
                        
                    }
                    
                    
                    
                }
                
                
                function checkFlush(Cards){
                    var suit = Cards[0].rank;
                    for(var i = 0;i <Cards.length;i++){
                        if(Cards[i].rank!=suit){
                            return false;
                        }
                        
                        
                    }
                    console.log("its a flush");
                    this.kicker=Cards[Cards.length-1].value;
                    return suit;
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }
                
                function checkHouse(Cards){
                    if(Cards[0].value==Cards[1].value){
                        
                        
                        
                        
                        
                        if(Cards[2].value==Cards[0].value){
                            
                            // we know that this is a triple
                            // Search for pair 
                            
                            if(Cards[3].value==Cards[4].value){
                                // It is a house
                                console.log("House found");
                                console.log(Cards[0].value);
                                return Cards[0].value;
                                
                                
                            }else{return 0;}
                            
                            
                            
                            
                        }else{
                            // it is pair
                            // search for triple
                            if(Cards[2].value==Cards[3].value && Cards[3].value==Cards[4].value){
                                 console.log("House found");
                                 console.log(Cards[4].value);
                                return Cards[4].value;
                            }else{return 0;}
                            
                            
                            
                            
                            
                        }
                        // there is at least a pair 
                        
                        
                        // check for triplet,
                    }
                    // does not contain at least a pair then it cannot be a house
                    else { return 0;}
                    
                    
                }
                function checkFourOfAKind(Cards){
                    // 2 cases the 4 copies at the begining of the list
                    // case 2 : 4 copies at the end of the list.
                    //case 1
                    if(Cards[0].value==Cards[3].value){
                        
                        console.log("4 of a kind:");
                        return Cards[0].value;
                    // Case2
                    }else if(Cards[4].value==Cards[1].value){
                        console.log("4 of a kind");
                        return Cards[4].value;
                    }
                    else{return 0;}
                    
                }
                
                this.Compare = function(A,B){
                    console.log(A.value);
                    console.log(B.value);
                    console.log(A.level);
                    console.log(B.level);
                    if(A.level > B.level){
                        return true;
                    }else if (A.level==B.level){
                        
                        
                        if(A.value>B.value){return true;}
                        else if(A.value==B.value){
                            console.log("compare suits");
                            if(A.kicker>B.kicker){return true;}
                            else{return false;}
                            
                           // console.log(B.kicker);
                            //console.log(A.kicker);
                            //return true;
                            
                            
                            
                        }else{return false;}
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                    }else{
                        return false;
                    }
                    
                    
                }
                
                
    }           
            
            
            
            
            
            
            
            
            
            
             function compare(A,B){
                    if(A.value > B.value){
                          console.log(A.name);
                        return 1;
                      
                        
                        
                    }else if (A.value == B.value){
                        
                        if( A.rank > B.rank){console.log(A.name);return 1;}
                        
                        else{
                            console.log(name);
                            return -1;
                        }
                        
                        
                        
                        
                    }
                    
                    
                    
                    
                    
                }
                
                
             
            /*var cards = [];
            cards.push(new Card(3,'c'));
            cards.push(new Card(4,'c'));
            cards.push(new Card(5,'c'));
            cards.push(new Card(6,'c'));
            cards.push(new Card(11,'c'));
            
            
            
            
            cards.sort(compare);
            
            console.log(cards);
            var combo = new Combo(cards);
            
            
            var cards2=[];
            cards2.push(new Card(4,'h'));
            cards2.push(new Card(8,'s'));
            cards2.push(new Card(8,'d'));
            cards2.push(new Card(8,'s'));
            cards2.push(new Card(8,'h'));
            
            cards2.sort(compare);
            console.log(cards2);
            var c = new Combo(cards2);
           
            
            
            if(c.Compare(combo,c)){
                console.log("combo wins");
                
            }else{
                console.log("c wins");
            }
            
          */ 
            
        
