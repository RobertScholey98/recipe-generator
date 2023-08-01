import { hasChild } from './hasChild';

describe('hasChild', () => {
  it('should return true if object has properties', () => {
    const obj = { child: "childValue" };
    const result = hasChild(obj);
    expect(result).toBe(true);
  });

  it('should return false if object has no children', () => {
    const obj = {};
    const result = hasChild(obj);
    expect(result).toBe(false);
  });
});
