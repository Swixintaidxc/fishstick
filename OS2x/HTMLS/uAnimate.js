import * as uMath from "../util/uMath.js"

export function linearAnimate(element, coordsT, r) {
    element.setPosition([uMath.lerp(element.coords[0], coordsT[0], r), uMath.lerp(element.coords[1], coordsT[1], r)])
}

