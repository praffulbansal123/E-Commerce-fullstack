const CURRENY_FORMATER = new Intl.NumberFormat(undefined, {
    currency: 'INR', style: 'currency'
})

export const formatCurrency = (number: number) => {
    return CURRENY_FORMATER.format(number)
}