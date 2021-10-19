class Cell {
    constructor(index,element){
        this.index = index ;
        this.element = element ;
        this.direction = null ;
        this.isSnake  = null ;
    }
    setSnake(part,direction){
         this.resetSnakeClasses()
         this.element.classList.add(`is-${part}`)
         this.setDirection(direction)
         this.isSnake = true
    }
    resetSnakeClasses(){
        this.element.classList.remove('is-head','is-tail','is-body')
        this.element.classList.remove('is-head')
        this.element.classList.remove('is-tail')
        this.element.classList.remove('is-body')
    }
    setDirection(direction){
        this.direction = direction
        this.resetDirectionClasses()
        this.element.classList.add(`${direction}-direction`)

    }
    resetDirectionClasses(){
        this.element.classList.remove('right-direction')
        this.element.classList.remove('left-direction')
        this.element.classList.remove('down-direction')
    }
    addFood(){
            this.element.classList.add('has-food')
    }
    removeFood(){
        this.element.classList.remove('has-food')
    }
    reset(){
        this.resetDirectionClasses()
        this.resetSnakeClasses()
        this.isSnake = false
    }
   
}

export default Cell