export const IsNumber = (valor)=> {

    try {
        
        var numero = parseInt(valor)
        if(isNaN(numero))
        {
            return false
        }

        return true
    } catch (error) {
        return false
    }

}