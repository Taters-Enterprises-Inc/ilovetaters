import { useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MaterialInputAddress } from "features/shared/presentation/components";

interface AdminSearchStoreCoordinatesProps {
  lat: number;
  lng: number;
  onLatLngChanged: (latLng: { lat: number; lng: number }) => void;
}

export function AdminSearchStoreCoordinates(
  props: AdminSearchStoreCoordinatesProps
) {
  const [center, setCenter] = useState<any>();
  const [address, setAddress] = useState("");

  const handleCoordinatesChanged = (place: {
    lat: number;
    lng: number;
    formattedAddress: string;
  }) => {
    const coordinates = {
      lat: place.lat,
      lng: place.lng,
    };

    setCenter(coordinates);
    props.onLatLngChanged(coordinates);
    setAddress(place.formattedAddress);
  };

  return (
    <>
      <MaterialInputAddress
        value={address}
        onChange={(val) => {
          setAddress(val);
        }}
        onDenied={() => {}}
        onPrompt={() => {}}
        onLocateCurrentAddress={handleCoordinatesChanged}
        onPlaceSelected={handleCoordinatesChanged}
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

                    props.onLatLngChanged({ lat, lng });
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
        <MarkerF position={{ lat: props.lat, lng: props.lng }} />
      </GoogleMap>
    </>
  );
}
