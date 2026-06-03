import { AccountPortalForm } from "../_components/AccountPortalForm";
import Link from "next/link";

export const metadata = {
  title: "Your account — ORANGEBOX",
  description:
    "Update your name, address, phone, payment method, or marketing preferences. Re-download ORANGEBOX. Re-purchase with one click using your saved profile.",
  alternates: { canonical: "https://atomeons.com/account" },
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ returned?: string }>;
}) {
  const { returned } = await searchParams;

  return (
    <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-16 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
        ::your account
      </p>
      <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
        Update once.
        <br />
        <span className="text-[#22F0D5]">Re-use forever.</span>
      </h1>
      <p className="mt-6 max-w-xl text-base text-[#9BA5A7]">
        Enter the email you used at checkout. We&apos;ll open the secure Stripe
        billing portal so you can update your name, postal address, phone,
        payment method, or marketing email preference. Your next ORANGEBOX
        purchase will reuse the saved profile automatically — no retyping.
      </p>

      {returned === "1" ? (
        <div className="mt-6 rounded-lg border border-[#22F0D5]/30 bg-[#0F1114] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::saved
          </p>
          <p className="mt-1 text-sm text-[#F2F4F5]">
            Profile updated. Your next purchase will reuse the saved details.
          </p>
        </div>
      ) : null}

      <div className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
        <AccountPortalForm />
      </div>

      <div className="mt-10 grid gap-3 border-t border-[#1A2225] pt-8 text-sm text-[#9BA5A7] md:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::update
          </p>
          <p className="mt-1">
            Name · address · phone · payment method · marketing preference.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::re-buy
          </p>
          <p className="mt-1">
            Next checkout pre-fills from your saved profile. One click.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::unsubscribe
          </p>
          <p className="mt-1">
            Toggle marketing email off any time inside the portal.
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs text-[#6B7779]">
        Lost your receipt? Email{" "}
        <a
          href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20account%20lookup"
          className="text-[#22F0D5] hover:text-[#FFA45A]"
        >
          a.mccree@gmail.com
        </a>{" "}
        from the address you used at purchase and we&apos;ll surface your record.
      </p>

      <p className="mt-3 text-xs text-[#6B7779]">
        <Link href="/orangebox" className="text-[#22F0D5] hover:text-[#FFA45A]">
          ← back to ORANGEBOX
        </Link>
      </p>
    </main>
  );
}
