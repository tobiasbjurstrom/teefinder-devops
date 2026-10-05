import { getClickedLat, getClickedLng } from './googleMapsSource';

export async function fetchGolfCourses() {
  const lat = getClickedLat();
  const lng = getClickedLng();

  if (lat === null || lng === null) {
    console.warn('Coordinates not set');
    return [];
  }

  // Ensure Places library is loaded
  const { Place, SearchNearbyRankPreference } = await window.google.maps.importLibrary('places');

  const request = {
    fields: ['displayName', 'location', 'rating', 'formattedAddress', 'id'],
    locationRestriction: {
      center: { lat, lng },
      radius: 50000 // 50 km
    },
    includedPrimaryTypes: ['golf_course'],
    maxResultCount: 15,
    rankPreference: SearchNearbyRankPreference.POPULARITY
  };

  try {
    const { places } = await Place.searchNearby(request);

    if (!places || places.length === 0) {
      return [];
    }

return places.map((place, index) => {
  const courseTitle = place.displayName || place.name || `Golf Course ${index + 1}`;
  
  return {
    id: place.id || `course-${index}`,
    // Provide both variants to satisfy whatever the view looks for:
    name: courseTitle,
    club_name: courseTitle,
    course_name: courseTitle,
    
    // Address variants:
    address: place.formattedAddress || place.vicinity || 'Address unavailable',
    club_membership: 'Public',
    
    // Coordinates:
    latitude: place.location?.lat ? place.location.lat() : place.latitude,
    longitude: place.location?.lng ? place.location.lng() : place.longitude,
    };
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}