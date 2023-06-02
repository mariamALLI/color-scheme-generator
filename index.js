const colorForm = document.getElementById("color_form")
const colorBtn = document.getElementById('color_btn')
const colorDisplayContainer = document.getElementById('color_display_container')
const colorTxt = document.querySelector('.color-txt')

/*input value for color*/ 
const colorPicker = document.querySelector('#color_picker')
let getColorValue = colorPicker.value
// console.log(getColorValue)
/*select value for mode*/ 
const colorMode = document.querySelector('#color_mode')
let getColorSelection = colorMode.value
// console.log(getColorSelection)

let colorArr = []

colorPicker.addEventListener('change', (event)=>{
    getColorValue = event.target.value 
})

colorMode.addEventListener('change', (event)=>{
    getColorSelection = event.target.value
})


let getColorScheme = ()=>{

    const url = `https://www.thecolorapi.com/scheme?hex=${getColorValue.replace('#','')}&mode=${getColorSelection}&format=json&count=6`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        renderColorHtml(data)
        console.log(data)}
    )}

function renderColorHtml(data){
    data.colors.forEach(color => colorArr.unshift(color.hex.value))
    
        let colorHtml = colorArr.map((color)=>{
            return `
                <div class="color_box">
                    <div id="color-box" class="color-box" style="background-color:${color}"></div>
                    <p class="color-txt" onclick="colorTxtCopy()" style="color:${color}">${color}</p>
                </div>
                `
                
            }).join(' ')
            colorDisplayContainer.innerHTML = colorHtml
            colorArr = []
}
getColorScheme()

colorForm.addEventListener('submit', (e)=>{
    e.preventDefault()
   getColorScheme()
})


function colorTxtCopy(){
    console.log('click')
    console.log(getColorValue)
}
