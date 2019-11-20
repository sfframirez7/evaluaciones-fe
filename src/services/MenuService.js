import { JwtPayload } from '../config/config'

export const LoadOpcionesDeMenuService = () => {

    var data = JwtPayload().menu
    return data
}