import React from "react";

const h1 = (props) => (
  <h1 className="text-3xl leading-relaxed font-semibold py-2" {...props} />
);
const h2 = (props) => (
  <h2 className="text-2xl leading-relaxed font-semibold py-1" {...props} />
);
const h3 = (props) => (
  <h3 className="text-xl leading-relaxed font-semibold py-1" {...props} />
);
const p = (props) => (
  <p
    className="text-lg leading-loose text-gray-p tracking-wider font-light"
    {...props}
  />
);
const ol = (props) => {
  <ol style={{ color: "red" }} {...props} />;
};
const ul = (props) => {
  <ul className="list-disc" {...props} />;
};
const li = (props) => {
  <li className="text-red-300" {...props} />;
};

export const MDXProviderComponents = {
  h1: h1,
  h2: h2,
  h3: h3,
  p: p,
  ol: ol,
  ul: ul,
};
