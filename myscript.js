
d3.select("body").style("background-color", "white")


const gameGridDiv = d3.select(".gameGridSpace").append("div")
.attr("class", "game-grid")

let dim = parseFloat(d3.select(".game-grid")
.style("width"))






let size = 6 // this matches the hard coded bit below.
// the number of cols/rows

const lineFunc = d3.line()
.x((d)=>{return d.x})
.y((d)=>{return d.y})

///// DRAWING THE SVG GRID AT THE BACK /////////

let svgGrid = d3.select(".game-grid")
.append("svg")
.attr("id", "#gameSVG")
.attr("height", dim)
.attr("width", dim)





/* generate paths for grid */

let gridPaths = []
gridPaths.push(
 [ {x:1, y:1},
  {x: dim-1, y:1},
  {x: dim-1, y:dim-1},
  {x:1, y:dim-1}, 
  {x:1, y:1}]
  )
console.log(gridPaths)
let sp = dim/size

  for (i=1;i<size;i++) {
    //vertical paths
    gridPaths.push(
      [
        {x: i * sp, y: 0 },
        {x: i * sp, y:dim}
      ]
    )
      //  horizontal
    gridPaths.push(
      [
        {x: 0, y: i * sp },
        {x: dim , y: i * sp}
      ]
    )


}

for (i=0;i<gridPaths.length;i++) {
  svgGrid.append("path")
  .attr("class", "gridLine")
  .attr("d", lineFunc(gridPaths[i]))

}

//////////hardcoded solution////////////
let solution = [
  ["cyan",  "magenta",  "blue",     "green",    "yellow",    "red"],
  ["red",   "yellow",   "magenta",  "cyan",     "green",    "blue"],
  ["green", "blue",     "cyan",     "magenta",  "red",      "yellow"],
  ["blue",  "green",     "red",     "yellow",   "cyan",     "magenta"],
  ["yellow", "red",     "green",     "blue",    "magenta",    "cyan"],
  ["magenta", "cyan",   "yellow",    "red",      "blue",      "green"]
]

let solutionContinuous = [
  "cyan",  "magenta",  "blue",     "green",    "yellow",    "red",
  "red",   "yellow",   "magenta",  "cyan",     "green",    "blue",
  "green", "blue",     "cyan",     "magenta",  "red",      "yellow",
  "blue",  "green",     "red",     "yellow",   "cyan",     "magenta",
  "yellow", "red",     "green",     "blue",    "magenta",    "cyan",
  "magenta", "cyan",   "yellow",    "red",      "blue",      "green"
]


let gameState = [] //make gameState here, ,like box Boundaries
let xMax = []
let yMax = []

let k = 0
for (i=0;i<size;i++){
      //note the locations for drag events and positioning later on.
      //poptential bug that some of the svg's clickable area lie ouside of the grid, (ie a pixel or so.)
      //this might be handled by the function that checks whcih box the drag is over.
      //may be full of unused stuff.
      for ( j=0;j<size;j++){
        let colSolutionObject = colObjFromName(solutionContinuous[k])
        let spotObj = {col_spotter_id: "colSpotter_" + k, row_spotter_id: "rowSpotter_" + k, showRow: false, showCol: false}

        gameState.push(
         { box_id:"box_"+k, circle_id:"circle_"+k, x: (j * sp), y: (i * sp), spotters: spotObj, target: colSolutionObject, current: {r: null, g: null, b: null}, occ_Tile_H: null, occ_Tile_V: null}
        )
        

        xMax.push((j * sp)+5)
        yMax.push((i * sp)+5)


        k++
      }
  }




  xMax.push(((size+1) * sp+5))
  yMax.push(((size+1) * sp+5)) //+5 is the margin

  let minX = d3.min(xMax)
  let maxX = d3.max(xMax)

  let minY = d3.min(yMax)
  let maxY = d3.max(yMax)

 //checking locations - checked they are correct.

// next, append empty circles too the game grid
let rad = (sp*0.7)/2 //the radius of all circles > leaving this in here.

let circleGroup = svgGrid.append("g")
let colSpotters = svgGrid.append("g")
let rowSpotters = svgGrid.append("g")

gameState.forEach((d,i)=>{

  circleGroup.append("circle")
  .attr("id", ()=>{return "circle_" + i})
  .attr("cx", ()=>{return d.x + sp/2})
  .attr("cy", ()=>{return d.y + sp/2})
  .attr("r", rad)
  .attr("fill", "rgba(0,0,0,0)")

  //horizontal spotters
  rowSpotters.append("path")
  .attr("id", ()=>{return "rowSpotter_" + i})
  .attr("class", "row-spotter, inactive-spotter")
  .attr("d", roundyPathDataGenerator(sp, sp*3, d.x, d.y, rad))
  .attr("fill", "none")
  //.style("stroke", "magenta")
  //.style("stroke-width", "1px")

  //vertical spotters
  colSpotters.append("path")
  .attr("id", ()=>{return "colSpotter_" + i})
  .attr("class", "col-spotter, inactive-spotter")
  .attr("d", roundyPathDataGenerator(sp*3, sp, d.x, d.y, rad))
  .attr("fill", "none")
  //.style("stroke", "magenta")
  //.style("stroke-width", "1px")




})






