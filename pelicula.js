    
    // MOSTRAR DATOS PELICULA
    const id = localStorage.getItem("id")
    console.log(id)

        fetch("http://localhost:3000/pelis/" + id)
        .then(response => {return response.json()})
        .then(data => {
            console.log(data)
            data.forEach(item => {
                document.querySelector("#tituloDatosPeli").insertAdjacentHTML("beforeend", `<h2>`+item.titulo+ `</h2>`);
                document.querySelector("#añoDatosPeli").insertAdjacentHTML("beforeend", item.año);
                document.querySelector("#generoDatosPeli").insertAdjacentHTML("beforeend", item.genero);
                document.querySelector("#descripcionDatosPeli").insertAdjacentHTML("beforeend", item.descripcion);
                document.querySelector("#imgDatosPeli").insertAdjacentHTML("beforeend", `<img src='../imgs/`+item.imagen+`' class='img-fluid'>`);
    
            })
        })
        .catch(error => console.log(error))
    