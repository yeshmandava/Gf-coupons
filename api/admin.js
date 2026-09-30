const { kv } = require('@vercel/kv');
const IDS=['massage','choice','mystery','shopping','cuddle','movie','coffee','breakfast','you-time','letter','wish','princess','bad-day','truce','golden'];
function auth(req){return process.env.ADMIN_KEY && req.headers.authorization===`Bearer ${process.env.ADMIN_KEY}`}
module.exports=async(req,res)=>{if(!auth(req))return res.status(401).json({error:'Unauthorized'}); if(req.method==='GET'){const rows=await Promise.all(IDS.map(id=>kv.get(`coupon:${id}`)));return res.json({redeemed:rows.filter(Boolean)});} if(req.method==='DELETE'){const id=req.query.id;if(!IDS.includes(id))return res.status(400).json({error:'Unknown coupon'});await kv.del(`coupon:${id}`);return res.json({ok:true});} return res.status(405).json({error:'Method not allowed'});};
