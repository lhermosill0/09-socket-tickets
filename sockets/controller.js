const TicketControl = require("../models/ticket-control");


const ticketControl=new TicketControl()

const socketController = (socket) => {
    //emito mensaje al cliente cuando se conecta
    socket.emit('ultimo-ticket',ticketControl.ultimo)
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('tickets-pendientes',ticketControl.tickets.length )

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente= ticketControl.siguiente();
        callback(siguiente)
        //TODO notificar  
        socket.emit('tickets-pendientes',ticketControl.tickets.length )
    })
   
    socket.on('atender-ticket', ( {escritorio}, callback ) => {
       if (!escritorio)
       return callback (
        {
            ok:false,
            msg:'El escritorio es obligatorio'
        })

        //TODO notificar
        const ticket=ticketControl.atenderticket(escritorio);

        //TODO Notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4)

        socket.emit('estado-actual',ticketControl.length)
        socket.broadcast.emit('estado-actual',ticketControl.length)

        if (!ticket){
        return callback (
            {
                ok:false,
                msg:'Ya no hay tickets pendientes'
            });
        }else{
            callback (
                {
                    ok:true,
                    ticket
                });
        }
    })


}



module.exports = {
    socketController
}

