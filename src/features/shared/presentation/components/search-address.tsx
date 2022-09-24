import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { setAddressShopHomePage } from "features/shop/presentation/slices/shop-home-page.slice";
import { useEffect, useRef, useState } from "react";
import { selectGetSession } from "../slices/get-session.slice";

let autoComplete: any;

const loadScript = (url: any, callback: any) => {
  let script: any = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(
  setQuery: any,
  onPlaceSelected: any,
  autoCompleteRef: any,
  geolocate: any
) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "ph" } }
  );

  geolocate();
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () => {
    onPlaceSelected(autoCompleteRef.current.value);
    setQuery(autoCompleteRef.current.value);
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

interface SearchAddressProps {
  onPlaceSelected: any;
  value: string;
  onChange: (newValue: string) => void;
  onLocateCurrentAddress: (place: string) => void;
}

export function SearchAddress(props: SearchAddressProps) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyAi3QDkRTVGFyD4vuUS0lEx080Nm6GNsI8&libraries=places`,
      () =>
        handleScriptLoad(
          props.onChange,
          props.onPlaceSelected,
          autoCompleteRef,
          geolocate
        )
    );
  }, []);

  const geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
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
              let city: any;
              if (results[1]) {
                const place = results[0].formatted_address;
                console.log(place);
                props.onLocateCurrentAddress(place);
                //find country name
                // for (var i = 0; i < results[0].address_components.length; i++) {
                //   for (
                //     var b = 0;
                //     b < results[0].address_components[i].types.length;
                //     b++
                //   ) {
                //     //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                //     if (
                //       results[0].address_components[i].types[b] ==
                //       "administrative_area_level_1"
                //     ) {
                //       //this is the object you are looking for
                //       city = results[0].address_components[i];
                //       break;
                //     }
                //   }
                // }
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          }
        );
      });
    }
  };

  return (
    <input
      ref={autoCompleteRef}
      onChange={(event) => props.onChange(event.target.value)}
      value={props.value}
      placeholder=" "
    />
  );
}
