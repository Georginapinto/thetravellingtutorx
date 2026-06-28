import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { FORMS } from "../constants/testIds";
import { api } from "../lib/api";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export const LeadMagnetForm = ({ audience, magnet, ctaLabel = "Download Free Pack" }) => {
  const [form, setForm] = useState({ first_name: "", email: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/lead-magnet", { ...form, audience, magnet });
      setDone(true);
      toast.success("Sent! Check your inbox in a few minutes.");
    } catch {
      toast.error("Couldn't send — please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-start gap-3 p-5 rounded-2xl bg-brand-sageSoft border border-brand-sage/30">
        <CheckCircle2 className="w-6 h-6 text-brand-sageDeep flex-none mt-0.5" />
        <div>
          <p className="font-semibold text-brand-ink">You're on the list, {form.first_name || "friend"}.</p>
          <p className="text-brand-mute text-sm">Check your inbox — your pack is on its way.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
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
        className="w-full h-12 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white"
      >
        {busy ? "Sending..." : ctaLabel}
      </Button>
      <p className="text-xs text-brand-mute">No spam. Unsubscribe any time.</p>
    </form>
  );
};

export default LeadMagnetForm;
