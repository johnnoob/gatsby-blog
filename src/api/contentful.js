import * as contentful from "contentful-management";

// export default async function Post(req, res) {
//   const { text } = req.body;
//   console.log(text);
//   const client = contentful.createClient({
//     accessToken: process.env.CONTENTFUL_CMA_TOKEN,
//   });
//   try {
//     const space = await client.getSpace("zu7mvllbia1d");
//     const environment = await space.getEnvironment("master");
//     const entry = await environment.createEntry("richText", {
//       fields: {
//         message: {
//           "en-US": text,
//         },
//       },
//     });
//     return res.status(200).json({ message: "请求成功！", entry });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// }

export default async function Post(req, res) {
  const { text } = req.body;
  console.log(text);
}
