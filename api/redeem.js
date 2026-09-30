const { kv } = require('@vercel/kv');
const { Resend } = require('resend');
const COUPONS = {massage:'The Massage',choice:'Your Choice',mystery:'Mystery Date',shopping:'Shopping Companion',cuddle:'Emergency Cuddle',movie:'Movie Dictatorship',coffee:'Coffee Delivery',breakfast:'Breakfast in Bed','you-time':'100% You Time',letter:'Love Letter',wish:'One Wish',princess:'Princess Day','bad-day':'The Bad Day Pass',truce:'The Argument Truce',golden:'The Golden Ticket'};
module.exports = async (req,res) => {
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const { id }=req.body||{}; if(!COUPONS[id]) return res.status(400).json({error:'Unknown coupon'});
 const key=`coupon:${id}`; const existing=await kv.get(key); if(existing) return res.status(409).json({error:'Already redeemed',redemption:existing});
 const redemption={id,title:COUPONS[id],redeemedAt:new Date().toISOString()}; await kv.set(key,redemption);
 let notified=false;
 try { if(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL){ const resend=new Resend(process.env.RESEND_API_KEY); await resend.emails.send({from:process.env.FROM_EMAIL||'Jellybean Benefits <onboarding@resend.dev>',to:process.env.NOTIFY_EMAIL,subject:`🍬 Jellybean redeemed: ${COUPONS[id]}`,html:`<div style="font-family:Arial,sans-serif"><h2>🍬 Jellybean redeemed a coupon</h2><h3>${COUPONS[id]}</h3><p>Redeemed at ${new Date(redemption.redeemedAt).toLocaleString('en-US',{timeZone:'America/Chicago'})} CT.</p><p>Your services have been requested. ❤️</p></div>`}); notified=true; }} catch(e){ console.error('email',e); }
 return res.status(200).json({ok:true,redemption,notified});
};
