export default function (req, res, next) {
  res.writeHead(301, { Location: `${process.env.API_URL}/images${req.url}` })
  res.end()
}
