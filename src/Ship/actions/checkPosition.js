const positions = [
    'top-middle-position','top-left-position','top-right-position','bottom-right-position',
    'bottom-left-position','bottom-middle-position','right-position',
    'left-position','middle-middle-position'
]

const getPositionOfTheElement = domElement => {
    const { x, y, width, height } = domElement.getBoundingClientRect()

    return {
        xPos: x + width,
        yPos: y + height
    }
}

const filterCorrectPositions = exceptedClasses => {
    const correctPositions = positions.filter(item => !exceptedClasses.includes(item))
    return correctPositions[correctPositions.length - 1]
}

const getScreenSize = () => ({
    screenInnerHeight: window.innerHeight,
    screenInnerWidth: window.innerWidth
})

const findClassExceptions = (domElement, defaultPosition) => {
    const exceptionElements = []

    const { screenInnerHeight, screenInnerWidth } = getScreenSize()

    positions.forEach(className => {
        if (className !== defaultPosition) {
            domElement.classList.add(className)

            const { xPos, yPos } = getPositionOfTheElement(domElement)

            if (screenInnerWidth <= xPos || screenInnerHeight <= yPos) {
                exceptionElements.push(className)
            }

            domElement.classList.remove(className)
            domElement.classList.remove(defaultPosition)
        }
    })
    return setCorrectPosition(exceptionElements, defaultPosition, domElement)
}

const setCorrectPosition = (exceptedClasses, defaultPosition, domEl) => {
    if (exceptedClasses.length) {
        domEl.classList.remove(defaultPosition)
        domEl.classList.add(filterCorrectPositions(exceptedClasses))
    } else {
        domEl.classList.add(defaultPosition)
    }
}

export default (domElement, defaultElementPosition) => findClassExceptions(domElement, defaultElementPosition)