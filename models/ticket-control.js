const path= require('path');
const fs= require('fs');

class Ticket{
    constructor (numero,escritorio)
    {
        this.numero=numero;
        this.escritorio=escritorio;
    }
}
class TicketControl {
constructor(){
   this.ultimo=0; 
   this.hoy=new Date().getDate();
   this.tickets=[];
   this.ultimos4=[];
   this.init();
}
 get  toJson(){
    return {
        ultimo:this.ultimo,
        hoy:this.hoy,
        tickets:this.tickets,
        ultimos4:this.ultimos4
    }
 }
 //inicializar la clase
 init(){
    const {hoy,ultimo,ultimos4,tickets} =require('../db/data.json')
    if(hoy===this.hoy){
      
        this.tickets=tickets
        this.ultimos4=ultimos4
        this.ultimo=ultimo

    }else
    // es otro 
      this.guardarDB(); 
    }
 
 guardarDB(){
    const dbPath=path.join(__dirname,'../db/data.json')
    fs.writeFileSync(dbPath,JSON.stringify(this.toJson))

 }
 siguiente(){
    this.ultimo+=1
    const ticket = new Ticket(this.ultimo,null);

    this.tickets.push(ticket);
    this.guardarDB();
    return 'Ticket '+ ticket.numero;
 }
 atenderticket(escritorio){

   if (this.tickets.length===0){
    return null
   }
   const ticket=this.tickets[0]
   //borrar el primer elemento del arreglo 
   this.tickets.shift();

   ticket.escritorio=escritorio
    //agregar el tiket al inicio del arreglo
   this.ultimos4.unshift(ticket)

   if (this.ultimos4.length >4){
    this.ultimos4.splice(-1,1)
   }
   this.guardarDB()
   return ticket


}
}
module.exports=TicketControl,Ticket