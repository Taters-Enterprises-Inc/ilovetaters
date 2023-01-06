import { useState, useCallback, memo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

function AdminStoreSelector() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number }>({
    lat: 14.660950420631163,
    lng: 121.0873865267099,
  });

  return (
    <GoogleMap
      zoom={10}
      mapContainerStyle={{
        width: "100%",
        height: 400,
      }}
      center={{
        lat: 14.660950420631163,
        lng: 121.0873865267099,
      }}
      onClick={(e) => {
        if (e.latLng) {
          setMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }
      }}
    >
      <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />
    </GoogleMap>
  );
}

export default memo(AdminStoreSelector);
