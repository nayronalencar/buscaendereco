document.querySelector('form').addEventListener("submit", async (event) => {
    event.preventDefault();
    let input = document.querySelector('#search').value;
    let regex = /^\d+$/;
    //console.log(input.length);


    if (input !== '' && regex.test(input) === true && input.length === 8) {
        cleanInfo();
        showWarning('Carregando...');
        let url = `https://viacep.com.br/ws/${input}/json/`;
        let results = await fetch(url);
        let json = await results.json();
        let status = results.status;
        console.log(json);
        console.log(status);


        if (status !== 200) {
            showWarning('Dado inválido...');
        } else {
            if (json.erro === 'true' || json.erro === true) {
                showWarning('Dados não encontrados...');
            } else {
                showWarning('');
                showInfo({
                    uf: json.uf,
                    logradouro: json.logradouro,
                    bairro: json.bairro,
                    localidade: json.localidade,
                    cep: json.cep
                });
            }

        }


    } else {
        cleanInfo();
        showWarning('Digite um CEP válido sem hífen, apenas números, 8 dígitos no total.');
    }



});

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg;
}

function showInfo(obj) {

    document.querySelector('.uf').innerHTML = obj.uf;
    document.querySelector('.logradouro').innerHTML = obj.logradouro;
    document.querySelector('.bairro').innerHTML = obj.bairro;
    document.querySelector('.localidade').innerHTML = obj.localidade;
    document.querySelector('.cep').innerHTML = obj.cep;
    document.querySelector('.result').style.display = 'block';
}

function cleanInfo() {
    showWarning('');
    document.querySelector('.result').style.display = 'none';
}