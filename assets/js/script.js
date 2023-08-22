document.querySelector('form').addEventListener("submit", async (event) => {
    event.preventDefault();
    let input = document.querySelector('#search').value;

    if (input !== '') {
        let url = `https://viacep.com.br/ws/${input}/json/`;

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);


    } else {
        console.log('dado invalido');
    }





});