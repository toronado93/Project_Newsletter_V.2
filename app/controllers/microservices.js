exports.FieldCheck = (email)=>{

  const result  = email.split("@");
 
  const field= result[1].split(".");
// console.log("Field result in mc",field);
//   Result1 bring outlook,gmail or others

if(field[0] ==="outlook"){
    return 3;
}else if(field[0] ==="gmail"){
    return 2;

}else{
    return 1;
}
}



exports.getNewEventTime =() =>{

    const d_now = new Date();
    const d_half = new Date(d_now.getTime() + 30 * 60 * 1000);
   

    return [DateTimeObject(d_now),DateTimeObject(d_half)];
}

function DateTimeObject(date_obj){

    const time_object ={
  
        Fullyear:date_obj.getFullYear(),
        Month:date_obj.getMonth(),
        Day:date_obj.getDate(),
        T:"T",
        Hours:date_obj.getHours(),
        Minutes:date_obj.getMinutes(),
        Seconds:date_obj.getSeconds(),
      }
  

      const time_google_string = time_object.Fullyear+
    "-"+time_object.Month+"-"+time_object.Day+time_object.T+
    time_object.Hours+":"+time_object.Minutes+":"+time_object.Seconds;
    
   return time_google_string;

}


// Admin Password Creator
// Add some Salt and Hash to send into the db