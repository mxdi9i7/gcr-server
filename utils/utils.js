function randomAgent_ID(array){
    var number="";
    for(var i=0;i<6;i++) 
    { 
        //random 6 digit numebr
        number+=Math.floor(Math.random()*10); 
    } 
    return number;
}


export { randomAgent_ID  };