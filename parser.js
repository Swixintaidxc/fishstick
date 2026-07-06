export function terminal_parseCmd(txt) {
    let i = 0;
    let textStream = [];
    let mainStream = [];
    let stringstingstream = [];
    let isText = false

    while (i < txt.length) {
        const beforeChar = (i > 0) ? txt[i-1] : "LINE.BEGIN";
        const char = txt[i];
        const afterChar = (i+1 < txt.length) ? txt[i+1] : "LINE.END";

        if (char === "\"" && !isText) {
            isText = true;
            i += 1; continue;
        }

        if (isText) {
            if (char === "\\") {
                textStream.push(afterChar)
                i += 2; continue;
            } else if (char === "\"") {
                isText = false
                mainStream.push(textStream.join(""))
                i += 1; continue;
            } else {
                textStream.push(char)
                i += 1; continue;
            }
        } else {
            if (char === " " || afterChar === "LINE.END") {
                if (afterChar === "LINE.END") { stringstingstream.push(char) }
                mainStream.push(stringstingstream.join(""))
                stringstingstream = []
            } else {
                stringstingstream.push(char)
            }
        }

        i += 1
    }

    return mainStream
}



