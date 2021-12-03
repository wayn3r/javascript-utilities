import { queryParams } from '../../helpers/query-params'

describe('Pruebas en query-params', () => {
    test('debe devolver un objeto con todos los parametros', () => {
        const q = '?a=1&b=2&c=3'
        const expectedParams = {
            a: '1',
            b: '2',
            c: '3',
        }
        const params = queryParams(q)
        expect(params).toEqual(expectedParams)
    })
})
