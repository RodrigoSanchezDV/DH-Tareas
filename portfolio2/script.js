const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

canvas.width = document.body.offsetWidth;

const w = canvas.width;
const h = canvas.height;

ctx.fillStyle = "#0000";
ctx.fillRect(0,0,w,h);

const cols = Math.floor(w / 20) + 1;
const posicion_y = Array(cols).fill(0);

function matrix (){
    ctx.fillStyle = "#060606";
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = "#551A8B"
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
    "Rodrigo",
    "Sanchez"
]

/* const phrases2 = [
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
] */

const el = document.querySelector('.name')
const fx = new TextScramble(el)

/* const el2 =document.querySelector('.proyectsTitle')
const fx2 = new TextScramble(el2)

const el3 =document.querySelector('.contacto')
const fx3 = new TextScramble(el3)
 */
let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2000)
    })
    counter = (counter + 1) % phrases.length

/*     fx2.setText(phrases2[counter]).then(() => {
        setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases2.length */

/*     fx3.setText(phrases3[counter]).then(() => {
        setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases3.length */


}

next()