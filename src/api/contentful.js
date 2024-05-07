import * as contentful from "contentful-management";

export default async function Post(req, res) {
  const { firstName, lastName } = req.body;
  console.log(firstName);
  console.log(lastName);
  console.log(req.body);
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CMA_TOKEN,
  });
  try {
    const space = await client.getSpace("zu7mvllbia1d");
    const environment = await space.getEnvironment("master");
    const entry = await environment.createEntry("test", {
      fields: {
        firstName: {
          "en-US": firstName,
        },
        lastName: {
          "en-US": lastName,
        },
      },
    });
    return res.status(200).json({ message: "请求成功！", entry });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
