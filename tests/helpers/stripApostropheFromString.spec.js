/* eslint-disable no-undef */
/* eslint-disable no-console */

import stripApostropheFromString from '../../src/helpers/stripApostropheFromString';

describe('HELPERS: stripApostropheFromString', () => {
  it("should return \"'Escaped string!'\" if passed value is 'Escaped string!'", () => {
    const text = "'Escaped string!'";
    expect(stripApostropheFromString(text)).toEqual('Escaped string!');
  });

  it('should throw error if passed value is not escaped with apostrophes', () => {
    const text = 'Hello World!';
    expect(() => {
      stripApostropheFromString(text);
    }).toThrowError(/^STRING_NO_APOSTROPHES/);
  });

  it('should throw error if passed value is undefined', () => {
    expect(() => {
      stripApostropheFromString();
    }).toThrowError(/^STRING_NO_APOSTROPHES/);
  });
});
