import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

interface MediaProps {
  src: string | File;
  className?: string;
  alt?: string;
}

export function Media(props: MediaProps) {
  let extension = "";
  let src = "";

  if (props.src instanceof File) {
    const fileName = props.src["name"];
    if (fileName) {
      extension = fileName.split(".").pop() ?? "";
    }

    src = URL.createObjectURL(props.src as File);
  } else {
    extension = props.src.split(".").pop() ?? "";

    src = props.src;
  }

  switch (extension) {
    case "jpg":
      return (
        <img
          src={src}
          alt={props.alt}
          className={props.className}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
          }}
        />
      );
    case "mp4":
      return (
        <video className={props.className} autoPlay loop muted>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
  }
  return (
    <img
      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`}
      alt="image_not_found"
    />
  );
}
