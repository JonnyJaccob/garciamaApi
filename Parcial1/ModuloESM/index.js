//adventurer_races
let razasAventureros = [
    "Nuevos Seres Humanos",
    "Gente de los escombros",
    "Barbaro",
    "Nuevos Barbaros",
    "Intelectual"
]
/**
 * Obtiene la raza de un aventurero basada en el índice proporcionado.
 * @param {number} indice - El índice que representa la posición de la raza en el array.
 * @returns {string} La raza de aventurero correspondiente al índice.
 * @throws {Error} Si el índice no es un valor entero.
 */
export function GetRazaAventurero(indice) {
    // Asegúrate de que el índice sea un valor entero
    if (Number.isInteger(indice)) {
        if (indice >= 0 && indice < razasAventureros.length) {
            return razasAventureros[indice];
        } else {
            throw new Error("El índice debe estar entre 0 y " + (razasAventureros.length - 1) + ".");
        }
    } else {
        throw new Error("El índice debe ser un valor entero.");
    }
}

//console.log(module);

//Es un modulo CommunJs
//module.exports.GetRazaAventurero = GetRazaAventurero;