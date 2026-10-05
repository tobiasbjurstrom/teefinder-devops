import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CoursesView from './views/coursesView';

describe('CoursesView Component Tests using jest-dom', () => {
  // Mock model that mimics TeeFinder's GolfCourseModel
  const mockModel = {
    getCourseNames: () => [
      'Gärdet Golfklubb',
      'Stockholm Golf Club'
    ]
  };

  test('renders course names and favourite buttons from model data', () => {
    const handleFavourite = jest.fn();
    const handleCourseClick = jest.fn();

    render(
      <CoursesView
        model={mockModel}
        clickOnFavourites={handleFavourite}
        clickOnCourse={handleCourseClick}
      />
    );

    // 1. Verify both course titles are in the DOM
    const courseOne = screen.getByText('Gärdet Golfklubb');
    const courseTwo = screen.getByText('Stockholm Golf Club');
    expect(courseOne).toBeInTheDocument();
    expect(courseTwo).toBeInTheDocument();

    // 2. Verify the "Add to Favourites" buttons rendered
    const favouriteButtons = screen.getAllByRole('button', { name: /add to favourites/i });
    expect(favouriteButtons).toHaveLength(2);
  });

  test('clicking "Add to Favourites" triggers the callback with correct course name', () => {
    const handleFavourite = jest.fn();
    const handleCourseClick = jest.fn();

    render(
      <CoursesView
        model={mockModel}
        clickOnFavourites={handleFavourite}
        clickOnCourse={handleCourseClick}
      />
    );

    // Click the first favourite button
    const firstFavButton = screen.getAllByRole('button', { name: /add to favourites/i })[0];
    fireEvent.click(firstFavButton);

    // Assert that the callback was fired once with "Gärdet Golfklubb"
    expect(handleFavourite).toHaveBeenCalledTimes(1);
    expect(handleFavourite).toHaveBeenCalledWith('Gärdet Golfklubb');
  });
});