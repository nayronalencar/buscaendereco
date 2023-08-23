document.querySelector('form').addEventListener("submit", async (event) => {
    event.preventDefault();
    let input = document.querySelector('#search').value;
    let regex = /^\d+$/;
    //console.log(regex.test(input));
    

    if (input !== '' && regex.test(input) === true) {
        cleanInfo();
        showWarning('Carregando...');
        let url = `https://viacep.com.br/ws/${input}/json/`;
        let results = await fetch(url);
        let json = await results.json();
        let status = results.status;
        console.log(json);
        

        if (json.cep === '') {
            showWarning('Dado inválido...');
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


    } else {
        cleanInfo();
        showWarning('Digite um CEP válido sem hífen, apenas números.');
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