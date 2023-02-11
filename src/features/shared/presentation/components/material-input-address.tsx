import { InputBaseComponentProps } from "@mui/material/InputBase";
import { useRef, useEffect } from "react";
import { MaterialInput } from "./material-input";

let autoComplete: any;

function handleScriptLoad(
  onPlaceSelected: (location: {
    lat: number;
    lng: number;
    formattedAddress: string;
  }) => void,
  autoCompleteRef: InputBaseComponentProps,
  geolocate: any
) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "ph" } }
  );

  geolocate();
  autoComplete.addListener("place_changed", () => {
    var place = autoComplete.getPlace();

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    onPlaceSelected({
      lat,
      lng,
      formattedAddress: place.formatted_address,
    });
    handlePlaceSelect();
  });
}

var componentForm: any = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};

async function handlePlaceSelect() {
  try {
    const addressObject = autoComplete.getPlace();

    for (var component in componentForm) {
      var elementComponent: any = document.getElementById(component);
      elementComponent.value = "";
      elementComponent.disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < addressObject.address_components.length; i++) {
      var addressType = addressObject.address_components[i].types[0];

      if (componentForm[addressType]) {
        var val =
          addressObject.address_components[i][componentForm[addressType]];
        const elementAddressType: any = document.getElementById(addressType);
        elementAddressType.value = val;
      }
    }
  } catch (error) {
    // window.location.reload(false);
  }
}

interface MaterialInputAddressProps {
  onPrompt: () => void;
  onDenied: () => void;
  onChange: (address: string) => void;
  value: string;
  onPlaceSelected: (location: {
    lat: number;
    lng: number;
    formattedAddress: string;
  }) => void;
  onLocateCurrentAddress: (location: {
    lat: number;
    lng: number;
    formattedAddress: string;
  }) => void;
}

export function MaterialInputAddress(props: MaterialInputAddressProps) {
  const autoCompleteRef = useRef();

  useEffect(() => {
    handleScriptLoad(props.onPlaceSelected, autoCompleteRef, geolocate);
  }, []);

  const geolocate = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "prompt") {
          props.onPrompt();
        } else if (result.state === "denied") {
          props.onDenied();
        }
      });
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          });

          var latlng: any = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const geocoder: any = new google.maps.Geocoder();
          autoComplete.setBounds(circle.getBounds());

          geocoder.geocode(
            { latLng: latlng },
            function (results: any, status: any) {
              if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  const place = results[0].formatted_address;

                  props.onLocateCurrentAddress({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    formattedAddress: place,
                  });
                } else {
                  console.log("No results found");
                }
              } else {
                console.log("Geocoder failed due to: " + status);
              }
            }
          );
        },
        (i) => console.log("failed", i)
      );
    }
  };

  return (
    <MaterialInput
      inputRef={autoCompleteRef}
      colorTheme="black"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      name=""
      label="Search Address"
      fullWidth
      placeholder=" "
    />
  );
}
