
import { formatPrice } from './utils/formatPrice';
import { validateEmail } from './utils/validation';

describe('Pruebas Unitarias Críticas', () => {

   
    test('formatPrice debe mostrar el signo peso y formato chileno', () => {
        const precio = 9990;
        const resultado = formatPrice(precio);
       
        expect(resultado).toMatch(/9.990/); 
        expect(resultado).toContain('$'); 
    });

    test('formatPrice debe manejar el cero', () => {
        const resultado = formatPrice(0);ß
        expect(resultado).toContain('0');
    });

    
    test('validateEmail debe aceptar un correo válido', () => {
        const correo = 'usuario@ejemplo.com';
        expect(validateEmail(correo)).toBe(true);
    });

    test('validateEmail debe rechazar un texto sin arroba', () => {
        const correo = 'hola-mundo';
        expect(validateEmail(correo)).toBe(false);
    });
});