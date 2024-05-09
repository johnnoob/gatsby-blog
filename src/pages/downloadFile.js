import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Download = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulDownload {
        edges {
          node {
            id
          }
        }
        nodes {
          file {
            publicUrl
            placeholderUrl
          }
        }
      }
    }
  `);
  const url = data.allContentfulDownload.nodes[0].file[0].publicUrl;
  console.log(url);
  return (
    <div>
      <a href={url} download="filename">
        下載
      </a>
    </div>
  );
};

export default Download;
