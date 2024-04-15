import React from "react";

const h1 = (props) => (
  <h1
    className=" text-2xl leading-relaxed font-semibold flex items-center"
    {...props}
  />
);
const h2 = (props) => (
  <h2 className=" text-xl leading-relaxed font-semibold" {...props} />
);
const h3 = (props) => (
  <h3 className=" text-lg leading-relaxed font-semibold" {...props} />
);
const p = (props) => <p className=" leading-relaxed font-light" {...props} />;

export const MDXProviderComponents = {
  h1: h1,
  h2: h2,
  h3: h3,
  p: p,
};
