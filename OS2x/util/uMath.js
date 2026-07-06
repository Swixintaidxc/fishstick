export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function clamp(minV, maxV, V) {
    return Math.max(Math.min(maxV, V), minV)
}

