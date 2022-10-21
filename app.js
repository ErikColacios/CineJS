const bbdd = require("./connection.js")
const express = require("express")
const app = express()
const {peliculas} = require("./pelis.js")
const cors = require("cors")

// Middleware
app.use(cors(), express.json())

// Conectar bbdd
bbdd.connect()

// http://localhost:3000/


// GET
app.get("/",(req,res)=> {
    res.send(JSON.stringify("Bienvenido a la api de peliculas!"))
})

app.get("/pelis",(req,res)=> {
    bbdd.query("select * from peliculas ORDER BY id ASC", (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    bbdd.end;
})

app.get("/pelis/:id",(req,res)=> {
    const id = req.params.id
    bbdd.query("select * from peliculas WHERE id="+ id, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    bbdd.end;
})

app.get("/pelis/:genero", (req,res)=> {
    const genero = req.params.genero;

    bbdd.query(`select * from peliculas where genero='${genero}' `, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
        else {
            console.log(err.message)
        }
    })
    bbdd.end;
    // const resultados = peliculas.filter(peli => peli.genero === genero);
    // if(resultados.length === 0){
    //     res.status(404).send(`No existe el genero ${genero}, vuelve a intentarlo...`)
    // }
    // res.send(resultados);
})

app.get("/pelis/:genero/:titulo", (req,res)=> {        
    const genero = req.params.genero
    const titulo = req.params.titulo
    const resultados = peliculas.filter(peli => peli.genero === genero && peli.titulo === titulo)

    if(resultados.length === 0) {
        return res.status(404).send(`No se han encontrado peliculas con el nombre ${titulo} y el genero ${genero}`);
    }
    res.send(resultados);
})




// POST
app.post("/pelis", (req,res)=> {
    const peliNueva = req.body;

    let insertQuery = `insert into peliculas (titulo, año, genero, imagen) values ('${peliNueva.titulo}', ${peliNueva.año}, '${peliNueva.genero}', '${peliNueva.imagen}')`

    bbdd.query(insertQuery, (err,result)=> {
        if(!peliNueva){
            return res.status(400).send({status : "failed"})
        }
            res.send("Pelicula añadida correctamente!")

    })
    bbdd.end;
})



// DELETE 
app.delete("/pelis/:id", (req,res)=> {
    const id= req.params.id;

    let deleteQuery = `delete from peliculas where id=${id}`;

    bbdd.query(deleteQuery, (err,result)=> {
        if(!err) {
            res.send("Pelicula eliminada.")
        }
        else {
            console.log(err.message)
        }
    })
    bbdd.end;
})


const PUERTO = process.env.PORT || 3000;


// Encender servidor
app.listen(PUERTO, ()=> {
    console.log(`La api esta escuchando por el puerto ${PUERTO} y en el enlace http://localhost:${PUERTO}/`)
})