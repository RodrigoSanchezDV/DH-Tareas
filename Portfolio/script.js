console.log("script conectado");

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

canvas.width = document.body.offsetWidth;

const w = canvas.width;
const h = canvas.height;

ctx.fillStyle = "#212121";
ctx.fillRect(0,0,w,h);

const cols = Math.floor(w / 20) + 1;
const posicion_y = Array(cols).fill(0);

function matrix (){
    ctx.fillStyle = "#151714";
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = "#EB47A0"
    ctx.font = "15pt monospace"

    posicion_y.forEach((y,ind)=>{
        const text = String.fromCharCode(Math.random() * 128)

        const x = ind * 20;
        ctx.fillText(text,x,y);

        if(y > 200 + Math.random() * 1000){
            posicion_y[ind] = 0
        }else{
            posicion_y[ind] = y + 20;
        }

    })
}
setInterval(matrix,60);

const canvas2 = document.querySelector("#lienzo2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = document.body.offsetWidth;

const w2 = canvas.width;
const h2 = canvas.height;

ctx2.fillStyle = "#212121";
ctx2.fillRect(0,0,w2,h2);

const cols2 = Math.floor(w2 / 20) + 1;
const posicion_y2 = Array(cols2).fill(0);

function matrix2 (){
    ctx2.fillStyle = "#151714";
    ctx2.fillRect(0,0,w2,h2);

    ctx2.fillStyle = "#551A8B"
    ctx2.font = "15pt monospace"

    posicion_y2.forEach((y,ind)=>{
        const text2 = String.fromCharCode(Math.random() * 128)

        const x2 = ind * 20;
        ctx2.fillText(text2,x2,y);

        if(y > 200 + Math.random() * 1000){
            posicion_y2[ind] = 0
        }else{
            posicion_y2[ind] = y + 20;
        }

    })
}
setInterval(matrix2,60);

class TextScramble {
    constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
    }
    setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
    }
    update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
        complete++
        output += to
        } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
        } else {
        output += from
        }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
        this.resolve()
    } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
    }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

const phrases = [
    'Rodrigo Sanchez',
    'Developer',
    'Full Stack',
    'React',
    'Java Script',
    "Rodrigo",
    "Sanchez"
]

const phrases2 = [
    'Proyectos',
    'Resultados',
    'Experiencia',
    'experience',
    'Proyects'
]

const phrases3 = [
    'Contacto',
    'Redes',
    'Email',
    'GitHub',
    'Linkedin'
]

const el = document.querySelector('.titleName')
const fx = new TextScramble(el)

const el2 =document.querySelector('.proyectsTitle')
const fx2 = new TextScramble(el2)

const el3 =document.querySelector('.contacto')
const fx3 = new TextScramble(el3)

let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length

    fx2.setText(phrases2[counter]).then(() => {
        setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases2.length

    fx3.setText(phrases3[counter]).then(() => {
        setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases3.length


}

next()


