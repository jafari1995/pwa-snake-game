import Cell from './cell'
import helper from './helper.js'

class Game {
    constructor(options){
        this.rowCount = options?.rowCount ?? 12 ;
        this.colCount = options?.colCount ?? 12 ;
        this.initialSize = options?.initialSize ?? 3 ;

        this.grid = [];
        this.snakeIndexes = [];
        this.directions = [] ;
        this.foodIndex = null;

        this.createGrid()

        this.createSnake()

        this.bindEvents()

        this.createFood()
    }
    createFood(){
        if(this.foodIndex !==null) this.grid[this.foodIndex].removeFood()
        this.foodIndex = helper.randomInt(0,this.grid.length,this.snakeIndexes)
        this.grid[this.foodIndex].addFood()
    }
    createSnake(){
        const gridMiddle = parseInt(this.grid.length/2 - this.colCount/2) 
        const initialDirection = 'right'
        for(let i =0;i<this.initialSize;i++){
            if(i==0){
                    this.grid[gridMiddle].setSnake('head',initialDirection)
                    this.snakeIndexes.push(gridMiddle)

            }else if(this.initialSize-1 === i ){
                this.grid[gridMiddle-i].setSnake('tail',initialDirection)
                this.snakeIndexes.push(gridMiddle-i)

            }else {
                this.grid[gridMiddle-i].setSnake('body',initialDirection)
                this.snakeIndexes.push(gridMiddle-i)
            }
        }
    }

    createGrid() {
        const gridSize = this.colCount * this.rowCount ;
        const warpper =  document.getElementById('container')
        const gridElement = warpper.querySelector('.snake-grid')
        console.log(`1fr.repeat(${this.colCount})`)
        gridElement.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`
        gridElement.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`


        for(let i=0;i<gridSize;i++){
            const cellElement = document.createElement('div')
            cellElement.classList.add('cell')
            this.grid[i] = new Cell(i, cellElement);
            gridElement.appendChild(cellElement)
        }
    }
    bindEvents(){
         let direction = null
         document.addEventListener('keydown',(e)=>{
            if(e.code === 'ArrowUp') direction ="up"
            else if(e.code === 'ArrowDown') direction = "dowm"
            else if(e.code === 'ArrowRight') direction ="right"
            else if(e.code == 'ArrowLeft') direction ="left"
           if(direction!==null) {
               this.directions[this.snakeIndexes[0]] = direction
           }
           console.log(direction)
        })
    }
    loop(){
        let foodEaten = false
        let addTailIndex =  -1
        let addTailDirectioin  = null
        for(let i = 0 ; i<this.snakeIndexes.length;i++){
            let _direction = null
            const _snakeIndex = this.snakeIndexes[i]

            if(typeof this.directions[_snakeIndex] !=='undefined' && this.directions[_snakeIndex] !==null){
                _direction = this.directions[_snakeIndex]
            }else{
                _direction = this.grid[_snakeIndex].direction
            }

            const toIndex = helper.neighbor(_snakeIndex,_direction,this.colCount,this.rowCount)


            if(toIndex===false){
                alert('Game over!!out of grid')
                return false
            }
            if(this.grid[toIndex].isSnake){
                alert('Game over!! Collided')
                return false;
            }

            //eat food
            //only head can food
            if(i===0 &&this.foodIndex===toIndex){
                foodEaten = true
            }
            this.grid[_snakeIndex].reset()

            if(i===0){
                this.grid[toIndex].setSnake('head',_direction)
            }else if(i===this.snakeIndexes.length-1 && foodEaten===false){
                this.grid[toIndex].setSnake('tail',_direction)

                this.directions[_snakeIndex] = null
            }else{
                this.grid[toIndex].setSnake('body',_direction)
            }

           if(foodEaten){
               addTailIndex = _snakeIndex;
               addTailDirection = _direction
           }
           this.snakeIndexes[i] = toIndex
        }

        //add food as tail
        if(foodEaten){
            this.grid[addTailIndex].setSnake('Tail',addTailDirection)
            this.snakeIndexes.push(addTailIndex)
            //and create new food
            this.createFood()
        }
    }
}

export default Game