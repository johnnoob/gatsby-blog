import React, { useRef } from "react";
import { createClient } from "contentful-management";

const Upload = () => {
  const inputRef = useRef(null);
  const handleUpload = async () => {
    const file = inputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const client = createClient({
      accessToken: process.env.CONTENTFUL_CMA_TOKEN,
    });
    try {
      const space = await client.getSpace("zu7mvllbia1d");
      const environment = await space.getEnvironment("master");
      const asset = await environment.createAssetFromFiles({
        fields: {
          title: {
            "en-US": "Test10",
          },
          description: {
            "en-US": "測試10",
          },
          file: {
            "en-US": {
              contentType: file.type,
              fileName: file.name,
              file: file,
            },
          },
        },
      });
      const processedAsset = await asset.processForAllLocales();
      console.log("haha");
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(); // 表示setTimeout執行完畢，可以繼續執行後續的代碼
        }, 5000); // 1000毫秒，即1秒後執行console.log('haha')
      });
      await processedAsset.publish();
      console.log("測試成功");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="file" ref={inputRef} />
      <button className="px-2 py-1 border-2" onClick={handleUpload}>
        上傳檔案
      </button>
    </div>
  );
};

export default Upload;
