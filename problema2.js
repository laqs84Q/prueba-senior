var segmentarTelemetria = function(telemetria, firmasCuanticas) {
    const diccionario = new Set(firmasCuanticas);
    const memo = new Map();

    function dfs(s) {
        if (memo.has(s)) return memo.get(s);
        const resultado = [];

        if (diccionario.has(s)) resultado.push(s);

        for (let i = 1; i < s.length; i++) {
            const prefijo = s.slice(0, i);
            const sufijo = s.slice(i);

            if (diccionario.has(prefijo)) {
                const segmentaciones = dfs(sufijo);
                for (const seg of segmentaciones) {
                    resultado.push(prefijo + ' ' + seg);
                }
            }
        }

        memo.set(s, resultado);
        return resultado;
    }

    return dfs(telemetria);
};
