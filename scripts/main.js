const num1 = document.querySelector('#num1').value;
const num2 = document.querySelector('#num2').value;

const btn = document.querySelector('button');
const p = docuemnt.querySelector('p')

btn.addEventListener('click', function(){
    const suma = parseInt('num1') + parseInt('num2');
    p.innerHTML = `Suma wynosi: <b> ${suma} </b>`;
})