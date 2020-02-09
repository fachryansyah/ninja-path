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
let stackLeft = [1]
let stackRight = []
let mappedWay = []

const drawMap = async () => {
    await resetMap()

    for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        } else {
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
    createStackLevel()
    drawWall()
    drawLocation()
    getMappedWay()
    findBestWay(start)
}

const createStackLevel = () => {
    let size = parseInt(formSize.value);

    for (let i = 1; i < size + 1; i++) {
        stackRight.push(i * 6)
    }

    for (let i = 1; i < size; i++) {
        stackLeft.push(i * 6 + 1)
    }
}

const drawWall = () => {
    mapCol = 0
    mapRow = 1
    wall = formWall.value.split(",")
    for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        } else {
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

const drawLocation = () => {
    mapCol = 0
    mapRow = 1
    start = parseInt(formStart.value)
    end = parseInt(formEnd.value)
    for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        } else {
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

const getMappedWay = () => {

    for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
        mappedWay.push(findStep(i))
    }
    mappedWay.forEach((item, index) => {
        console.log(index + 1, item)
    })
}

const findStep = (num) => {
    let step = []

    if (num < parseInt(formSize.value) * parseInt(formSize.value)) {
        for (let i = 1; i < parseInt(formSize.value) * parseInt(formSize.value) + 1; i++) {
            if (!wall.includes(i)) {
                let right = num + 1
                let left = num - 1
                let top = num - parseInt(formSize.value)
                let bottom = num + parseInt(formSize.value);

                if (i == right) {
                    if (!wall.includes(right.toString())) {
                        if (stackLeft.includes(right)) {
                            right = right + parseInt(formSize.value)
                        } else {
                            step.push(right)
                        }
                    }
                }
                if (i == left) {
                    if (!wall.includes(left.toString())) {
                        if (stackRight.includes(left)) {
                            left = left - parseInt(formSize.value)
                        } else {
                            step.push(left)
                        }
                    }
                }

                if (i == top) {
                    if (!wall.includes(top.toString())) {
                        step.push(top)
                    }
                }
                if (i == bottom) {
                    if (!wall.includes(bottom.toString())) {
                        step.push(bottom)
                    }
                }
            }
        }
    }
    return step
}

const findBestWay = (point) => {

    let tempPoint = mappedWay[point - 1]
    // console.log(tempPoint[tempPoint.length - 1])
    console.log(tempPoint)
    if (tempPoint.includes(end)) {
        console.log(way)
        drawWay()
        return
    }
    let goTo = tempPoint.indexOf(findNearestTarget(tempPoint, end))
    // console.log(findNearestTarget(tempPoint, end))
    console.log(goTo)
    way.push(tempPoint[goTo])
    findBestWay(tempPoint[goTo])
}

const findNearestTarget = (points, target) => {

    var i = 0, closest, closestDiff, currentDiff;
    if(points.length)
    {
        closest = points[0];
        for(i;i<points.length;i++)
        {           
            closestDiff = Math.abs(target - closest);
            currentDiff = Math.abs(target - points[i]);
            if(currentDiff < closestDiff)
            {
                closest = points[i];
            }
            closestDiff = null;
            currentDiff = null;
        }
        //returns first element that is closest to number
        return closest;
    }
    //no length
    return false;

    // return points.reduce(function(prev, curr) {
    //     return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    // });
}

const drawWay = () => {
    mapCol = 0
    mapRow = 1
    for (let i = 1; i < formSize.value * formSize.value + 1; i++) {
        if (mapCol == formSize.value) {
            mapRow += 1
            mapCol = 1
        } else {
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
    wall = []
    start = 0
    end = 0

    mapCol = 0
    mapRow = 1

    way = []
    stackLeft = [1]
    stackRight = []
    mappedWay = []
}

const lockObject = () => {
    map.getObjects().map(function (item, index) {
        map.item(index).lockMovementY = true;
        map.item(index).lockMovementX = true;
        map.item(index).lockScalingX = true;
        map.item(index).lockRotation = true;
    });
}