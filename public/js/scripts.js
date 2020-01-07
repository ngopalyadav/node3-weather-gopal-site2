const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const printMsg1 = document.querySelector('#printMsg1')
const printMsg2 = document.querySelector('#printMsg2')

weatherForm.addEventListener('submit', (e) => {

    printMsg1.textContent = 'Loading...'
    printMsg2.textContent = ''
    
    e.preventDefault()
    
    const searchQString =  'http://localhost:3000/weather?search='+search.value
    fetch(searchQString).then((response) => {
    response.json().then((data) => {

        if(!data.error){
            printMsg1.textContent = data.temperature 
            printMsg2.textContent = data.rainChance
        }else{
            printMsg1.textContent = data.error
        }

    })
})
})



 // for(var prop in data){
        //     printMsg1.innerHTML += data[prop] + '<br />'
        // }
        // msg.innerHTML += '<br />'