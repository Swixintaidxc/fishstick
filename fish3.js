export const filesystem = {
    "fish": {
        "root": {
            content: {
            },
        },
    }
}



export function locatePath(path) {

    let paths;

    if (path.endsWith("/")) {
        paths = path.slice(0, -1).split("/").slice(1)
    } else {
        paths = path.split("/").slice(1)
    }

    let lastUUID = ""

    let g = filesystem["fish"]["root"]

    for (const [i, dir] of Object.entries(paths)) {
        lastUUID = g.content[dir]
        g = filesystem["fish"][lastUUID]
    }
    return [lastUUID, g]
}

export function newFolder(inf, name) {
    const path = locatePath(inf);
    const uuid = crypto.randomUUID()
    filesystem["fish"][uuid] = {content: {}, name: name, type: "folder"}
    filesystem["fish"][path[0]].content[name] = uuid
}

export function newFile(inf, name, content) {
    const path = locatePath(inf);
    const uuid = crypto.randomUUID()
    filesystem["fish"][uuid] = {filecontent: content, name: name, type: "file"}
    filesystem["fish"][path[0]].content[name] = uuid 
}

