let formSize = document.getElementById("size")
let formWall = document.getElementById("wall")
let formStart = document.getElementById("start")
let formEnd = document.getElementById("end")

let map = new fabric.Canvas('map')
let wall = 0
let start = 0
let end = 0

let mapCol = 0
let mapRow = 1

let way = []
let mappedWay = []

const drawMap = async () => {
    await resetMap()
    for(let i = 1; i < formSize.value * formSize.value + 1; i++){
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        }else{
            mapCol += 1
        }

        map.add(new fabric.Rect({
            left: mapCol * 30,
            top: mapRow * 30,
            fill: '#ebd9c7',
            width: 30,
            height: 30
        }))

        map.add(new fabric.Text(i.toString(), {
            left: mapCol * 30 + 3,
            top: mapRow * 30 + 3,
            fontSize: 14
        }))
    }
    drawWall()
    drawLocation()
    findBestWay()
}

const drawWall = () => {
    mapCol = 0
    mapRow = 1
    wall = formWall.value.split(",")
    for(let i = 1; i < formSize.value * formSize.value + 1; i++){
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        }else{
            mapCol += 1
        }

        if (wall.includes(i.toString())) {
            map.add(new fabric.Rect({
                left: mapCol * 30,
                top: mapRow * 30,
                fill: '#b59474',
                width: 30,
                height: 30
            }))
    
            map.add(new fabric.Text(i.toString(), {
                left: mapCol * 30 + 3,
                top: mapRow * 30 + 3,
                fontSize: 14
            }))
        }
    }
}

drawLocation = () => {
    mapCol = 0
    mapRow = 1
    start = parseInt(formStart.value)
    end = parseInt(formEnd.value)
    for(let i = 1; i < formSize.value * formSize.value + 1; i++){
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        }else{
            mapCol += 1
        }

        if (start == i) {
            map.add(new fabric.Rect({
                left: mapCol * 30,
                top: mapRow * 30,
                fill: '#a292e0',
                width: 30,
                height: 30
            }))
    
            map.add(new fabric.Text(i.toString(), {
                left: mapCol * 30 + 3,
                top: mapRow * 30 + 3,
                fontSize: 14
            }))
        }

        if (end == i) {
            map.add(new fabric.Rect({
                left: mapCol * 30,
                top: mapRow * 30,
                fill: '#e09db4',
                width: 30,
                height: 30
            }))
    
            map.add(new fabric.Text(i.toString(), {
                left: mapCol * 30 + 3,
                top: mapRow * 30 + 3,
                fontSize: 14
            }))
        }
    }
}

const findBestWay = () => {
    way.push(start)
    for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
        
    }
}

const findStep = () => {
    console.log("find best way")
    if (start < parseInt(formSize.value)) {
        for (let i = 1; i < parseInt(formSize.value) + 1; i++) {
            if (!wall.includes(i)) {
                let right = start + 1;
                let left = start - 1;
                if (i == right) {
                    way.push(right)
                }
                if (i == left) {
                    way.push(left)
                }
            }
        }
    }
    console.log(way)
}

const drawWay = () => {
    mapCol = 0
    mapRow = 1
    way = [3,4,5]
    for(let i = 1; i < formSize.value * formSize.value + 1; i++){
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        }else{
            mapCol += 1
        }

        if (way.includes(i)) {
            map.add(new fabric.Rect({
                left: mapCol * 30,
                top: mapRow * 30,
                fill: '#b1d998',
                width: 30,
                height: 30
            }))
    
            map.add(new fabric.Text(i.toString(), {
                left: mapCol * 30 + 3,
                top: mapRow * 30 + 3,
                fontSize: 14
            }))
        }
    }
}

const resetMap = () => {
    map.clear()
    mapCol = 0
    mapRow = 1
}