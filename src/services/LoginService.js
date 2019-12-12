export const CerrarSesionService = () => {

    localStorage.removeItem("usr_token")
    localStorage.removeItem("opciones_menu")
    localStorage.clear()
    window.location.href = "/";

}