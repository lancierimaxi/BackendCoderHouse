const objeto1 ={
    nombre:"Maxi",
    edad: 23,
    colorFav:"negro",
};

const objeto2 = {
    nombre: "Fran",
    edad: 24,
};

//Spread Operator
const objeto3 = {...objeto1, ...objeto2};

console.log(objeto3);


//Actividad
const objetos =  [
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2

	},

	{
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }
]

const productos =[];

objetos.forEach (objeto  =>{
    const keys = Object.keys(objeto);

    keys.forEach((key)=>{
        if (!productos.includes(key)){
            productos.push(key);
        }
    });
});

console.log(productos);

let totalVendidos = 0;
objetos.forEach(objeto=>{
    let keyValues = Object.entries(objeto);

    keyValues.forEach(prod=>{
        if (productos.includes(prod[0])){
            totalVendidos += prod[1];
        }
    })
})

console.log(totalVendidos);

