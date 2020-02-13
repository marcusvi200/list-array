// Link TGFITE with TGFPRO
let lkTGFITE_TGFPRO = TGFITE.bond(TGFPRO, (list1, list2) => {
    return list1.value.CODPROD == list2.value.CODPROD;
});

// Link TGFCAB with TGFITE_TGFPRO
let lkTGFCAB_TGFITE_TGFPRO = TGFCAB.bond(lkTGFITE_TGFPRO, (list1, list2) => {
    return list1.value.NUNOTA == list2.value.TGFITE.value.NUNOTA;
});

lkTGFCAB_TGFITE_TGFPRO.forEach(elTGFCAB => {
    // Obtain TGFCAB value
    let vTGFCAB = elTGFCAB.TGFCAB.value;

    elTGFCAB.TGFITE_TGFPRO.forEach((elTGFITE_TGFPRO) => {

        // Obtain the values of the connection between TGFITE and TGFPRO
        let vTGFITE_TGFPRO = elTGFITE_TGFPRO.value;

        // Obtain TGFITE value
        let vTGFITE = vTGFITE_TGFPRO.TGFITE.value;

        vTGFITE_TGFPRO.TGFPRO.forEach((elTGFPRO) => {

            // Obtain TGFPRO values
            let vTGFPRO = elTGFPRO.value;

            let info = `<tr>
                            <td>${vTGFCAB.NUNOTA}</td>
                            <td>${vTGFCAB.CODEMP}</td>
                            <td>${vTGFCAB.CODVEND}</td>
                            <td>${vTGFCAB.VLRNOTA}</td>
                            <td>${vTGFITE.SEQUENCIA}</td>
                            <td>${vTGFITE.CODPROD}</td>
                            <td>${vTGFPRO.DESCRPROD}</td>
                        </tr>`;

            document.getElementById('TGFCAB_TGFITE_TGFPRO').innerHTML += info;
        })


    });

});

document.getElementById('runtime1form').innerHTML = lkTGFCAB_TGFITE_TGFPRO.runtime;