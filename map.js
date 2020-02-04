let formSize = document.getElementById("size")
let formWall = document.getElementById("wall")
let formStart = document.getElementById("start")
let formEnd = document.getElementById("end")

let map = new fabric.Canvas('map')
let wall = []
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
    // for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
    // }
    console.log(findStep(15))
}

const findStep = (num) => {
    console.log("find step way")
    if (num < parseInt(formSize.value) * parseInt(formSize.value)) {
        for (let i = 1; i < parseInt(formSize.value) * parseInt(formSize.value) + 1; i++) {
            if (!wall.includes(i)) {
                let right = num + 1
                let left = num - 1
                let top = num - parseInt(formSize.value)
                let bottom = num + parseInt(formSize.value);

                if (i == right) {
                    mappedWay.push(right)
                }
                if (i == left) {
                    mappedWay.push(left)
                }

                if (i == top) {
                    if (!wall.includes(top.toString())) {
                        mappedWay.push(top)
                    }
                }
                if (i == bottom) {
                    if (!wall.includes(bottom.toString())) {
                        mappedWay.push(bottom)
                    }
                }
            }
        }
    }
    return mappedWay
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

const lockObject = () => {
    map.getObjects().map(function(item, index) {
        map.item(index).lockMovementY = true;
        map.item(index).lockMovementX = true;
        map.item(index).lockScalingX = true;
        map.item(index).lockRotation = true;
    });
}