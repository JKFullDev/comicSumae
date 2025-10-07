const API = "http://localhost:3000/comics";
const lista = document.querySelector("#comics-container");
const formulario = document.querySelector("#form-comic");

let modoEdicion = false;


const crearComic = (comic) => {
    const li = document.createElement("li");
    li.id = "comic-card"
    li.innerHTML = `
        <h2>${comic.titulo}</h2>
        <h3>${comic.editorial}</h3>
        <img src="${comic.cover}" alt="${comic.editorial} - ${comic.titulo}">
        <p>${comic.year}</p>
    `;
    //Creamos boton de editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar comic";
    editBtn.id = "editBtn";
    li.appendChild(editBtn);
    editBtn.addEventListener("click", () => {
        modoEdicion = true;
        document.querySelector("#submitBtn").textContent = "Editar comic";
        //Pintamos los datos del comic existente en el formulario
        document.querySelector("#titulo").value = comic.titulo;
        document.querySelector("#editorial").value = comic.editorial;
        document.querySelector("#portada").value = comic.cover;
        document.querySelector("#año").value = comic.year;
        document.querySelector("#id").value = comic.id;
    });

  //Añadimos el botón y la función de borrar tanto de la web como de la API
    const deleteBtn = document.createElement("button");
    deleteBtn.id ="deleteBtn";
    deleteBtn.textContent = "Borrar comic";
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", async () => {
        await fetch(`${API}/${comic.id}`, {
            method: "DELETE"
        });

        consultarComics();
    });
    return li;
}

//GET
const consultarComics = async () => {
    //COlocamos un loading
    lista.innerHTML = "Cargando...";
    //Atacamos a nuestra API
    const res = await fetch(API);
    const data = await res.json();
    //Vaciamos la lista
    lista.innerHTML = "";
    data.forEach((comic) => lista.appendChild(crearComic(comic)));
}

//POST
formulario.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    if (!modoEdicion) {
        //Creamos el nuevo objeto comic
        const crearComic = {
            "id": crypto.randomUUID(),
            "titulo": document.querySelector("#titulo").value,
            "editorial": document.querySelector("#editorial").value,
            "year": document.querySelector("#año").value,
            "cover": document.querySelector("#portada").value,
        };
        //Lo maandamos a la base de datos mediante fetch
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(crearComic)
        });
    } else {
        //Recuperamos el id
        const inputID = document.querySelector("#id").value;;
        //Editamos el comic seleccionado
        const crearComic = {
            "id": document.querySelector("#id").value,
            "titulo": document.querySelector("#titulo").value,
            "editorial": document.querySelector("#editorial").value,
            "year": document.querySelector("#año").value,
            "cover": document.querySelector("#portada").value,
        };
        await fetch(`${API}/${inputID}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(crearComic),
        });
        modoEdicion = false;
    }
    //Reiniciamos el formulario
    formulario.reset();
    //Repintamos los Comics para poder ver los cambios a tiempo real
    await consultarComics();
});



document.addEventListener("DOMContentLoaded", consultarComics);