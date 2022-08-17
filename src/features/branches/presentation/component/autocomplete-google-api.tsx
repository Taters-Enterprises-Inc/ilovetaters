import React, { useEffect, useRef, useState } from "react";

export default function AutocompleteGoogleApi() {
  const [input, setInput] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(!ref.current) return

     const autocomplete = new google.maps.places.Autocomplete(ref.current ,  { componentRestrictions: { country: "ph" } });
     autocomplete.addListener("place_changed",()=>{
       const place = autocomplete.getPlace()
       console.log(place)
     })
  })

  return (
    <div>
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
      />
    </div>
  );
}
