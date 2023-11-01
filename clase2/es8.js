const objeto = {
    nombre: "Alberto",
    edad: 23,
    colorFav: "azul",
};

const numeros = [2, 32, 43, 233,422]

const total = numeros.reduce (
    (valorPrevio, valorAcumulado)=> valorPrevio + valorAcumulado
    )
console.log(total);

console.log(Object.keys(objeto));
console.log(Object.values(objeto));
console.log(Object.entries(objeto));