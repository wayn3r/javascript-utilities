/**
 * Hace scroll horizonatal a un elemento dado
 * @param {HTMLElement} elemento
 * @param {Number} movimiento
 */
export const scrollX = (elemento, movimiento = 0) => {
    if (!(elemento instanceof HTMLElement))
        throw new Error('El elemento no es un elemento HTML')

    const { scrollWidth, scrollLeft, offsetWidth } = elemento
    const move = Math.round(movimiento * 0.5)
    const scroll = scrollLeft - move
    const bounceLeft = scroll + offsetWidth > scrollWidth
    const bounceRight = scroll < move

    bounceLeft
        ? elemento.classList.add('bounceLeft')
        : elemento.classList.remove('bounceLeft')

    bounceRight
        ? elemento.classList.add('bounceRight')
        : elemento.classList.remove('bounceRight')

    elemento.scrollTo(scroll, 0)
    const max_move = 10
    movimiento =
        move > max_move ? max_move : move < -max_move ? -max_move : move
    const time = Math.abs(movimiento * 3)
    if (
        !bounceRight &&
        !bounceLeft &&
        ((movimiento > 0 && movimiento--) || (movimiento < 0 && movimiento++))
    )
        setTimeout(() => scrollX(elemento, movimiento), time)
}
