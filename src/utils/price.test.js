import {it,expect,describe} from 'vitest';
import { formatPrice } from './price.js';


describe('formatPrice',()=>{

    it('format 1990 cents as $19.90', () => {
  expect(formatPrice(1990)).toBe('$19.90');
});

it('displays 2 decimals',()=>{
    expect(formatPrice(1090)).toBe('$10.90');
    expect(formatPrice(100)).toBe('$1.00');
  
})

});
