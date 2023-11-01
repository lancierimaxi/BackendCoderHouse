const numeros = [2,3,4,5,6];
console.log(numeros);

//Exponencial
const numerosNuevos = numeros.map((numero)=> numero ** 3);
console.log(numerosNuevos);

//Includes
const nombres = ["Matias", "Cintia", "Maria", "Enzo"];

const nombre = "Matias";

if (nombres.includes(nombre)) {
    console.log(`${nombre} esta presente`);
} else {
    console.log(`${nombre} no esta presente`);
}
