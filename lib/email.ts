type SendArgs = {
  to: string;
  downloadUrl: string;
  sessionId: string;
};

export async function sendDownloadEmail({
  to,
  downloadUrl,
  sessionId,
}: SendArgs): Promise<{ ok: boolean; via: string; error?: string }> {
  const loopsKey = process.env.LOOPS_API_KEY;
  const loopsTransactionalId = process.env.LOOPS_TRANSACTIONAL_ID;

  if (loopsKey && loopsTransactionalId) {
    try {
      const res = await fetch("https://app.loops.so/api/v1/transactional", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loopsKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionalId: loopsTransactionalId,
          email: to,
          dataVariables: {
            downloadUrl,
            sessionId,
            productName: "Orange³",
          },
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { ok: false, via: "loops", error: `loops ${res.status}: ${text}` };
      }
      return { ok: true, via: "loops" };
    } catch (e) {
      return {
        ok: false,
        via: "loops",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (resendKey && resendFrom) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to,
          subject: "Your Orange³ download",
          html: `<p>Thanks for buying Orange³.</p>
<p>Download: <a href="${downloadUrl}">${downloadUrl}</a></p>
<p>This link is valid for 30 days. Save the file when you get it.</p>
<p>Order: ${sessionId}</p>
<p>— AtomEons</p>`,
          text: `Thanks for buying Orange³.\n\nDownload: ${downloadUrl}\n\nThis link is valid for 30 days. Save the file when you get it.\n\nOrder: ${sessionId}\n\n— AtomEons`,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { ok: false, via: "resend", error: `resend ${res.status}: ${text}` };
      }
      return { ok: true, via: "resend" };
    } catch (e) {
      return {
        ok: false,
        via: "resend",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  return {
    ok: false,
    via: "none",
    error:
      "No email provider configured. Set LOOPS_API_KEY+LOOPS_TRANSACTIONAL_ID or RESEND_API_KEY+RESEND_FROM_EMAIL.",
  };
}
