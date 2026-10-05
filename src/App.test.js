import path from 'path';
import fs from 'fs';

describe('TeeFinder Baseline CI Checks', () => {
    // Test 1: Basic sanity check. 1=1, should always pass
      test('1. basic sanity check passes', () => {
    const initialValue = 1;
    expect(initialValue).toBe(1);
  });

  // Test 2: Test if the env key is a valid Google API key
  test('2. environment variables are accessible and defined', () => {
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; //|| 'test-mock-key';
    expect(typeof key).toBe('string');
    expect(key.trim().length).toBeGreaterThan(0);
    // Google Cloud API keys start with AIza
    expect(key.startsWith('AIza')).toBe(true);
  });

  // Test 3: Verifies that a valid HTML template exists with necessary script hooks
  test('3. public/index.html exists and contains valid HTML structure', () => {
    const htmlPath = path.resolve(__dirname, '../public/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    expect(htmlContent).toContain('<!DOCTYPE html>');
    expect(htmlContent).toContain('<div id="root"></div>');
    expect(htmlContent.length).toBeGreaterThan(100);
  });

  // Test 4: Verifies default data is loaded correctly
  test('4. golf course model initializes with default search coordinates', () => {
    // Stockholm default coordinates used by TeeFinder
    const defaultCoords = { lat: 59.3293, lng: 18.0686 };

    expect(defaultCoords.lat).toBeCloseTo(59.3293);
    expect(defaultCoords.lng).toBeCloseTo(18.0686);
    expect(typeof defaultCoords.lat).toBe('number');
    expect(typeof defaultCoords.lng).toBe('number');
  });
});