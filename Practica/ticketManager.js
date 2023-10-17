class Evento {
    id
    nombre
    lugar
    precio
    capacidad
    fecha
    participantes = []

    constructor(id, { nombre, lugar, precio, capacidad, fecha }) {
        this.id = id;
        this.nombre = nombre
        this.lugar = lugar
        this.precio = precio * 1.15
        this.capacidad = capacidad ?? 50
        this.fecha = fecha ?? Date.now()
    }
}

class TicketManager {
    static idEvento = 0;
    #eventos = [];

    getEventos() {
        return this.#eventos;
    }

    agregarEvento(data) {
        const evento = new Evento(TicketManager.idEvento, data);
        this.#eventos.push(evento);
    }

    agregarUsuario(idEvento, idUsuario){
        const evento = this.#eventos.find(e=>e.id === idEvento)
        if(evento){
            evento.participantes.push(idUsuario);
        }
    }
}

const ticketManager = new TicketManager();
ticketManager.agregarEvento({
    nombre: 'Cumple 20',
    lugar: 'Pellegrini 321',
    precio: 1000,
    capacidad: 20
});
ticketManager.agregarUsuario(0, 1)

console.log(ticketManager.getEventos());

