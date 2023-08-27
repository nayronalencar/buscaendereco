document.querySelector('form').addEventListener("submit", async (event) => {
    event.preventDefault();
    let input = document.querySelector('#search').value;
    let trimInput = input.trim();
    //console.log(input.trim());
    let regex = /^\d+$/;
    //console.log(input.length);


    if (trimInput !== '' && regex.test(trimInput) === true && trimInput.length === 8) {
        cleanInfo();
        //showWarning('Carregando...');
        loading('block');
        let url = `https://viacep.com.br/ws/${trimInput}/json/`;
        let results = await fetch(url);
        let json = await results.json();
        let status = results.status;
        console.log(json);
        console.log(status);


        if (status !== 200) {
            showWarning('Dado inválido...');
        } else {
            if (json.erro === 'true' || json.erro === true) {
                loading('none');
                showWarning('Dados não encontrados...');
            } else {
                //showWarning('');
                loading('none');
                showInfo({
                    uf: json.uf,
                    logradouro: json.logradouro,
                    bairro: json.bairro,
                    localidade: json.localidade,
                    cep: json.cep,
                    ddd: json.ddd
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
    document.querySelector('.logradouro').innerHTML = obj.logradouro;
    document.querySelector('.bairro').innerHTML = `Bairro: ${obj.bairro}`;
    document.querySelector('.localidade').innerHTML = `Cidade: ${obj.localidade}/${obj.uf}`;
    document.querySelector('.cep').innerHTML = obj.cep;
    document.querySelector('.ddd').innerHTML = `DDD: ${obj.ddd}`;
    document.querySelector('.result').style.display = 'block';
}

function cleanInfo() {
    showWarning('');
    document.querySelector('.result').style.display = 'none';
}

function loading(display) {
    let loading = document.querySelector('.loading');
    loading.style.display = display;
}