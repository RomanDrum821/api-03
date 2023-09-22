//
const express = require("express"); //Crear servidores HTTP - Apache, etc
const app = express();
const puerto = process.env.PORT || 3000;
//Habilitamos que el servidor acepte las solicitudes
app.use(express.json());

//Arreglo de objetos de categorias
let categorias = [
  { id: 1, nombre: "Cocina", descripción: "Elementos para cocinar" },
  { id: 2, nombre: "Limpieza", descripción: "Elementos para limpieza" },
  { id: 3, nombre: "Electrónica", descripción: "Elementos de electrónica" },
  { id: 4, nombre: "Ropa bebe", descripción: "Elementos para bebe" },
  { id: 5, nombre: "Linea blanca", descripción: "Elementos de linea blanca" },
  { id: 6, nombre: "Jardinería", descripción: "Elementos para jardinería" },
  { id: 7, nombre: "Salud", descripción: "Elementos para la salud" },
  { id: 8, nombre: "Muebles", descripción: "Elementos para la sala y demas" },
  { id: 9, nombre: "Lácteos", descripción: "Elementos para beber" },
  { id: 10, nombre: "Licores", descripción: "Elementos para fiestas" },
];

//-----------------------------------------------------------------

app.get("/socios/v1/categorias", (req, res) => {
  //1. Verificarsi existen categorias
  if (categorias) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existen categorias",
      categorias: categorias,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No existen categorias",
      categorias: categorias,
    });
  }
  //2. Mostrarlas con un estado y mensaje
  //3. Si no existen mostrar estado y mensaje
  //En formato JSon
  //Mostrar mensaje de estado del servidor
  //Todas las categorias
  res.json("Mostrar todas las categorias");
});

//-----------------------------------------------------------------

app.get("/socios/v1/categorias/:id", (req, res) => {
  const id = req.params.id;
  //Obtenemos la categoria basada en el id
  const categoria = categorias.find((categoria) => categoria.id == id);

  if (categoria) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existe la categoria",
      categoria: categoria,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No se encontro la categoria",
      categoria: categoria,
    });
  }
  //Solo una categoria
  res.json("Mostrar una categoria por su id");
});

//-----------------------------------------------------------------

app.post("/socios/v1/categorias", (req, res) => {
  //Crear un recurso - crear una categoria
  //Requerimos
  //id = generar un numero aleatorio
  //nombre y descripcion = Body
  const { nombre, descripción } = req.body;
  const id = Math.round(Math.random() * 1000);
  //Comprobar que el cliente = usuario = programador si envie
  if (!nombre || !descripción) {
    res.status(400).json({
      estado: 0,
      mensaje: "Bad request - Faltan parametros en la solicitud",
    });
  } else {
    const categoria = { id: id, nombre: nombre, descripción: descripción };
    const longitudInicial = categorias.length;
    categorias.push(categoria);
    if (categorias.length > longitudInicial) {
      //Todo ok de parte del cliente y servidor
      res.status(201).json({
        estado: 1,
        mensaje: "Categoria creada",
        categoria: categoria,
      });
    } else {
      //Error del servidor
      res.status(500).json({
        estado: 0,
        mensaje: "La categoria no se pudo crear",
      });
    }
  }
  res.json("Crear una categoria");
});

//-----------------------------------------------------------------

app.put("/socios/v1/categorias/:id", (req, res) => {
  //id viene ?= params
  //nombre y descripcion ?= body
  const { id } = req.params;
  const { nombre, descripción } = req.body;
  if (!nombre || !descripción) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan parametros en la solicitud",
    });
  } else {
    const posActualizar = categorias.findIndex(
      (categoria) => categoria.id == id
    );
    if (posActualizar != -1) {
      //si encontro la categoria
      //Actualizar la categoria
      categorias[posActualizar].nombre = nombre;
      categorias[posActualizar].descripción = descripción;
      res.status(200).json({
        estado: 1,
        mensaje: "Categoria actualizada correctamente",
        categoria: categorias[posActualizar],
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Categoria no encontrada",
      });
    }
  }
  res.json("Actualizar una categoria por su id");
});

//-----------------------------------------------------------------

app.delete("/socios/v1/categorias/:id", (req, res) => {
  //Eliminar un recurso del servidor - Eliminar una categoria
  const { id } = req.params;
  const indiceEliminar = categorias.findIndex(
    (categoria) => categoria.id == id
  );
  if (indiceEliminar != -1) {
    //Borrar la categoria
    categorias.splice(indiceEliminar, 1);
    res.status(201).json({
      estado: 1,
      mensaje: "Categoria Eliminada",
    });
  } else {
    //Categoria no encontrada
    res.status(404).json({
      estado: 0,
      mensaje: "Categoria no encontrada",
    });
  }
  res.json("Eliminar una categoria por su id");
});

app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto: ", puerto);
});
