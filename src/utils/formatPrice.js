export const formatPrice = (amount) => {
    
    if (amount === undefined || amount === null) return '$0';
    
    
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
};