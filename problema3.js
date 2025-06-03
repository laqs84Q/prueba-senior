var encontrarMinimo = function(valores) {
    let izquierda = 0;
    let derecha = valores.length - 1;

    while (izquierda < derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);

        if (valores[medio] > valores[derecha]) {
            izquierda = medio + 1;
        } else if (valores[medio] < valores[derecha]) {
            derecha = medio;
        } else {
            // valores[medio] === valores[derecha], reducir rango
            derecha--;
        }
    }

    return valores[izquierda];
};
