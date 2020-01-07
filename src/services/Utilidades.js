import { axios } from "../config/config";

export const RegistrarEventoDelSistema = (evento) => {

    var nuevoEvento = {
        "Evento": evento
    }

    axios.post("/RegistrarEventoDelSistema", nuevoEvento)
        .then(res => {

        }).catch((error) => {
            console.log(error)

        })

}


