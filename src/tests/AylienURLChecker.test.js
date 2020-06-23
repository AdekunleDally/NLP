import { aylienURL } from '../client/js/AylienURLChecker'
import "regenerator-runtime/runtime.js";

describe('Test "aylienURL()" should exist' , () => {
  test('It should return true', async () => {
    expect(aylienURL).toBeDefined();
  });
});