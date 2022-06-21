function wait(time, error) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (error)
                return reject("FAILED")
            resolve("DONE")
        }, time);
    });
}
wait(1500).then(text => {
    console.log(text);
    return wait(4500);
}).then(text => {
    console.log(text)
    return wait(1500, true);
}).then(text => {
    console.log(text);
}).catch(e => {
    console.log(e)
})

async function waitOnThings() {
    const d1 = await wait(1500);
    const d2 = await wait(1500);
    const d3 = await wait(1500);
    console.log(d1, d2, d3);
}

waitOnThings();
const BASE_URL = "https://pokeapi.co/api/v2";
fetch(`${BASE_URL}/pokemon/ditto`).then((response) => {
    if (!response.ok)
        throw "ERROR";
    return response.json()
}).then(data => {
    console.log(data.name)
})

async function getDitto() {
    const response = await fetch(`${BASE_URL}/pokemon/ditto`);
    if (!response.ok)
        throw "ERROR";
    const data = await response.json();
    console.log(data.name);
}
getDitto()

async function getPokemon(list = ["ditto", "squirtle", "grotle", "houndour"]) {
    const response0 = await fetch(`${BASE_URL}/pokemon/${list[0]}`)
    const response1 = await fetch(`${BASE_URL}/pokemon/${list[1]}`)
    const response2 = await fetch(`${BASE_URL}/pokemon/${list[2]}`)
    const response3 = await fetch(`${BASE_URL}/pokemon/${list[3]}`)

    const data0 = await response0.json();
    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    console.log(data0, data1, data2, data3);
}
getPokemon()

async function getPokemonAtOnce(list = ["ditto", "squirtle", "grotle", "houndour"]) {
    const responses = await Promise.all([
        fetch(`${BASE_URL}/pokemon/${list[0]}`),
        fetch(`${BASE_URL}/pokemon/${list[1]}`),
        fetch(`${BASE_URL}/pokemon/${list[2]}`),
        fetch(`${BASE_URL}/pokemon/${list[3]}`),
    ]);
    const dataSet = await Promise.all(responses.map(r=>r.json()));
    console.log(dataSet);
    dataSet.forEach(p=>{
        document.body.innerHTML += `<img src="${p.sprites.front_default}"/>`+p.name + "</br>";
        
    })
    //const data0 = await response0.json();
    //const data1 = await response1.json();
    //const data2 = await response2.json();
    //const data3 = await response3.json();
    //console.log(data0, data1, data2, data3);
}
getPokemonAtOnce();
// Weather API
const API_KEY = "e2c2f01a9184c7efcec6757e51818436";
const API_URL = `http://api.openweathermap.org/data/2.5`

async function getForcast(city="memphis"){
    const response = await fetch(`${API_URL}/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
}
getForcast();
///forecast?q={city name}&appid={API key}`