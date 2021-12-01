const mile2kilometers = 1.60934
const kilo = 1000

export const haversine = (mk1, mk2, medida = 'm') => {
    if (!mk1?.latitud || !mk2?.latitud || !mk1?.longitud || !mk2?.longitud)
        return
    const R = 3958.8 // Radius of the Earth in miles
    const rlat1 = mk1.latitud * (Math.PI / 180) // Convert degrees to radians
    const rlat2 = mk2.latitud * (Math.PI / 180) // Convert degrees to radians
    const difflat = rlat2 - rlat1 // Radian difference (latitudes)
    const difflon = (mk2.longitud - mk1.longitud) * (Math.PI / 180) // Radian difference (longitudes)

    let distance =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2)
            )
        )

    switch (medida) {
        case 'm':
            distance = distance * mile2kilometers * kilo
            break
        case 'km':
            distance = distance * mile2kilometers
            break
        default:
            break
    }
    return distance
}
