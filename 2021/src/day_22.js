// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_22_data.txt").toString().split("\r\n")
/*
[
    [ 'on', [ [ 22, 28 ], [ 12, 37 ], [ 34, 11 ] ] ],
    [ 'on', [ [ 22, 28 ], [ 12, 37 ], [ 34, 11 ] ] ],
    ...
]
*/
const instructions = content.map(line => {
    const split = line.split(" ")
    const coords = split[1].match(/-?\d+/g)
    split[1] = [[+coords[0], +coords[1]], [+coords[2], +coords[3]], [+coords[4], +coords[5]]]
    return split
})

const smallCube = Array(100).fill(false).map(() => Array(100).fill(false).map(() => Array(100).fill(false)))

function runInstruction(onOff, xArr, yArr, zArr, xOffset, yOffset, zOffset, cube) {
    for (let x = xArr[0] + xOffset; x < xArr[1] + xOffset + 1; x++) {
        for (let y = yArr[0] + yOffset; y < yArr[1] + yOffset + 1; y++) {
            for (let z = zArr[0] + zOffset; z < zArr[1] + zOffset + 1; z++) {
                cube[x][y][z] = onOff === "on" ? true : false
            }
        }
    }
}

const insFirst = instructions.slice(0, 20)
insFirst.forEach(ins => runInstruction(ins[0], ins[1][0], ins[1][1], ins[1][2], 50, 50, 50, smallCube))
let cubesOn = 0
smallCube.forEach(x => x.forEach(y => y.forEach(v => v && cubesOn++)))
console.log({ cubesOn });

// ##################### Part 2 #####################

// Not complete

function intersects([c1x,c1y,c1z],[c2x,c2y,c2z]){
    return(
        !((c1x[1] < c2x[0]) || (c2x[1] < c1x[0])) &&
        !((c1y[1] < c2y[0]) || (c2y[1] < c1y[0])) &&
        !((c1z[1] < c2z[0]) || (c2z[1] < c1z[0])) 
    )
}

const cubes = []

for (const [ins1,[c1x,c1y,c1z]] of instructions){
    for (const [ins2,[c2x,c2y,c2z]] of instructions){
        if (intersects([c1x,c1y,c1z],[c2x,c2y,c2z])) {
            
        }
    }
}


