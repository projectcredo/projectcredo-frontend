export default function (req, res, next) {
  res.writeHead(301, { Location: `${process.env.API_URL}/system${req.url}` })
  res.end()
}