const tiles = [

  //move this into a json file, then make more, and load them dynaically/make a databse.
  
  //vert cards
  {tile_id: "tile_1", location: "base", orient: "vertical" , colours: [ {r: 0, g: 255, b: 0},  {r: 0, g: 0, b: 255},  {r: 0, g: 0, b: 255} ] }, //col1
  {tile_id: "tile_2", location: "base",orient: "vertical", colours: [{r: 0, g: 255, b: 0},  {r: 255, g: 0, b: 0},  {r: 255, g: 0, b: 0} ] }, //col1
  {tile_id: "tile_3", location: "base",orient: "vertical", colours: [{r: 255, g: 0, b: 0},  {r: 255, g: 0, b: 0},  {r: 255, g: 0, b: 0} ] }, //col2
  {tile_id: "tile_4", location: "base",orient: "vertical", colours: [{r: 0, g: 255, b: 0},  {r: 0, g: 255, b: 0},  {r: 0, g: 0, b: 255} ] }, //col2
  {tile_id: "tile_5", location: "base",orient: "vertical",  colours: [null,  null,  {r: 0, g: 255, b: 0} ] }, //col3
  {tile_id: "tile_6", location: "base",orient: "vertical",  colours: [{r: 255, g: 0, b: 0},  {r: 255, g: 0, b: 0},  {r: 255, g: 0, b: 0} ] }, //col3
  {tile_id: "tile_7", location: "base",orient: "vertical",  colours: [{r: 0, g: 0, b: 255},  null,  {r: 255, g: 0, b: 0} ] }, //col4
  {tile_id: "tile_8", location: "base",orient: "vertical",  colours: [{r: 255, g: 0, b: 0},  {r: 0, g: 255, b: 0},  {r: 0, g: 0, b: 255} ] }, //col4
  {tile_id: "tile_9", location: "base",orient: "vertical",  colours: [{r: 0, g: 255, b: 0},  {r: 255, g: 0, b: 0},  {r: 0, g: 255, b: 0} ] }, //col5
  {tile_id: "tile_10", location: "base", orient: "vertical",  colours: [{r: 0, g: 0, b: 255},  {r: 0, g: 0, b: 255},  {r: 0, g: 0, b: 255} ] }, //col5
  {tile_id: "tile_11", location: "base", orient: "vertical",  colours: [{r: 255, g: 0, b: 0},  {r: 0, g: 255, b: 0},  {r: 0, g: 255, b: 0} ] }, //col6
  {tile_id: "tile_12", location: "base", orient: "vertical", colours: [{r: 255, g: 0, b: 0},  null,  {r: 0, g: 255, b: 0} ] }, //col6

//horiz cards
{tile_id: "tile_13", location: "base", orient: "horizontal", colours: [{r: 0, g: 0, b: 255},  null,  {r: 0, g: 255, b: 0} ] }, //row1
{tile_id: "tile_14", location: "base", orient: "horizontal", colours: [null,  {r: 255, g: 0, b: 0},  {r: 0, g: 0, b: 255} ] }, //row1
{tile_id: "tile_15", location: "base", orient: "horizontal", colours: [{r: 255, g: 0, b: 0},  {r: 0, g: 255, b: 0},  {r: 0, g: 0, b: 255} ] }, //row2
{tile_id: "tile_16", location: "base", orient: "horizontal", colours: [{r: 0, g: 255, b: 0},  null,  {r: 0, g: 0, b: 255} ] }, //row2
{tile_id: "tile_17", location: "base", orient: "horizontal", colours: [null,  {r: 0, g: 0, b: 255},  {r: 0, g: 0, b: 255} ] }, //row3
{tile_id: "tile_18", location: "base", orient: "horizontal", colours: [null,  null,  {r: 255, g: 0, b: 0} ] }, //row3
{tile_id: "tile_19", location: "base", orient: "horizontal", colours: [null,  {r: 0, g: 0, b: 255},  {r: 0, g: 0, b: 255} ] }, //row4
{tile_id: "tile_20", location: "base", orient: "horizontal", colours: [{r: 0, g: 255, b: 0},  null,  null ]}, //row4
{tile_id: "tile_21", location: "base", orient: "horizontal", colours: [{r: 0, g: 255, b: 0},  null,  null ]}, //row5
{tile_id: "tile_22", location: "base", orient: "horizontal", colours: [{r: 0, g: 0, b: 255},  {r: 255, g: 0, b: 0},  {r: 0, g: 0, b: 255} ] } , //row5
{tile_id: "tile_23", location: "base", orient: "horizontal", colours: [null,  null,  {r: 0, g: 255, b: 0} ] }, //row6
{tile_id: "tile_24", location: "base", orient: "horizontal", colours: [{r: 255, g: 0, b: 0},  {r: 0, g: 255, b: 0},  null ] }//row6

]

/////////////////////////////////////////////


const rgb = [ "rgb(255,0,0)","rgb(0,255,0)","rgb(0,0,255)" ]
const rgbSolution = [
  ["r","g","b"],
  ["b","g","r"],
  ["b","r","g"],
  ["r","b","g"],
  ["g","b","r"],
  ["r","b","g"],
  ["r","g","b"],
  ["b","g","r"],
]

let tmpRgb = []

rgbSolution.forEach((d)=>{

  let row = []
  for(i=0;i<3;i++){

    let element
    switch (d[i]){
    case "r":
      element = "rgb(255,0,0)"
      break;
      case "g":
        element = "rgb(0,255,0)"
        break;
        case "b":
      element = "rgb(0,0,255)"
      break;
      default: 
      element = null
    }

    
    row.push(element)
  }
  tmpRgb.push(row)

})


const vTiles = tiles.filter((d)=>{
  return d.orient == "vertical"
})
console.log(vTiles)

const hTiles = tiles.filter((d)=>{
  return d.orient == "horizontal"
})
console.log(hTiles)

/*
const list = []

for (i=0;i<8;i++) {
  
  let tmpId = "v" + i
  list.push(
    {id: tmpId, colours: tmpRgb[i], orientation: "vertical"}
  )
}



console.log(list)
*/

