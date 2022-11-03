import Rating from "@mui/material/Rating";
import * as React from "react";

export function RatingCustomer() {
  const [value, setValue] = React.useState<number | null>(3);

  return (
    <Rating
      sx={{
        "& .MuiRating-iconEmpty": {
          color: "#fff",
        },
        "& .MuiRating-iconHover": {
          color: "yellow",
        },
      }}
      className="rating"
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
