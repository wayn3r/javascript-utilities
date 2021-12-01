export const getYears = (count, back = true) => {
    const date = new Date()
    const año = date.getFullYear()
    return [...Array(count)].map((year, idx) => {
        if (back) year = año - idx
        else year = año + idx

        return year
    })
}

export const getMonths = () => {
    return [...Array(12)].map((_, idx) => {
        let mes = idx + 1
        return { text: month(mes, true), value: mes }
    })
}
/**
 * Devuelve el string de un mes dato, empezando desde el 1
 * @param {Number} month El mes del año en formato numerico
 * @param {Boolean} capitalize Determina si el mes debe ser en mayusculas
 * @returns {String} El mes en formato texto
 */
export const month = (month, capitalize = false) => {
    if (isNaN(month)) return month
    month--
    const date = new Date()
    const options = { month: 'long' }
    date.setMonth(month)
    let mes = date.toLocaleDateString('es-DO', options)
    if (capitalize) {
        mes = mes.split('')
        mes[0] = mes[0].toUpperCase()
        mes = mes.join('')
    }
    return mes
}
