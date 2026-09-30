const { kv } = require('@vercel/kv');
const IDS=['massage','choice','mystery','shopping','cuddle','movie','coffee','breakfast','you-time','letter','wish','princess','bad-day','truce','golden'];
module.exports=async(req,res)=>{ const rows=await Promise.all(IDS.map(id=>kv.get(`coupon:${id}`))); res.setHeader('Cache-Control','no-store'); res.json({redeemed:rows.filter(Boolean)}); };
