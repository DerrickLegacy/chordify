import { useState } from "react";
import SectionHeader from "../../components/section_header/SectionHeader";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";
import AnimatedEventCategory from "../../components/card/AnimatedEventCategory";

export default function Events() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const allEventUrl = "http://54.210.95.246:3005/api/v1/events/all-events";
  const {
    response: apiResponse,
    loading: allEventsLoading,
    error: allEventsError,
  } = useAxiosGetFetch(allEventUrl);

  const isLoading = allEventsLoading;
  const hasError = allEventsError;

  if (isLoading)
    return <div className="text-center py-20">Loading events...</div>;
  if (hasError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data. Please try again later.
      </div>
    );

  // Transform the API response into a standardized format
  const transformEvents = (apiData) => {
    if (!apiData) return [];

    return Object.entries(apiData).map(([category, events]) => ({
      categoryName: category,
      key: category,
      events: events.map((event) => ({
        id: event.id,
        name: event.heading,
        images: [
          event.bannerImages1,
          event.bannerImages2,
          event.bannerImages3,
        ].filter(Boolean),
        date: event.calendarDates,
        duration: `${event.numberOfDays} days`,
        about: event.about,
        schedule: event.schedule,
        ...event,
      })),
    }));
  };

  const categorizedEvents = apiResponse ? transformEvents(apiResponse) : [];

  const shouldShowViewAll = categorizedEvents.some(
    (category) => category.events.length > 3
  );

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredEvents =
    selectedCategories.length > 0
      ? categorizedEvents.filter((cat) =>
          selectedCategories.includes(cat.categoryName)
        )
      : categorizedEvents;

  return (
    <div className="flex flex-col md:flex-row md:items-start max-w-9/12 mx-auto">
      <div className="w-full md:w-1/5 p-4 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 md:mt-16">
          <h3 className="mb-4 font-semibold text-black">Search By Category</h3>
          <ul className="space-y-2">
            {categorizedEvents.map(({ categoryName, key }) => (
              <li key={key} className="flex items-center">
                <input
                  id={`${key}-checkbox`}
                  type="checkbox"
                  checked={selectedCategories.includes(categoryName)}
                  onChange={() => handleCategoryToggle(categoryName)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`${key}-checkbox`}
                  className="ml-2 text-sm text-gray-700 capitalize"
                >
                  {categoryName.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Events Content */}
      <div className="w-full md:w-4/5">
        <section className="pt-16 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <SectionHeader
            mainText={"Events"}
            minorText={"Upcoming"}
            description={
              "Discover breathtaking experiences tailored for adventure seekers"
            }
          />

          {filteredEvents.map(({ categoryName, events }) => (
            <AnimatedEventCategory
              key={categoryName}
              categoryName={categoryName}
              events={events}
              showAll={showAll}
            />
          ))}

          {shouldShowViewAll && (
            <div className="text-center mt-12">
              <button
                className="px-6 py-3 border border-[#f84d32] text-[#e27160] rounded-full font-medium hover:bg-[#f84d32] hover:text-white transition-colors"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "View All Adventures"}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
