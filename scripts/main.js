const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');

const btn = document.querySelector('button');
const p = docuemnt.querySelector('p');

btn.addEventListener('click', function(){
    const suma = parseInt('num1.value') + parseInt('num2.value');
    p.innerHTML = `Suma wynosi: <b> ${suma} </b>`;
})