for (let t=0;t<vTiles.length;t++) {
 
  let vTile = d3.select("#colsContainer")
  .append("div")
  .attr("id", vTiles[t].tile_id)
  .attr("class", "tile StaticV")
  .style("border-radius", ()=>{return rad*1.1 + "px"})
  .style("width", sp*0.8)
  .style("height", ((sp*3) - (sp*0.2)))
  
  // ^^there is a 10% size difference twixt tile and box ^^

  let hTile = d3.select("#rowsContainer")
  .append("div")
  .attr("id", hTiles[t].tile_id)
  .attr("class", "tile StaticH")
  .style("border-radius", rad*1.1)
  .style("height", sp*0.8)
  .style("width", ((sp*3) - (sp*0.2)))

  //here add svg shapes to vertical tiles:
let vSVG = vTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

vSVG.selectAll("circle")
.data(vTiles[t].colours)
.enter()
.append("circle")
.attr("cx", sp*0.4)
.attr("cy", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("r", rad)
.attr("fill", (d,i)=>{
    return objectToRgbString(d)
  })
  

  let hSVG = hTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")


hSVG.selectAll("circle")
.data(hTiles[t].colours)
.enter()
.append("circle")
.attr("cx", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("cy", sp*0.4)
.attr("r", rad)
.attr("fill", (d,i)=>{
    return objectToRgbString(d)
  })


}
let divX, divY, xD, yD //numbers to help the drag handling
let movingId, movingTile, movingLocation, div, entry     //references to enable global scope.
let xBase, yBase // the starting point of the drag, so I can return it if needs be

/* drag handler notes
a function bespoke for either vert or horizontal.
another function for clicking the svg grid and moving them around once already in play.
Need a top level global of activeOrientation : vertical / horizontal to handle how it displays the game grid "removal options"
this can be toggled with a button at the bottom or side.
tiles[{}] could have ghost: tru / false , referring to the outline shape on the grid. true renders a shape at the location given by it's
location (as long as it's not base) 
ghost layers need to be in a group, under the divs.
maybe append them all at the start. then just show or hide them.
 */
const dragHandlerVertical = d3.drag()
.on("start", function(){

//get the one it is. 
// get it's data. either directly, to get it's gameData 
//or by seleting it's native offset for sheer position.
div = d3.select(this)

xBase = div._groups[0][0].offsetLeft
yBase = div._groups[0][0].offsetTop

xD = d3.event.x - div._groups[0][0].offsetLeft
yD = d3.event.y - div._groups[0][0].offsetTop


let id = div.attr("id")
  console.log(id)

entry = tiles.filter((d)=>{
    return d.tile_id == id
  })

  /* somewhere around here. now working with hard coded data.*/
// add a new div with movingTile class
movingId =  "#" + entry[0].tile_id
let newTile = d3.select(".game-grid")
  .append("div")
  .attr("id", entry[0].tile_id)
  .attr("class", "movingTile")
  .style("border-radius", ()=>{return rad*1.1 + "px"})
  .style("width", sp*0.8)
  .style("height", ((sp*3) - (sp*0.2)))
  .style("top", ()=>{return d3.event.y - yD})
  .style("left", ()=>{return d3.event.x - xD})

  let tmpSVG = newTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

tmpSVG.selectAll("circle")
.data(entry[0].colours)
.enter()
.append("circle")
.attr("cx", sp*0.4)
.attr("cy", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("r", rad)
.attr("fill", (d,i)=>{
  return  objectToRgbString( d)})

div.style("opacity", "30%")



//tile added move onto drag


})
.on("drag", function(){

  //track movements
  //possibly, instead of dragging the tile, set the tile to all white 
  // or opacity low as a placeholder, then create a new tile from the data
  //in that tile, with the box and fixyBox classes. Move that into the grid.
  //when it gets there, remove the original , maybe smoothly transition it away.
let x = d3.event.x -xD
let y = d3.event.y-yD

divX = x
divY = y

  d3.select(movingId)
  .style("left", x)
  .style("top", y)
  
//adjustthe x + y, need to add on the padding/margin

 let tmp = findBox((x), (y), gameState,sp )
 // this maths ^^^ possibly could do the lining up better
//rewrite finbox to return "outside"
 if(tmp != undefined) {
   movingLocation = tmp
 }
//movingLocation can now be used to find game data
})

.on("end", function(){
//replace this for some dynamic positioning of tiles.
//check in state for where the locations are.
//loop through the positions to determine which one it is over.

//check that position entry for occupation in that orientation.
//update positional array with the id of the tile that is now in that position.

let tmpDiv = d3.select(movingId)
let colObj = entry[0].colours


//position it into place
//we have divX, divY and movingLocation

//*********  Here - check it's in the game.   *///////
// create an xMax and a yMax when gameState is populated and on resize to check against.


if(movingLocation == "outside") {
  //the div is outside the game

  console.log("outside")
  tmpDiv
  .transition()
  .duration(1000)
  .ease(d3.easeBounce)
  .style("left", ()=>{return (xBase ) + "px"})
  .style("top", ()=>{return (yBase ) + "px"})
  .on("end", ()=>{
    tmpDiv.remove()
  })

  div.style("opacity", "100%")
  
  

}else{
  //do all of the stuff below.


//let boxId = findBox(tempX, tempY, boxBoundaries, sp) redundant , in favour of movingLocation
let boxNum = parseInt(movingLocation.split("_")[1])

//now, need to transition it over to the x and y of the boxBoundaries entry#
// check it fits in first.
//length of tmpDiv = colObj.length
let shift = (((colObj.length - 1) * size) + boxNum)

for (j=0;j<size;j++){
if(gameState[shift]) {
  j = 100
}else{
  shift = shift-size
  boxNum = boxNum - size
}
}
movingLocation = "box_" +  boxNum  //final location of top of tile


//now I know where it's off, update the circle colour at the locations necessary.

//checking if it can loop
let viablePosition = true
for (i=0;i<colObj.length;i++){
  let tempObj = gameState.find(o => o.box_id === "box_" + (i*size + boxNum))

  if (tempObj.occ_Tile_V != null) {
//IT CAN'T GO IN HERE!
viablePosition = false
}

}

if(viablePosition) {
  //do the rest of it




for (j=0;j<colObj.length;j++){ 
//for each circle colour

  let tB = "box_" +  (boxNum + (j*size)) // jesus I've got a lot of similarly named variables. tB now.
  let thisRGB = colObj[j]
  let obj = gameState.find(o => o.box_id === tB)
  let posIndex = gameState.indexOf(obj)
 
    //fill it in with temp cols rgb values.
    //replace null with movingid

    gameState[posIndex].occ_Tile_V = movingId


    //for the first loop, add that location as a spotter location
    if (j===0) {
      gameState[posIndex].spotters.showCol = true
    }

if (thisRGB == null){
  gameState[posIndex].current.r = null
  gameState[posIndex].current.g = null
  gameState[posIndex].current.b = null

}else{
  gameState[posIndex].current.r = d3.min([thisRGB.r + gameState[posIndex].current.r, 255])
  gameState[posIndex].current.g = d3.min([thisRGB.g + gameState[posIndex].current.g, 255])
  gameState[posIndex].current.b = d3.min([thisRGB.b + gameState[posIndex].current.b, 255])

}


  if (obj.occ_Tile_H != null) {
    
    let tmpR = d3.min([obj.r + thisRGB.r,255])
    let tmpB = d3.min([obj.g + thisRGB.g,255])
    let tmpG = d3.min([obj.b + thisRGB.b,255])

    gameState[posIndex].r = tmpR
    gameState[posIndex].g = tmpG
    gameState[posIndex].b = tmpB


  }

  //now the arrays are sorted, move the div.




} // j - looping through tmpcols, ie, the circles in the tile
//transition here!

// find moving id in tiles and update it's top/left location.



let tileIndex = tiles.indexOf(entry[0])
tiles[tileIndex].location = movingLocation


let obj = gameState.find(o => o.box_id === movingLocation)
let posIndex = gameState.indexOf(obj)

//gameigrd padding = 5

let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop

tmpDiv
.transition()
.duration(1000)
.ease(d3.easeBounce)
.style("left", ()=>{return (gameState[posIndex].x +ggLeft + (sp*0.15) ) + "px"})
.style("top", ()=>{return (gameState[posIndex].y + ggTop + (sp*0.15)) + "px"})
.on("end", ()=>{
  tmpDiv.remove()
})

div.transition()
.duration(500)
.style("fill-opacity", "0%")
.on("end", ()=>{
  div.remove()
})


   

}else{
  // this space is taken: send it back to base
  //transition home, no update required.
  let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
  let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop
  
tmpDiv
.transition()
.duration(1000)
.ease(d3.easeBounce)
.style("left", ()=>{return (xBase ) + "px"})
.style("top", ()=>{return (yBase ) + "px"})
.on("end", ()=>{
  tmpDiv.remove()
})
div.style("opacity", "100%")

}


updateCircleColours()
updateColSpotters()

} //if circle inside/outside


//updateCircleData(colours,orient, firstPosition )

//div.remove()
//tmpDiv.remove()



  if (d3.event.y < 200) {
  d3.select(this)
  .attr("class", "tile")
  .style("left", null)
  .style("top", null)
  }else{
  d3.select(this)
  .attr("class", "tile")
  .style("left", ()=>{return d3.event.x - xD})
  .style("top", ()=>{return d3.event.y - yD})
  }

  
})

let divsV  = d3.selectAll(".StaticV")

dragHandlerVertical(divsV)


///// **** MAKE A HORIZONTAL ONE **** /////
//comments remoeved in this. it's a straoght copy of the vertical one.
//blatantly could be more efficiently written.

const dragHandlerHorizontal = d3.drag()
.on("start", function(){

div = d3.select(this)

xBase = div._groups[0][0].offsetLeft
yBase = div._groups[0][0].offsetTop

xD = d3.event.x - div._groups[0][0].offsetLeft
yD = d3.event.y - div._groups[0][0].offsetTop

let id = div.attr("id")
  console.log(id)

entry = tiles.filter((d)=>{
    return d.tile_id == id
  })

movingId =  "#" + entry[0].tile_id
let newTile = d3.select(".game-grid")
  .append("div")
  .attr("id", entry[0].tile_id)
  .attr("class", "movingTile")
  .style("border-radius", ()=>{return rad*1.1 + "px"})
  .style("width", ((sp*3) - (sp*0.2)))
  .style("height", sp*0.8)
  .style("top", ()=>{return d3.event.y - yD})
  .style("left", ()=>{return d3.event.x - xD})

  let tmpSVG = newTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

tmpSVG.selectAll("circle")
.data(entry[0].colours)
.enter()
.append("circle")
.attr("cx", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("cy", sp*0.4)
.attr("r", rad)
.attr("fill", (d,i)=>{
  return  objectToRgbString( d)})

div.style("opacity", "30%")

})
.on("drag", function(){

let x = d3.event.x -xD
let y = d3.event.y-yD

divX = x
divY = y

  d3.select(movingId)
  .style("left", x)
  .style("top", y)

 let tmp = findBox(x, y, gameState,sp )

 if(tmp != undefined) {
   movingLocation = tmp
 }

})

.on("end", function(){

let tmpDiv = d3.select(movingId)
let colObj = entry[0].colours

if(movingLocation == "outside") {
 
  console.log("outside")
  tmpDiv
  .transition()
  .duration(1000)
  .ease(d3.easeBounce)
  .style("left", ()=>{return (xBase ) + "px"})
  .style("top", ()=>{return (yBase ) + "px"})
  .on("end", ()=>{
    tmpDiv.remove()
  })

  div.style("opacity", "100%")
  
  

}else{

let boxNum = parseInt(movingLocation.split("_")[1])

/* rewriting this bit - different version needed for horizontal

let shift = (((colObj.length - 1) * size) + boxNum)

for (j=0;j<size;j++){
if(gameState[shift]) {
  j = 100
}else{
  shift = shift-size
  boxNum = boxNum - size
}
}

*/




let thisRow = Math.floor(boxNum/size)

for (j=0;j<size;j++){
 let tmpNum = boxNum + colObj.length - 1
if (Math.floor(tmpNum/size) == (thisRow)){
//good it fits in, break out.
j = 100
}else{
boxNum = boxNum - 1
}
} // for j



movingLocation = "box_" +  boxNum  //final location of left of tile
console.log(movingLocation)

let viablePosition = true
for (i=0;i<colObj.length;i++){
  let tempObj = gameState.find(o => o.box_id === "box_" + (i + boxNum))

  if (tempObj.occ_Tile_H != null) {

viablePosition = false
}

}

if(viablePosition) {

for (j=0;j<colObj.length;j++){ 

  let tB = "box_" +  (boxNum + j)
  let thisRGB = colObj[j]
  let obj = gameState.find(o => o.box_id === tB)
  let posIndex = gameState.indexOf(obj)

  if (j===0) {
    gameState[posIndex].spotters.showRow = true
  }

    gameState[posIndex].occ_Tile_H = movingId

if (thisRGB == null){
  //or better -  do nothing?
  //gameState[posIndex].current.r = null
  //gameState[posIndex].current.g = null
  //gameState[posIndex].current.b = null

}else{
  gameState[posIndex].current.r = d3.min([thisRGB.r + gameState[posIndex].current.r, 255])
  gameState[posIndex].current.g = d3.min([thisRGB.g + gameState[posIndex].current.g, 255])
  gameState[posIndex].current.b = d3.min([thisRGB.b + gameState[posIndex].current.b, 255])

}


} // j 

let tileIndex = tiles.indexOf(entry[0])
tiles[tileIndex].location = movingLocation


let obj = gameState.find(o => o.box_id === movingLocation)
let posIndex = gameState.indexOf(obj)

//gameigrd padding = 5

let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop

tmpDiv
.transition()
.duration(1000)
.ease(d3.easeBounce)
.style("left", ()=>{return (gameState[posIndex].x +ggLeft + (sp*0.15) ) + "px"})
.style("top", ()=>{return (gameState[posIndex].y + ggTop + (sp*0.15)) + "px"})
.on("end", ()=>{
  tmpDiv.remove()
})

div.transition()
.duration(500)
.style("fill-opacity", "0%")
.on("end", ()=>{
  div.remove()
})

}else{

tmpDiv
.transition()
.duration(1000)
.ease(d3.easeBounce)
.style("left", ()=>{return (xBase ) + "px"})
.style("top", ()=>{return (yBase ) + "px"})
.on("end", ()=>{
  tmpDiv.remove()
})
div.style("opacity", "100%")

}


updateCircleColours()
updateRowSpotters()

} //if circle inside/outside

/* What's this? get rid if I still work!

  if (d3.event.y < 200) {
  d3.select(this)
  .attr("class", "tile")
  .style("left", null)
  .style("top", null)
  }else{
  d3.select(this)
  .attr("class", "tile")
  .style("left", ()=>{return d3.event.x - xD})
  .style("top", ()=>{return d3.event.y - yD})
  }

  */
})

let divsH  = d3.selectAll(".StaticH")

dragHandlerHorizontal(divsH)


/// END OF HORIZONTAL DRAG HANDLER

//writing here to include pickup, drag drop FROM grid

const svgGame = d3.select(".game-grid")


let tmpId, offsetX, offsetY
let locationData

const dragFromGridVertical = d3.drag()
.on("start", function() {
  //add a new div for drag
  //remove colour data from gameState
  //updateCirclecolours

  offsetX = d3.event.x - 6
  offsetY = d3.event.y - 6

  console.log(offsetX)
  console.log(offsetY)

  tmpId = findBoxSvgClick(offsetX, offsetY, gameState, sp)
  console.log(tmpId)

  locationData = gameState.find((d)=>{
    return d.box_id === tmpId
  })

 

  let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
  let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop

  console.log(locationData.occ_Tile_V)

//this next line: need to know vertical or horizontal state to know which array to search.
entry = tiles.find((d)=>{
  let t = locationData.occ_Tile_V
  console.log(t.substring(1))
  return d.tile_id === t.substring(1)
})



//now - rechck theat locationdata is the top and left.

locationData = gameState.find((d)=>{
  return d.box_id === entry.location
})

//woo. locationData is ACTUALLY the top left box of the tile
//woo. entry. we found it. after about a million console.logs


let top = locationData.y + ggTop + 5
let left = locationData.x + ggLeft + 5

xD = d3.event.x - left
yD = d3.event.y - top


movingId =  "#" + entry.tile_id
let newTile = d3.select(".game-grid")
.append("div")
.attr("id", "tempTile")
.attr("class", "movingTile")
.style("border-radius", ()=>{return rad*1.1 + "px"})
.style("width", sp*0.8)
.style("height", ((sp*3) - (sp*0.2)))
.style("top", top)
.style("left", left)

let tmpSVG = newTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

tmpSVG.selectAll("circle")
.data(entry.colours)
.enter()
.append("circle")
.attr("cx", sp*0.4)
.attr("cy", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("r", rad)
.attr("fill", (d,i)=>{
return  objectToRgbString( d)})

let count = 0
for (i=0;i<gameState.length;i++){
  if (gameState[i].occ_Tile_V === ("#" + entry.tile_id)){

gameState[i].occ_Tile_V = null

let rT = d3.max([gameState[i].current.r - entry.colours[count].r,0])
let gT = d3.max([gameState[i].current.g - entry.colours[count].g,0])
let bT = d3.max([gameState[i].current.b - entry.colours[count].b,0])

if (rT == 0 && gT == 0 && bT == 0) {
  console.log("setting it null")
      gameState[i].current.r = null
      gameState[i].current.g = null
      gameState[i].current.b = null  

}else{
  console.log("changes colour")
  gameState[i].current.r = d3.max([gameState[i].current.r - rT, 0])
  gameState[i].current.g = d3.max([gameState[i].current.g - gT, 0])
  gameState[i].current.b = d3.max([gameState[i].current.b - bT, 0])

}//action the colour

count++

}

}
updateCircleColours()

// set the position to base of tiles[entryIndex]

let tileIndex = tiles.indexOf(entry)
tiles[tileIndex].location = "base"
console.log(tileIndex)
console.log(tiles)

})
.on("drag", function() {
  //drag the new div around a bit.

d3.select("#tempTile")
.style("top", ()=>{
  return (d3.event.y - yD )
})
.style("left", ()=>{
  return (d3.event.x -xD)
})

let box_X = d3.event.x -xD
let box_Y = d3.event.y - yD
 movingLocation = findBoxSvgClick(box_X, box_Y, gameState, sp)
console.log(movingLocation)

})
.on("end", function() {
  /* WORKING ON THIS BIT. EYSE GOING TO SLEEP. 12/12*/
 // let offsetX = d3.event.x - d3.select(".game-grid")._groups[0][0].offsetLeft - 6
 // let offsetY = d3.event.y - d3.select(".game-grid")._groups[0][0].offsetTop - 6
 console.log(gameState)
 console.log(d3.select(".game-grid")._groups[0][0].offsetLeft)
 console.log(d3.select("#tempTile")._groups[0][0].offsetLeft)
 //let box_X = d3.event.x -xD// + d3.select(".game-grid")._groups[0][0].offsetLeft
 //let box_Y = d3.event.y - yD //+ d3.select(".game-grid")._groups[0][0].offsetTop

 let box_X = sp/2 + d3.select("#tempTile")._groups[0][0].offsetLeft - d3.select(".game-grid")._groups[0][0].offsetLeft - 0// + d3.select(".game-grid")._groups[0][0].offsetLeft
 let box_Y = sp/2 + d3.select("#tempTile")._groups[0][0].offsetTop - d3.select(".game-grid")._groups[0][0].offsetTop - 0 //+ d3.select(".game-grid")._groups[0][0].offsetTop
// add on the offset!
//^^^^^^^^^^ THESE NUMBERS ARE TOTALLY WRONG.
svgGrid.append("circle")
.attr("cx", box_X)
.attr("cy", box_Y)
.attr("r", 5)

  movingLocation = findBoxSvgClick(box_X, box_Y, gameState, sp)
//movingLocation is the id of the box it's going back into.
console.log(movingLocation)
// here, it would be better to call a function that updates formulae instead of having to write it.
// pseudo> loadTileToGame(tmpId, tileId) // which also executes updatecCircleCols() at the end

if(movingLocation == "outside") {
//move tile to base
console.log("outside")
addBackToHolderVertical(entry)


}else{
 //update everything and move into position
  
  let boxNum = parseInt(movingLocation.split("_")[1])

//now, need to transition it over to the x and y of the boxBoundaries entry#
// check it fits in first.
//length of tmpDiv = colObj.length

let shift = (((entry.colours.length - 1) * size) + boxNum)

for (j=0;j<size;j++){
if(gameState[shift]) {
  j = 100
}else{
  shift = shift-size
  boxNum = boxNum - size
}
}
movingLocation = "box_" +  boxNum  //final location of top of tile


//checking if it can loop
let viablePosition = true
for (i=0;i<entry.colours.length;i++){
  let tempObj = gameState.find(o => o.box_id === "box_" + (i*size + boxNum))

  if (tempObj.occ_Tile_V != null) {
//IT CAN'T GO IN HERE!
viablePosition = false
}
}

if(viablePosition) {
  //do the rest of it - pasted from top at the moment

for (j=0;j<entry.colours.length;j++){ 
//for each circle colour

  let tB = "box_" +  (boxNum + (j*size)) // jesus I've got a lot of similarly named variables. tB now.
  let thisRGB = entry.colours[j]
  let obj = gameState.find(o => o.box_id === tB)
  let posIndex = gameState.indexOf(obj)
 
    //fill it in with temp cols rgb values.
    //replace null with movingid

    gameState[posIndex].occ_Tile_V = movingId

    if (j===0) {
      gameState[posIndex].spotters.showCol = true
    }

if (thisRGB != null){
  //if it's null, then the game stays as it is colour wise.
  gameState[posIndex].current.r = d3.min([thisRGB.r + gameState[posIndex].current.r, 255])
  gameState[posIndex].current.g = d3.min([thisRGB.g + gameState[posIndex].current.g, 255])
  gameState[posIndex].current.b = d3.min([thisRGB.b + gameState[posIndex].current.b, 255])

}

// update the occupying tile bit.
console.log(entry.tile_id)
gameState[posIndex].occ_Tile_V = "#" + entry.tile_id


  if (obj.occ_Tile_H != null) {
    
    let tmpR = d3.min([obj.r + thisRGB.r,255])
    let tmpB = d3.min([obj.g + thisRGB.g,255])
    let tmpG = d3.min([obj.b + thisRGB.b,255])

    gameState[posIndex].r = tmpR
    gameState[posIndex].g = tmpG
    gameState[posIndex].b = tmpB


  }

  

} //for J


let tileIndex = tiles.indexOf(entry)
tiles[tileIndex].location = movingLocation

//now the arrays are sorted, move the div.
console.log(entry)
console.log(movingLocation)

let obj = gameState.find(o => o.box_id === movingLocation)
let posIndex = gameState.indexOf(obj)

let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop

d3.select("#tempTile")
.transition()
.duration(1000)
.ease(d3.easeBounce)
.style("left", ()=>{return (gameState[posIndex].x +ggLeft + (sp*0.15) ) + "px"})
.style("top", ()=>{return (gameState[posIndex].y + ggTop + (sp*0.15)) + "px"})
.on("end", ()=>{
  d3.select("#tempTile").remove()
})

updateCircleColours()

updateColSpotters()



}else{
  console.log("not viable")

  //do some stuff, move it back to base

  addBackToHolderVertical(entry)


} // if viable

}









//d3.select("#tempTile").remove()
})

dragFromGridVertical(svgGame)

const dragFromGridHorizontal = d3.drag()
.on("start", function() {
  //add a new div for drag
  //remove colour data from gameState
  //updateCirclecolours

  offsetX = d3.event.x - 6
  offsetY = d3.event.y - 6
  console.log(tmpId)
  console.log(offsetX)
  console.log(offsetY)

  tmpId = findBoxSvgClick(offsetX, offsetY, gameState, sp)


  locationData = gameState.find((d)=>{
    return d.box_id === tmpId
  })

 

  let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
  let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop

  console.log(locationData.occ_Tile_H)

//this next line: need to know vertical or horizontal state to know which array to search.
entry = tiles.find((d)=>{
  let t = locationData.occ_Tile_H
  console.log(t.substring(1))
  return d.tile_id === t.substring(1)
})



//now - rechck theat locationdata is the top and left.

locationData = gameState.find((d)=>{
  return d.box_id === entry.location
})

//woo. locationData is ACTUALLY the top left box of the tile
//woo. entry. we found it. after about a million console.logs


let top = locationData.y + ggTop + 5
let left = locationData.x + ggLeft + 5

xD = d3.event.x - left
yD = d3.event.y - top


movingId =  "#" + entry.tile_id
let newTile = d3.select(".gameGridSpace")
.append("div")
.attr("id", "tempTile")
.attr("class", "movingTile")
.style("border-radius", ()=>{return rad*1.1 + "px"})
.style("width", ((sp*3) - (sp*0.2)))
.style("height", sp*0.8)
.style("top", top)
.style("left", left)

let tmpSVG = newTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

tmpSVG.selectAll("circle")
.data(entry.colours)
.enter()
.append("circle")
.attr("cx", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("cy", sp*0.4)
.attr("r", rad)
.attr("fill", (d,i)=>{
return  objectToRgbString( d)})

let count = 0
for (i=0;i<gameState.length;i++){
  if (gameState[i].occ_Tile_H === ("#" + entry.tile_id)){

gameState[i].occ_Tile_H = null

let rT = d3.max([gameState[i].current.r - entry.colours[count].r,0])
let gT = d3.max([gameState[i].current.g - entry.colours[count].g,0])
let bT = d3.max([gameState[i].current.b - entry.colours[count].b,0])

//hang on - am I subtracting it twice here? 

if (rT == 0 && gT == 0 && bT == 0) {
  console.log("setting it null")
      gameState[i].current.r = null
      gameState[i].current.g = null
      gameState[i].current.b = null  

}else{
  console.log("changes colour")
  gameState[i].current.r = d3.max([gameState[i].current.r - rT, 0])
  gameState[i].current.g = d3.max([gameState[i].current.g - gT, 0])
  gameState[i].current.b = d3.max([gameState[i].current.b - bT, 0])

}//action the colour

count++

}

}
updateCircleColours()

// set the position to base of tiles[entryIndex]

let tileIndex = tiles.indexOf(entry)
tiles[tileIndex].location = "base"
console.log(tileIndex)
console.log(tiles)

})
.on("drag", function() {
  //drag the new div around a bit.

d3.select("#tempTile")
.style("top", ()=>{
  return (d3.event.y - yD )
})
.style("left", ()=>{
  return (d3.event.x -xD)
})


})
.on("end", function() {


 let box_X = d3.event.x -xD
 let box_Y = d3.event.y - yD
  movingLocation = findBoxSvgClick(box_X, box_Y, gameState, sp)


if(movingLocation == "outside") {
//move tile to base
console.log("outside")
addBackToHolderHorizontal(entry)
//not yet ^^^^^ rewritten


}else{
 //update everything and move into position
  
  let boxNum = parseInt(movingLocation.split("_")[1])

let shift = (((entry.colours.length - 1) * size) + boxNum)

//nicked from draghandler end above.
for (j=0;j<size;j++){
if ((size - ((boxNum+1) % size)) > colObj.length){
j = 100
}else{
boxNum = boxNum - 1
}
} // for j


movingLocation = "box_" +  boxNum  //final location of top of tile


//checking if it can loop
let viablePosition = true
for (i=0;i<entry.colours.length;i++){
  let tempObj = gameState.find(o => o.box_id === "box_" + (i + boxNum)) // just add one, not the row size.

  if (tempObj.occ_Tile_H != null) {
viablePosition = false
}
}

if(viablePosition) {

for (j=0;j<entry.colours.length;j++){ 
//for each circle colour

  let tB = "box_" +  (boxNum + j) 
  let thisRGB = entry.colours[j]
  let obj = gameState.find(o => o.box_id === tB)
  let posIndex = gameState.indexOf(obj)

  if (j===0) {
    gameState[posIndex].spotters.showRow = true
  }

    gameState[posIndex].occ_Tile_H = movingId

if (thisRGB != null){
  //if it's null, then the game stays as it is colour wise.
  gameState[posIndex].current.r = d3.min([thisRGB.r + gameState[posIndex].current.r, 255])
  gameState[posIndex].current.g = d3.min([thisRGB.g + gameState[posIndex].current.g, 255])
  gameState[posIndex].current.b = d3.min([thisRGB.b + gameState[posIndex].current.b, 255])

}

// update the occupying tile bit.

gameState[posIndex].occ_Tile_H = "#" + entry.tile_id

} //for J


let tileIndex = tiles.indexOf(entry)
tiles[tileIndex].location = movingLocation

//now the arrays are sorted, move the div.
console.log(entry)
console.log(movingLocation)

let obj = gameState.find(o => o.box_id === movingLocation)
let posIndex = gameState.indexOf(obj)

let ggLeft = d3.select(".game-grid")._groups[0][0].offsetLeft
let ggTop = d3.select(".game-grid")._groups[0][0].offsetTop

d3.select("#tempTile")
.transition()
.duration(1000)
.ease(d3.easeBounce)
.style("left", ()=>{return (gameState[posIndex].x +ggLeft + (sp*0.15) ) + "px"})
.style("top", ()=>{return (gameState[posIndex].y + ggTop + (sp*0.15)) + "px"})
.on("end", ()=>{
  d3.select("#tempTile").remove()
})

updateCircleColours()
updateRowSpotters()


}else{
  console.log("not viable")

  //do some stuff, move it back to base

  addBackToHolderHorizontal(entry)


} // if viable

}


})

//dragFromGridHorizontal(svgGame)
//WOOOAH! I NEED TO TRIGGER THE CALLS TO THESE FUNCTIONS ON THE TAB SELECTOR FUNCTION.




////////////     HELPER FUNCTIONS      ///////////
/*note - sort the drag handling into here - and then modules.*/


function addBackToHolderVertical(data) {

  let vTile = d3.select("#colsContainer")
  .append("div")
  .attr("id", data.tile_id)
  .attr("class", "tile StaticV")
  .style("border-radius", ()=>{return rad*1.1 + "px"})
  .style("width", sp*0.8)
  .style("height", ((sp*3) - (sp*0.2)))
  .style("opacity", "0%")
  
  // ^^there is a 10% size difference twixt tile and box ^^


  //here add svg shapes to vertical tiles:
let vSVG = vTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

vSVG.selectAll("circle")
.data(data.colours)
.enter()
.append("circle")
.attr("cx", sp*0.4)
.attr("cy", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("r", rad)
.attr("fill", (d,i)=>{
    return objectToRgbString(d)
  })

  let newTileLeft = vTile._groups[0][0].offsetLeft
  let newTileTop = vTile._groups[0][0].offsetTop
  
console.log(newTileLeft)
console.log(newTileTop)

d3.select("#tempTile")
.transition()
.duration(500)
.style("left", ()=>{return newTileLeft + ""})
.style("top", ()=>{ return newTileTop + ""})
.on("end", ()=>{
  d3.select("#tempTile").remove()
})

vTile.transition()
.duration(500)
.style("opacity", "100%")

dragHandlerVertical(vTile)

}

function addBackToHolderHorizontal(data) {

  let hTile = d3.select("#rowsContainer")
  .append("div")
  .attr("id", data.tile_id)
  .attr("class", "tile StaticH")
  .style("border-radius", ()=>{return rad*1.1 + "px"})
  .style("width", ((sp*3) - (sp*0.2)))
  .style("height", sp*0.8)
  .style("opacity", "0%")
  
  // ^^there is a 10% size difference twixt tile and box ^^


  //here add svg shapes to vertical tiles:
let hSVG = hTile.append("svg")
.attr("width", "100%")
.attr("height", "100%")

hSVG.selectAll("circle")
.data(data.colours)
.enter()
.append("circle")
.attr("cx", (d,i)=>{return( i*sp + sp/2 - sp*0.1)})
.attr("cy", sp*0.4)
.attr("r", rad)
.attr("fill", (d,i)=>{
    return objectToRgbString(d)
  })

  let newTileLeft = hTile._groups[0][0].offsetLeft
  let newTileTop = hTile._groups[0][0].offsetTop
  
console.log(newTileLeft)
console.log(newTileTop)

d3.select("#tempTile")
.transition()
.duration(500)
.style("left", ()=>{return newTileLeft + ""})
.style("top", ()=>{ return newTileTop + ""})
.on("end", ()=>{
  d3.select("#tempTile").remove()
})

vTile.transition()
.duration(500)
.style("opacity", "100%")

dragHandlerHorizontal(hTile)

}

function findBoxSvgClick(x,y,location_array,boxSize){

      
  let id = "outside"
for (i=0;i<location_array.length;i++) {

if (x > location_array[i].x && x < (location_array[i].x + boxSize)) {
  //great, correct column
if (y > location_array[i].y   && y < (location_array[i].y + boxSize)) {
id = location_array[i].box_id
}
}
}
return id



}


let resizing =0



window.addEventListener("resize", ()=>{
  resizing++
  let temp = resizing
  setTimeout(()=>{
if(temp == resizing) {
  //it's the same, fire the change
  //reset the grid and update the position of the 
  //box_locations, and then the tiles, which should be in those locations.
}
  }, 500)
  
})

/*
old code I think
const divStartLocations = setDivLocations()



function setDivLocations(){

  let divs  = d3.selectAll(".box")

  //console.log(divs._groups)
  let info = divs._groups[0]
  let divStartPositions = []
  
  info.forEach((inf)=>{
    divStartPositions.push({
      x: inf.offsetLeft,
      y: inf.offsetTop,
      occupied: true,
      occupyingDiv: inf.id
  
  
    })
    
  })
  
  return divStartPositions
  
  }

  function checkDivLocations(){

    let divs  = d3.selectAll(".box")
  
    //console.log(divs._groups)
    let info = divs._groups[0]
    let occupiedPositions = []
    let emptyPositions = []
    
    info.forEach((inf)=>{
      let tempArray = inf.className.split(" ")
//console.log(tempArray)
      if (tempArray.includes("flexy"))
      {
      occupiedPositions.push({
        x: inf.offsetLeft,
        y: inf.offsetTop,
        occupied: true,
        occupyingDiv: inf.id
    
      })

    }else{

divStartLocations.forEach((el)=>{
  if (el.occupyingDiv == inf.id) {
    emptyPositions.push({
      x: inf.offsetLeft,
      y: inf.offsetTop,
      occupied: false,

    })
  }
})

    }
      
    })
    
    return [occupiedPositions, emptyPositions]
    
    }
    */

function roundyPathDataGenerator (height, width, x,y, rad) {
/*
  m100,100: move to point(100,100)

h200: draw a 200px horizontal line from where we are

a20,20 0 0 1 20,20: draw an arc with 20px X radius, 20px Y radius, clockwise, to a point with 20px difference in X and Y axis

v200: draw a 200px vertical line from where we are

a20,20 0 0 1 -20,20: draw an arc with 20px X and Y radius, clockwise, to a point with -20px difference in X and 20px difference in Y axis

h-200: draw a -200px horizontal line from where we are

a20,20 0 0 1 -20,-20: draw an arc with 20px X and Y radius, clockwise, to a point with -20px difference in X and -20px difference in Y axis

v-200: draw a -200px vertical line from where we are

a20,20 0 0 1 20,-20: draw an arc with 20px X and Y radius, clockwise, to a point with 20px difference in X and -20px difference in Y axis

z: close the path

"M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z"

*/
let short_side = d3.min([width, height])
let gap = short_side*0.1 // 10% smaller

let stX = x + rad + gap/2
let stY = y + gap/2


let h = height-gap - (rad*2)
let w  = width-gap - (rad*2)

let top = "m" + stX + "," + stY + " h" + w + " "
let tR = "a"+ rad + "," + rad + " 0 0 1 " + rad + "," + rad + " "
let right = "v" + h + " "
let bR = "a"+ rad + "," + rad + " 0 0 1 " + "-" + rad + "," + rad + " "
let bottom = "h" + "-" + w + " "
let bL = "a"+ rad + "," + rad + " 0 0 1 " + "-" + rad + "," + "-" + rad + " "
let left = "v" + "-" + h + " "
let tL = "a"+ rad + "," + rad + " 0 0 1 " + rad + "," + "-" + rad + " z"

let path_data = top + tR + right + bR + bottom + bL + left + tL 

return path_data
}

function showDivs(event, divName) {
 d3.selectAll(".tabcontent")
 .style("display", "none") 
 
 d3.select(divName)
 .style("display", "flex")

 console.log(divName)
 if (divName === "#rowsContainer") {
  // spotters are rowSpotters, colSpotters
  //  id : rowSpotter_6
   // classes : row-spotter inactive-spotter
  
   //WORKING THIS OUT. ADDING A SPOTTER ID TO EACH LOCATION
   //d3.selectAll(".row-spotter active-spotter")
   // spotObj = {col_spotter_id: "colSpotter_" + k, row_spotter_id: "rowSpotter_" + k, showRow: false, showCol: false}

  

  
updateRowSpotters()

 //enable dragFromGridHorizontal


 }else{
   //the opposite.
   updateColSpotters()

 }

    }

function updateColSpotters() {

     d3.selectAll(".col-spotter")
    .attr("class", "col-spotter inactive-spotter")

    d3.selectAll(".row-spotter")
    .attr("class", "row-spotter inactive-spotter")
    
for (i=0;i<gameState.length;i++) {
            if(gameState[i].spotters.showCol == true) {
   let spotId = "#" + gameState[i].spotters.col_spotter_id
            d3.select(spotId)
         .attr("class", "col-spotter active-spotter")
       }
     }
    
    }

function updateRowSpotters() {

  d3.selectAll(".col-spotter")
    .attr("class", "col-spotter inactive-spotter")

  d3.selectAll(".row-spotter")
  .attr("class", "row-spotter inactive-spotter")

 for (i=0;i<gameState.length;i++) {
   if(gameState[i].spotters.showRow == true) {
let spotId = "#" + gameState[i].spotters.row_spotter_id
     d3.select(spotId)
     .attr("class", "row-spotter active-spotter")
   }
 }

}


function findBox(x,y,location_array, boxSize) {
      //returns the id of the boxBoundaries entry that corresponds with the xy position.
      // (x: event.x, y: event.y, boxBoundaries, sp)
      console.log(d3.select(".game-grid")._groups[0][0].offsetLeft)
      
        let id = "outside"
      for (i=0;i<location_array.length;i++) {
      
      if (x > location_array[i].x + boxSize && x < (location_array[i].x +( boxSize*2))) {
        //great, correct column
      if (y > location_array[i].y - boxSize/2 + 5  && y < (location_array[i].y + boxSize)) {
      id = location_array[i].box_id
      
      }
      }
      }

      
      return id


      }
      

    function shuffle(array) { // thanks StackOF
      let counter = array.length;
  
      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter);
  
          // Decrease counter by 1
          counter--;
  
          // And swap the last element with it
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
  
      return array;
  }

  function rgbToObject(rgbString) {
   let tmp =  rgbString.substr(4, 15).split(",")
   let tmpInts = tmp.map((item)=>{
     return parseInt(item)
   })
   return tmpInts
  }

  
  function objectToRgbString(obj) {
    //expects obj.r, obj.g, obj.b

 if (obj != null) {
    return "rgb(" + obj.r +","+ obj.g+"," + obj.b +")"
 }else{
   return "none"
 }
   }

  function updateCircleColours() {


    for (i=0;i<gameState.length;i++) {

      
       if(gameState[i].current.r != null) {
     //colour it
    let srch = "#" + gameState[i].circle_id


      d3.select(srch)
      .transition()
      .duration(1000)
      .attr("fill", ()=>{
        let c = gameState[i].current
        return "rgb(" + c.r + "," + c.g + "," + c.b + ")"
      })

    }else{

      let srch = "#" + gameState[i].circle_id
console.log("blasting it")

      d3.select(srch)
      .transition()
      .duration(1000)
      .attr("fill", "none")
    }




    }
  }

  function colObjFromName(name){
    let colObj
    switch (name){
    case "red":
        colObj = {r:255,g:0, b:0}
        break;
    case "yellow":
        colObj = {r:255,g:255, b:0}
        break;
    case "blue":
        colObj = {r:0,g:0, b:255}
        break;
    case "green":
        colObj = {r:0,g:255, b:0}
        break;
    case "cyan":
        colObj = {r:0,g:255, b:255}
        break;
    case "magenta":
        colObj = {r:255,g:0, b:255}
        break;
    
        default: 
        colObj = null
      }

    return colObj
  }