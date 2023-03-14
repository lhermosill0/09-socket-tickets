//Referencias HTML
const lblEscritorio= document.querySelector('h1')
const btAtender= document.querySelector('button')
const lblTicket= document.querySelector('small')
const lblAlerta= document.querySelector('.alert')
const lblCola= document.querySelector('#lblPendientes') 

const searchParams= new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es obligatorio')
}

const escritorio =searchParams.get('escritorio')
lblEscritorio.innerText=escritorio
lblAlerta.style.display='none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btAtender.disabled=false
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btAtender.disabled=true;
});
//escucho el ticket de el controler
socket.on('tickets-pendientes',(payload)=>{

  if (payload===0)
  {
    lblCola.style.display='none'
   
  }else{ 
    lblAlerta.style.display='none';
    lblCola.style.display=''
    lblCola.innerText ="Pendientes " + payload; 
   
  }
}) 



btAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket',{escritorio}, ({ok,ticket,msg})=>{ 
        
      
       if (!ok){
            return lblAlerta.style.display=''
       }
        else{
       lblTicket.innerText='Ticket '+ ticket.numero}
    })
   
 //socket.emit( 'siguiente-ticket', null, ( ticket ) => {
      //  lblNuevoTicket.innerText=(ticket);
      
    //});

});