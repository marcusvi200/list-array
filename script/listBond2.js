TGFCAB.forEach(element => {

    // Obtain TGFCAB values
    let vTGFCAB = element;

    TGFITE.find((elTGFITE) => {

        if (vTGFCAB.NUNOTA == elTGFITE.NUNOTA) {

            TGFPRO.find((elTGFPRO) => {

                if (elTGFPRO.CODPROD == elTGFITE.CODPROD) {

                    let info = `<tr>
                            <td>${vTGFCAB.NUNOTA}</td>
                            <td>${vTGFCAB.CODEMP}</td>
                            <td>${vTGFCAB.CODVEND}</td>
                            <td>${vTGFCAB.VLRNOTA}</td>
                            <td>${elTGFITE.SEQUENCIA}</td>
                            <td>${elTGFITE.CODPROD}</td>
                            <td>${elTGFPRO.DESCRPROD}</td>
                        </tr>`;

                    document.getElementById('TGFCAB_TGFITE_TGFPRO_2').innerHTML += info;
                }

            });
        }
    });

});

document.getElementById('runtime2form').innerHTML = TGFCAB.runtime;