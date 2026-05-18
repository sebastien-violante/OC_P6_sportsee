export default function handleKeyboard(event, options) {

    const { first, last} = options
    
    const active = document.activeElement
    const handlers = {
        Tab: (event) => {
            if (event.shiftKey && active === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && active === last) {
                event.preventDefault()
                first.focus()
            }
        }
    }
    handlers[event.key]?.(event)
}