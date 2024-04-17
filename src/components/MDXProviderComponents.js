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
  <p className="text-lg leading-loose text-gray-p tracking-wider" {...props} />
);
const ol = ({ children, ...props }) => (
  <ol className="text-lg list-decimal list-inside text-gray-p tracking-wider font-semibold leading-loose">
    {children}
  </ol>
);
const ul = ({ children, ...props }) => (
  <ul className="text-lg list-disc list-inside text-gray-p tracking-wider font-semibold leading-loose">
    {children}
  </ul>
);
const em = ({ children, ...props }) => (
  <em className="not-italic bg-blue-100 px-2 py-[1px] rounded-md" {...props}>
    {children}
  </em>
);
const strong = ({ children, ...props }) => (
  <em className="font-bold" {...props}>
    {children}
  </em>
);

export const MDXProviderComponents = {
  h1: h1,
  h2: h2,
  h3: h3,
  p: p,
  ol: ol,
  ul: ul,
  em: em,
  strong: strong,
};
