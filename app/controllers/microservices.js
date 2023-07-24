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