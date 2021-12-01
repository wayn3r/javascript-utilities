export class Format {
    // formater para hora y fecha
    static time = (time, format12 = false) => {
        if (!time) return time
        time = time.toString()
        while (time.length < 4) time = '0' + time
        let hora = time.substring(0, 2)
        let minuto = time.substring(2, 4)
        let meridiem = ''
        if (format12) {
            meridiem = ' AM'
            hora = hora.replace(/^00/, '12')
            if (parseInt(hora) > 12) {
                hora = hora - 12
                hora = hora.toString().length === 1 ? '0' + hora : hora
                meridiem = ' PM'
            }
        }
        time = hora + ':' + minuto + meridiem
        return time
    }
    static date = value => {
        if (value === undefined || value === null) return value
        return value.toString().split('-').reverse().join('/')
    }

    // formater de colores
    static formatColor = color => {
        if (typeof color !== 'string' || !/(^[^()#]+$)/g.test(color))
            return color
        color = color.trim()
        return `var(--${color.replace(/\s/g, '-')})`
    }

    // formater de numeros
    static #formatNumber = (value, config) => {
        if (isNaN(value)) return value
        const format = Intl.NumberFormat('do-DO', config)
        return format.format(value)
    }
    static currency = value => {
        return this.#formatNumber(value, {
            currency: 'DOP',
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }
    static decimal = value => {
        return this.#formatNumber(value, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }
    static number = value => {
        return this.#formatNumber(value, {
            minimumFractionDigits: 0,
        })
    }
    static percent = (value, decimals = 0) => {
        if (isNaN(value)) return value
        decimals = isNaN(decimals) ? 0 : decimals
        return this.#formatNumber(value / 100, {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })
    }
}

