import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useRef } from "react";

import MapContext from "../contexts/mapContext.js";
import SearchQueryContext from "../contexts/searchQueryContext.js";
import PredictedPlacesContext from "../contexts/predictedPlacesContext.js";
import CurrentLocationContext from "../contexts/currentLocation.js";
import AddingMarkersContext from "../contexts/addingMarkers.js";
import MarkersContext from "../contexts/markersContext.js";

import RootLayout from "../layouts/rootLayout/RootLayout.jsx";
import ErrorElement from "../components/errorElement/errorElement.jsx";
import MapLayout from "../layouts/mapLayout/MapLayout.jsx";
import NearByPlacesLayout from "../layouts/nearByPlacesLayout/NearByPlacesLayout.jsx";
import FindPlacesLayout from "../layouts/findPlacesLayout/findPlacesLayout.jsx";
import PlaceDetailsLayout from "../layouts/placeDetailsLayout/PlaceDetailsLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/map",
        element: <MapLayout />,
        children: [
          {
            path: "/map/nearbyplaces",
            element: <NearByPlacesLayout />,
          },
          {
            path: "/map/findplaces/:searchQuery",
            element: <FindPlacesLayout />,
          },
        ],
      },
      {
        path: "/placesdetails/:place_id",
        element: <PlaceDetailsLayout />,
      },
    ],
  },
]);

function App() {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const markersDataRef = useRef(null);
  const addingMarkers = useRef(false);
  const [placePredictionValue, setPlacePredictionValue] = useState([]);
  return (
    <MapContext.Provider value={[map, setMap]}>
      <CurrentLocationContext.Provider
        value={[currentLocation, setCurrentLocation]}
      >
        <AddingMarkersContext.Provider value={addingMarkers}>
          <MarkersContext.Provider value={markersDataRef}>
            <SearchQueryContext.Provider value={[searchQuery, setSearchQuery]}>
              <PredictedPlacesContext.Provider
                value={[placePredictionValue, setPlacePredictionValue]}
              >
                <RouterProvider router={router} />
              </PredictedPlacesContext.Provider>
            </SearchQueryContext.Provider>
          </MarkersContext.Provider>
        </AddingMarkersContext.Provider>
      </CurrentLocationContext.Provider>
    </MapContext.Provider>
  );
}

export default App;
