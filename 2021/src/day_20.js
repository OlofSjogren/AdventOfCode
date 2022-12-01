// ##################### Part 1 & 2 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_20_data.txt").toString()
const contentArr = content.split("\r\n\r\n")
const algorithm = contentArr[0]
let image = contentArr[1].split("\r\n").map(col => col.split(""))

function countPixels() {
    let count = 0
    image.forEach(row =>
        row.forEach(col => col === "#" && count++)
    )
    return count
}

function padImage() {
    for (let i = 0; i < 3; i++) {
        image.forEach(row => {
            row.push(".")
            row.unshift(".")
        })
    }
    for (let i = 0; i < 3; i++) {
        image.push(new Array(image[0].length).fill("."))
        image.unshift(new Array(image[0].length).fill("."))
    }
}

function optimize(r, c, border) {
    let pixels = ""
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const sym = image[r + i]?.[c + j] ?? border
            pixels += sym
        }
    }
    const bin = pixels.replaceAll(".", "0").replaceAll("#", "1")
    const numIndex = parseInt(bin, 2)
    return algorithm[numIndex]
}
function updateImage(border) {
    const newImage = Array(image.length).fill().map(() => Array(image[0].length).fill())
    image.forEach((row, r) =>
        row.forEach((col, c) => {
            newImage[r][c] = optimize(r, c, border)
        })
    )
    image = newImage
}

let day2 
for (let i = 0; i < 50; i++) {
    const border = (i % 2) === 0 ? "." : "#"
    if (border === ".") padImage()
    if (i === 2) day2 = countPixels()
    updateImage(border)
}
const day50 = countPixels()

// Answer part 1
console.log({day2});

// Answer part 2
console.log({day50});