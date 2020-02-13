TGFCAB.forEach(value => {
    let info = `<tr>
        <td>${value.NUNOTA}</td>
        <td>${value.CODEMP}</td>
        <td>${value.CODVEND}</td>
        <td>${value.VLRNOTA}</td>
    </tr>`;

    document.getElementById('TGFCAB').innerHTML += info;
});

TGFITE.forEach(value => {
    let info = `<tr>
        <td>${value.NUNOTA}</td>
        <td>${value.SEQUENCIA}</td>
        <td>${value.CODPROD}</td>
    </tr>`;

    document.getElementById('TGFITE').innerHTML += info;
});

TGFPRO.forEach(value => {
    let info = `<tr>
                    <td>${value.CODPROD}</td>
                    <td>${value.DESCRPROD}</td>
                </tr>`;

    document.getElementById('TGFPRO').innerHTML += info;
});