function EsNavegadorCompatibleService() {

    var esEdge = false

    try {
        esEdge = navigator.appVersion.indexOf('Edge') > -1

        if (esEdge) {
            return false
        } else {
            return true
        }
        
    } catch (error) {
        return true
    }



  

}


export default EsNavegadorCompatibleService