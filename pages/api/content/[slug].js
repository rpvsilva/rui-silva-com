
export default async (req, res) => {
  return res.status(200).json(await makeRequest(req.params.slug));
} 