const usuariosFicticios = [
    { id: 1, nombre: "Admin1", email: "admin1@example.com", password: "123456", role: "admin" },
    { id: 2, nombre: "Publicador1", email: "publicador1@example.com", password: "123456", role: "publicador" },
    { id: 3, nombre: "Publicador2", email: "publicador2@example.com", password: "123456", role: "publicador" },
    { id: 4, nombre: "Admin2", email: "admin2@example.com", password: "123456", role: "admin" },
];

// Guardar en localStorage si no existen
if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuariosFicticios));
}

export default usuariosFicticios;
