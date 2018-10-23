import cors from '../commons/cors';

const appCors = cors(process.env);

export default async function applyCORS(req, res, next) {
  res.header('Access-Control-Allow-Origin', appCors.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}
