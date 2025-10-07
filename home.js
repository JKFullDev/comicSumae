const barraBusqueda = document.querySelector("#buscar");
const main = document.querySelector("main")

barraBusqueda.addEventListener("click", () => {
    const cuadroBusqueda = document.createElement("div");
    cuadroBusqueda.id = "cuadroBusqueda";
    cuadroBusqueda.innerHTML = `
    <div  id="barraBusqueda"> 
        <input type="text" placeholder="Busca">
        <button onclick="location.href = './home.html'">X</button>
    </div>
    <ul>
        <li>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png" alt="avatar" onclick="location.href = './avatarBiblioteca.html'">
            <h3>User 1</h3>
        </li>
        <li>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png" alt="avatar">
            <h3>User 2</h3>
        </li>
        <li>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png" alt="avatar">
            <h3>User 3</h3>
        </li>
    </ul>
    `;

    main.innerHTML = ``;
    main.appendChild(cuadroBusqueda)
});