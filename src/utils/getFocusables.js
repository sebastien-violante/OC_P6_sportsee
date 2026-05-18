/**
 * Trouve et renvoie les éléments focusables à l'intérieur d'un élément fourni en paramètre
 * @returns {array} focusableElements - la liste des éléments focusables
 */

export default function getFocusables(element) {

    const focusableSelectors = 'button, [href], input, select, textarea'
    const focusables = Array.from(element.querySelectorAll(focusableSelectors))
    
    return focusables
}
