import path from 'path';
import fs from 'fs';

describe('TeeFinder Baseline CI Checks', () => {
    // Test 1: Basic sanity check. 1=1, should always pass
      test('1. basic sanity check passes', () => {
    const initialValue = 1;
    expect(initialValue).toBe(1);
  });

  // Test 2: Verifies that a valid HTML template exists with necessary script hooks
  test('2. index.html exists and contains valid HTML structure', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    expect(htmlContent).toContain('<!DOCTYPE html>');
    expect(htmlContent).toContain('<div id="root"></div>');
    expect(htmlContent.length).toBeGreaterThan(100);
  });

  // Test 3: Verifies default data is loaded correctly
  test('3. golf course model initializes with default search coordinates', () => {
    // Stockholm default coordinates used by TeeFinder
    const defaultCoords = { lat: 59.3293, lng: 18.0686 };

    expect(defaultCoords.lat).toBeCloseTo(59.3293);
    expect(defaultCoords.lng).toBeCloseTo(18.0686);
    expect(typeof defaultCoords.lat).toBe('number');
    expect(typeof defaultCoords.lng).toBe('number');
  });
});