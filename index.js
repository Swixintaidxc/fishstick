import { HTMLS_Element } from './OS2x/HTMLS/main.js';
import * as OS2x from './OS2x/OS2x.js'
import * as OS2Fish from './fish3.js'

// keyboard


let inputStream = "";
let cursor = 0;


const store = {}

const styleSettings = {
    terminalFontMarginLeft: "10px",
    terminalFontMarginV: "3px"
}


function stSet(name, value) {
    store[name] = value;
}

function stGet(name) {
    return store[name]
}

function stFree(name) {
    delete store[name]
}

function stSF(name, value) {
    stSet(name, value)
    stFree(name)
}


document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Backspace":
            if (cursor > 0) {
                inputStream = inputStream.slice(0, cursor-1) + inputStream.slice(cursor)
                cursor--
            }
            break;

        case "ArrowLeft":
            if (cursor > 0) {
                cursor--
            }
            break;

        case "ArrowRight":
            if (cursor < inputStream.length) {
                cursor++
            }
            break;

        default:
            if (e.key.length === 1) {
                inputStream = inputStream.slice(0, cursor) + e.key + inputStream.slice(cursor)
                cursor++
                break;
            }
    }
})


// variables

const scale = Math.min(window.innerWidth / 1095, window.innerHeight / 730)

const glassmorphism = { backgroundColor: "rgba(67, 67, 67, 0.2)", borderRadius: "30px", backdropFilter: "blur(15px)" }

const FPS = 60
const A = Math.round((1 / FPS) / 0.001) * 0.001;

//functions


// end functions

OS2x.Graphics.HTMLS.HTMLS_setDefaultStyles({ fontFamily: "Cascadia Mono" })

// OS2x.Graphics.HTMLS.setStyle(document.body, { backgroundImage: "url(b2bf187c-ceba-4640-8be8-4824d2406948.png)", backgroundSize: "cover" })

async function bios() {

    OS2x.Graphics.HTMLS.setStyle(document.body, { backgroundColor: "black" })

    stSet("terminal_textStyle", {color: "white", marginTop: styleSettings.terminalFontMarginV, marginLeft: styleSettings.terminalFontMarginLeft, marginBottom: styleSettings.terminalFontMarginV})

    // binding keypresses
    stSet("terminal_whenEnter", (e) => {
        if (e.key === "Enter") {
            stFree("terminal_CInput");
            stSet("terminal_CInput", new HTMLS_Element("p", null, null, { color: "white", marginTop: styleSettings.terminalFontMarginV, marginLeft: styleSettings.terminalFontMarginLeft, marginBottom: styleSettings.terminalFontMarginV }, null, "gilbert"))
        }
    })

    stSet("terminal_whenKeydown", () => {
        stGet("terminal_CInput").element.textContent = `${inputStream}`
    })

    // bios startup code

    stSF("terminal_CInput", new HTMLS_Element("p", null, null, { color: "white", marginBottom: "0px", marginTop: "20px", marginLeft: styleSettings.terminalFontMarginLeft }, null, "OS2x (lux-0.0.1a.A) bios"))
    await OS2x.Frame.uWait(2)
    stSF("terminal_CInput", new HTMLS_Element("p", null, null, stGet("terminal_textStyle"), null, "Loading..."))
    await OS2x.Frame.uWait(5)
    stSet("terminal_CInput", new HTMLS_Element("p", null, null, stGet("terminal_textStyle"), null, "dfssdfdff"))

    // end bios startup code


    document.addEventListener("keydown", stGet("terminal_whenEnter"));
    document.addEventListener("keydown", stGet("terminal_whenKeydown"));

    while (true) {
        await OS2x.Frame.uWait(A)
    }

    document.removeEventListener("keydown", stGet("terminal_whenEnter"));
    document.removeEventListener("keydown", stGet("terminal_whenKeydown"));

    Object.keys(store).filter(x => x.startsWith("terminal")).forEach(x => stFree(x))
}

async function main() {
    await bios();
}


await main()