import { useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MaterialInputAddress } from "features/shared/presentation/components";

export function AdminStoreSelector() {
  const [marker, setMarker] = useState<{ lat: number; lng: number }>({
    lat: 14.660950420631163,
    lng: 121.0873865267099,
  });
  const [center, setCenter] = useState<any>();
  const [address, setAddress] = useState("");

  return (
    <>
      <MaterialInputAddress
        value={address}
        onChange={(val) => {
          setAddress(val);
        }}
        onDenied={() => {}}
        onPrompt={() => {}}
        onLocateCurrentAddress={(place) => {
          setCenter({
            lat: place.lat,
            lng: place.lng,
          });
          setMarker({
            lat: place.lat,
            lng: place.lng,
          });
          setAddress(place.formattedAddress);
        }}
        onPlaceSelected={(place) => {
          setCenter({
            lat: place.lat,
            lng: place.lng,
          });

          setMarker({
            lat: place.lat,
            lng: place.lng,
          });
          setAddress(place.formattedAddress);
        }}
      />
      <h4 className="mt-1 text-sm leading-5 text-secondary">
        <strong>Note:</strong> you can mark your position in the map by left
        clicking to be more accurate
      </h4>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: 400,
        }}
        zoom={18}
        center={center}
        onClick={(e) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            var latlng: any = new google.maps.LatLng(lat, lng);

            const geocoder: any = new google.maps.Geocoder();

            geocoder.geocode(
              { latLng: latlng },
              function (results: any, status: any) {
                if (status === google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                    const place = results[0].formatted_address;

                    setAddress(place);
                    setMarker({
                      lat,
                      lng,
                    });
                  } else {
                    console.log("No results found");
                  }
                } else {
                  console.log("Geocoder failed due to: " + status);
                }
              }
            );
          }
        }}
      >
        <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />
      </GoogleMap>
    </>
  );
}
