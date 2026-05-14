import Script from "next/script";

/**
 * X (Twitter) Ads universal pixel base code.
 * No-ops gracefully when NEXT_PUBLIC_X_PIXEL_ID is not set.
 *
 * Set in Vercel env:
 *   NEXT_PUBLIC_X_PIXEL_ID    (your pixel id from ads.x.com)
 *
 * Conversion events fire from <XAdsConversion /> on /success.
 */
export function XAdsPixel() {
  const pixelId = process.env.NEXT_PUBLIC_X_PIXEL_ID;
  if (!pixelId) return null;
  return (
    <Script id="x-ads-pixel" strategy="afterInteractive">
      {`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','${pixelId}');`}
    </Script>
  );
}
