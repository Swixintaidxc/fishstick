export const defaultSettings = { "defaultStyle": false, "scale": false };

export const HTMLS_ELEMENTS = {}

export function HTMLS_setDefaultStyles(style) {
    defaultSettings["defaultStyle"] = style
}

export class HTMLS_Element {

    static centerCoord(element, coords=[0,0]) {
        return [(window.innerWidth - element.width) / 2 + coords[0], (window.innerHeight - element.height) / 2 + coords[1]]
    }

    constructor(elementT, width, height, styles, coords=[0,0], text, parent=document.body) {

        this.element = document.createElement(elementT);
        this.id = crypto.randomUUID();
        this.element.id = this.id;

        if (width !== null) this.element.style.width = `${width}px`;
        if (height !== null) this.element.style.height = `${height}px`;
        
        this.proportions = [width, height]
        this.coords = coords

        if (text) this.element.textContent = text;

        if (!Array.isArray(styles)) { Object.assign(this.element.style, styles); } else {
            for (const style of styles) {
                Object.assign(this.element.style, style);
            }
        }

        if (defaultSettings["defaultStyle"]) Object.assign(this.element.style, defaultSettings["defaultStyle"]);


        if (width !== null && height !== null) {

            this.element.style.position = 'absolute';

            this.element.style.left = `${(window.innerWidth - this.proportions[0]) / 2 + this.coords[0]}px`;
            this.element.style.bottom = `${(window.innerHeight - this.proportions[1]) / 2 + this.coords[1]}px`;
            
            


        }


        if (parent instanceof HTMLS_Element) {

            parent.element.appendChild(this.element);

        } else {

            parent.appendChild(this.element);

        }

        HTMLS_ELEMENTS[this.id] = this
    }

    setPosition(coords) {
        this.element.style.left = `${(window.innerWidth - parseFloat(this.element.style.width)) / 2 + coords[0]}px`;
        this.element.style.bottom = `${(window.innerHeight - parseFloat(this.element.style.height)) / 2 + coords[1]}px`;
        this.coords = coords
    }

    jsFree() {
        delete HTMLS_ELEMENTS[this.id]
    }

    htmlsFree() {
        this.element.remove()
        delete HTMLS_ELEMENTS[this.id]
    }
}

export function setStyle(element, styles) {
    if (element instanceof HTMLS_Element) {

        Object.assign(element.element.style, styles);

    } else {

        Object.assign(element.style, styles);

    }
}