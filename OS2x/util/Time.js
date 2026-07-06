export async function uWait(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, t*1000)
    })
}