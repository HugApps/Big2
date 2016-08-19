
            var Combo =function(cardslist){
               
                this.cards=cardslist;
                console.log(this.cards);
                this.kicker; //distinguish winner when combos have same value;
                this.value=0;
                this.level=0;
      
                if(this.cards.length ==2 ){
                    
                    if(this.cards[this.cards.length-1].value == this.cards[0].value){
                        console.log("is a pair");
                        this.value=this.cards[0].value;
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
                    
                    if (Cards[this.Cards.length-1].value == 100 || Cards[this.Cards.length-1].value == 90){
                        
                        console.log("Cant not include Ace 's and 2 's in straights");
                        return 0;
                    }
                        
                    else if (this.Cards[0].value == 2 || this.Cards[0].value == 1){
                        console.log("Cant have Aces and 2's in staights");
                        return 0;
                        
                        
                        
                    }else{
                        
                        var lastval = this.Cards[0].value;
                       
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
                        this.kicker=this.Cards[this.Cards.length-1].rank;
                        console.log(this.kicker);
                        return this.Cards[this.Cards.length-1].value;
                        
                        
                        
                        
                        
                    }
                    
                    
                    
                }
                
                
                function checkFlush(Cards){
                    var suit = this.Cards[0].rank;
                    for(var i = 0;i <this.Cards.length;i++){
                        if(this.Cards[i].rank!=suit){
                            return false;
                        }
                        
                        
                    }
                    console.log("its a flush");
                    this.kicker=this.Cards[this.Cards.length-1].value;
                    return suit;
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }
                
                function checkHouse(Cards){
                    if(this.Cards[0].value==this.Cards[1].value){
                        
                        
                        
                        
                        
                        if(this.Cards[2].value==this.Cards[0].value){
                            
                            // we know that this is a triple
                            // Search for pair 
                            
                            if(this.Cards[3].value==this.Cards[4].value){
                                // It is a house
                                console.log("House found");
                                console.log(this.Cards[0].value);
                                return this.Cards[0].value;
                                
                                
                            }else{return 0;}
                            
                            
                            
                            
                        }else{
                            // it is pair
                            // search for triple
                            if(this.Cards[2].value==this.Cards[3].value && this.Cards[3].value==this.Cards[4].value){
                                 console.log("House found");
                                 console.log(this.Cards[4].value);
                                return this.Cards[4].value;
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
                    if(this.Cards[0].value==this.Cards[3].value){
                        
                        console.log("4 of a kind:");
                        return this.Cards[0].value;
                    // Case2
                    }else if(this.Cards[4].value==this.Cards[1].value){
                        console.log("4 of a kind");
                        return this.Cards[4].value;
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
                
                
    };         
        
    module.exports=Combo;
          
            
            
            
            
            
            
          
                
                
             
            
            
        
