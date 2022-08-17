import React from "react";

export function mouseover(
  id: string,
  setState: (value: React.SetStateAction<boolean>) => void
) {
  const element = document.getElementById(`${id}`);
  const handleMouseEvent = () => {
    setState(true);
  };
  element?.addEventListener("mouseover", handleMouseEvent);

  return () => {
    element?.removeEventListener("mouseover", handleMouseEvent);
  };
}

export function mouseleave(
  id: string,
  setState: (value: React.SetStateAction<boolean>) => void
) {
  const element = document.getElementById(`${id}`);
  const handleMouseEvent = () => {
    setState(false);
  };
  element?.addEventListener("mouseleave", handleMouseEvent);

  return () => {
    element?.removeEventListener("mouseleave", handleMouseEvent);
  };
}
