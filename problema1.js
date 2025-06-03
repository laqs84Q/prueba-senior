var calcularCreditos = function(coherencias) {
    const n = coherencias.length;
    const creditos = new Array(n).fill(1);

    // Izquierda a derecha
    for (let i = 1; i < n; i++) {
        if (coherencias[i] > coherencias[i - 1]) {
            creditos[i] = creditos[i - 1] + 1;
        }
    }

    // Derecha a izquierda
    for (let i = n - 2; i >= 0; i--) {
        if (coherencias[i] > coherencias[i + 1]) {
            creditos[i] = Math.max(creditos[i], creditos[i + 1] + 1);
        }
    }

    return creditos.reduce((a, b) => a + b, 0);
};
