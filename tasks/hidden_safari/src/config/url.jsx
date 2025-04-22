const API_PREFIX = import.meta.env.VITE_API_URL;

export const API_URL = {
  LOGIN: `${API_PREFIX}auth/login`,
  SNOW_TREK: `${API_PREFIX}events/snow-treks-events`,
  SUMMER_EVENT: `${API_PREFIX}events/summer-events`,
  EPIC_ADVENTURE: `${API_PREFIX}events/epic-adventure-events`,
  SPECIAL_EVENTS: `${API_PREFIX}events/special-events`,
  MONSOON_TREKKING: `${API_PREFIX}events/monsoon-events`,
  HIGHLIGHTED_EVENTS: `${API_PREFIX}events/highlighted-events`,
  ALL_EVENTS: `${API_PREFIX}events/all-events`,
  TEAM: `${API_PREFIX}team`,
  ABOUT: `${API_PREFIX}info/about-us`,
  AN_EVENT: (id) => `${API_PREFIX}events/${id}`,
};