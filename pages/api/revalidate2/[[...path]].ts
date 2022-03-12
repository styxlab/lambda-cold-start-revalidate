import type { NextApiRequest, NextApiResponse } from "next";

const first = (str: string | string[]): string =>
  Array.isArray(str) ? str[0] : str;

const revalidate = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = first(req.query.path || "");
  console.log("revalidate", path);

  try {
    if (path.length > 0) {
      //const p1 = res.unstable_revalidate("/");
      //const p2 = res.unstable_revalidate(`/${path}`);
      //await Promise.all([p1, p2]);
    } else {
      await res.unstable_revalidate("/");
    }
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
};

export default revalidate;
