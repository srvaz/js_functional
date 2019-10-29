import { handleStatus } from '../utils/promise-helper.js'
import { partialize, pipe } from '../utils/operators.js'

const API = 'http://localhost:3000/notas';

// Performs a flat map of API response
const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
// Performs a filter by code
const filterItemsByCode = (code, items) => items.filter(item => item.codigo == code);
// Sum the nota values
const sumItemsValue = items => items.reduce((total, item) => total + item.valor, 0);

export const notasService = {
    // Get all notas
    listAll: () => fetch(API)
        .then(handleStatus)
        .catch(err => (
            console.log(err),
            Promise.reject('Não foi possível acessar as notas fiscais!')
        )),
    // Sum all notas response values
    sumItems: (code) => {
        // Create partial application of filterItemsByCode
        const filterItems = partialize(filterItemsByCode, code);

        const sumItems = pipe(
            getItemsFromNotas,
            filterItems,
            sumItemsValue
        )

        return notasService.listAll()
            .then(sumItems)
    }
}