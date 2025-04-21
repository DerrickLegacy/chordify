import { useState, useEffect } from "react";
import SectionHeader from "../../components/section_header/SectionHeader";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";
import AnimatedEventCategory from "../../components/card/AnimatedEventCategory";
import { FiFilter } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../../config/url";

export default function Events() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const allEventUrl = API_URL.ALL_EVENTS;
  const {
    response: apiResponse,
    loading: allEventsLoading,
    error: allEventsError,
  } = useAxiosGetFetch(allEventUrl);

  const isLoading = allEventsLoading;
  const hasError = allEventsError;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading events...", { id: "events-loading" });
    } else if (hasError) {
      toast.error("Failed to load events", { id: "events-loading" });
    } else if (apiResponse) {
      toast.success("Events loaded successfully", {
        id: "events-loading",
        duration: 2000,
      });
    }

    return () => {
      toast.dismiss("events-loading");
    };
  }, [isLoading, hasError, apiResponse]);

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

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  const filteredEvents =
    selectedCategories.length > 0
      ? categorizedEvents.filter((cat) =>
          selectedCategories.includes(cat.categoryName)
        )
      : categorizedEvents;

  if (isLoading) {
    return (
      <div className="text-center py-30">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            duration: 5000,
            error: {
              duration: 4000,
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center py-20 text-red-500">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:items-start md:max-w-9/12 mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "white",
            color: "black",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />

      {/* Desktop Sidebar Filter */}
      <div className="hidden sm:block w-full md:w-1/5 p-4 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
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
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-red-500 hover:underline"
          >
            Clear Filters
          </button>
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
          {/* Mobile Filter Button */}
          <div className="sm:hidden flex justify-end mb-4 px-4">
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <FiFilter size={20} />
              Filter
            </button>
          </div>

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

        {/* Mobile Filter Drawer */}
        {showFilterDrawer && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/5"
              onClick={() => setShowFilterDrawer(false)}
            ></div>

            <div className="ml-auto w-3/4 max-w-xs bg-white h-full shadow-lg p-4 z-50 animate-slide-in-right">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-black">Search By Category</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:underline flex items-center gap-1"
                >
                  Clear
                  <MdOutlineClear size={18} />
                </button>
              </div>

              <ul className="space-y-2">
                {categorizedEvents.map(({ categoryName, key }) => (
                  <li key={key} className="flex items-center">
                    <input
                      id={`${key}-mobile-checkbox`}
                      type="checkbox"
                      checked={selectedCategories.includes(categoryName)}
                      onChange={() => handleCategoryToggle(categoryName)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`${key}-mobile-checkbox`}
                      className="ml-2 text-sm text-gray-700 capitalize"
                    >
                      {categoryName.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-full bg-[#f84d32] text-white py-2 rounded"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
