import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholder from "../../img/placeholder.jpg";
import "./_LazyLoadImageComp.scss";

function LazyLoadImageComp({ src, alt, className, wrapperClassName }) {
  return (
    <LazyLoadImage
      style={{ display: "block" }}
      placeholderSrc={placeholder}
      effect="blur"
      wrapperClassName={wrapperClassName || "preview-image-wrapper"}
      className={className || ""}
      src={src}
      alt={alt}
    />
  );
}

export default LazyLoadImageComp;
