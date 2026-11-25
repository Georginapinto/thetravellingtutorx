import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { FORMS } from "../constants/testIds";
import { api } from "../lib/api";
import { Honeypot } from "./Honeypot";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

// `audienceOptions` (e.g. ["student", "parent"]) shows an "I'm a..." choice
// instead of using a fixed `audience`. `doneText` replaces the confirmation.
export const LeadMagnetForm = ({
  audience, audienceOptions, magnet, ctaLabel = "Download Free Pack", downloadUrl, downloadFilename, doneText, successToast,
}) => {
  const [form, setForm] = useState({ first_name: "", email: "", website: "" });
  const [who, setWho] = useState(audienceOptions ? audienceOptions[0] : audience);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const triggerDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.target = "_blank";
    a.rel = "noopener";
    if (downloadFilename) a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/lead-magnet", { ...form, audience: who, magnet });
      setDone(true);
      if (downloadUrl) {
        triggerDownload();
        toast.success("Your download is on the way — also sent to your inbox.");
      } else {
        toast.success(successToast || "Sent! Check your inbox in a few minutes.");
      }
    } catch {
      toast.error("Couldn't send — please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-brand-navySoft border border-brand-navy/30">
          <CheckCircle2 className="w-6 h-6 text-brand-navyDeep flex-none mt-0.5" />
          <div>
            <p className="font-semibold text-brand-ink">You're on the list, {form.first_name || "friend"}.</p>
            <p className="text-brand-mute text-sm">{doneText || (downloadUrl ? "Your download should have opened — if not, tap the button below." : "Check your inbox — your pack is on its way.")}</p>
          </div>
        </div>
        {downloadUrl && (
          <Button onClick={triggerDownload} data-testid="lead-redownload" className="w-full h-12 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-white">
            Download again
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative space-y-3">
      {audienceOptions && (
        <div role="radiogroup" aria-label="I am a" className="grid grid-cols-2 gap-2 p-1 rounded-full bg-brand-cream border border-border">
          {audienceOptions.map((a) => (
            <button
              key={a}
              type="button"
              role="radio"
              aria-checked={who === a}
              onClick={() => setWho(a)}
              className={`h-10 rounded-full text-sm font-semibold transition-colors ${
                who === a ? "bg-brand-navyDeep text-white" : "text-brand-ink hover:text-brand-maroon"
              }`}
            >
              I'm a {a}
            </button>
          ))}
        </div>
      )}
      <div>
        <Label className="text-brand-ink">First name</Label>
        <Input
          data-testid={FORMS.leadName}
          required
          value={form.first_name}
          onChange={(e) => setForm((s) => ({ ...s, first_name: e.target.value }))}
          className="h-12 rounded-full px-5 mt-1 bg-white border-border"
        />
      </div>
      <div>
        <Label className="text-brand-ink">Email address</Label>
        <Input
          data-testid={FORMS.leadEmail}
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          className="h-12 rounded-full px-5 mt-1 bg-white border-border"
        />
      </div>
      <Button
        data-testid={FORMS.leadSubmit}
        type="submit"
        disabled={busy}
        className="w-full h-12 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-white"
      >
        {busy ? "Sending..." : ctaLabel}
      </Button>
      <p className="text-xs text-brand-mute">No spam. Unsubscribe any time.</p>
      <Honeypot value={form.website} onChange={(v) => setForm((s) => ({ ...s, website: v }))} />
    </form>
  );
};

export default LeadMagnetForm;
