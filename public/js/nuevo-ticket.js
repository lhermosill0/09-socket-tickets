
const  lblNuevoTicket=document.querySelector('#lblNuevoTicket')
const btnCrearTicket=document.querySelector('button')
const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrearTicket.disabled=false
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrearTicket.disabled=true;
});
//escucho el ticket de el controler
socket.on('siguiente-ticket', (ticket) => {
    // console.log('Desconectado del servidor');

    lblNuevoTicket.innerText ="Ticket " + ticket;
    
    
});




btnCrearTicket.addEventListener( 'click', () => {

   
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText=(ticket);
      
    });

});