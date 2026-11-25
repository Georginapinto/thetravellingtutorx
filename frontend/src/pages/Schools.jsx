import React, { useState } from "react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Honeypot } from "@/components/Honeypot";
import { api } from "@/lib/api";
import { BadgePercent, BookOpenCheck, MonitorPlay, Table2, ClipboardCheck, Send, CheckCircle2, Award } from "lucide-react";

const EMPTY = { school: "", name: "", email: "", message: "", website: "" };

// School enquiries go through the existing contact endpoint (saved to the
// contacts table and emailed to you), with the school name in the subject.
function SchoolEnquiryForm() {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const u = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const school = form.school.trim();
      await api.post("/contact", {
        name: form.name,
        email: form.email,
        role: "other",
        subject: `School resources enquiry: ${school}`.slice(0, 200),
        message: `School: ${school}\nContact: ${form.name.trim()}\n\n${form.message.trim() || "(No message)"}`,
        website: form.website,
      });
      setSent(true);
      setForm(EMPTY);
      toast.success("Enquiry sent — Georgina will reply within 24 hours.");
    } catch {
      toast.error("Couldn't send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-10" data-testid="school-enquiry-sent">
        <CheckCircle2 className="w-12 h-12 text-brand-maroon mx-auto" />
        <h3 className="mt-4 text-2xl font-semibold text-brand-ink">Thank you!</h3>
        <p className="text-brand-mute mt-2">Your enquiry is on its way. I'll be in touch within 24 hours with your school's rates.</p>
        <Button variant="outline" onClick={() => setSent(false)} className="mt-6 rounded-full border-brand-maroon/40 text-brand-maroon">
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative space-y-5" data-testid="school-enquiry-form">
      <div>
        <Label htmlFor="school-name">School name</Label>
        <Input id="school-name" required maxLength={150} value={form.school} onChange={u("school")} className="h-12 rounded-xl mt-1" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="school-contact">Contact name</Label>
          <Input id="school-contact" required maxLength={200} value={form.name} onChange={u("name")} className="h-12 rounded-xl mt-1" />
        </div>
        <div>
          <Label htmlFor="school-email">School email</Label>
          <Input id="school-email" required type="email" value={form.email} onChange={u("email")} className="h-12 rounded-xl mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="school-message">Message <span className="text-brand-mute font-normal">(optional)</span></Label>
        <Textarea
          id="school-message"
          rows={4}
          maxLength={4000}
          value={form.message}
          onChange={u("message")}
          placeholder="e.g. which resources you're interested in and roughly how many students"
          className="rounded-xl mt-1"
        />
      </div>
      <Button disabled={busy} type="submit" className="w-full sm:w-auto h-12 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-white px-8 font-semibold">
        <Send className="w-4 h-4 mr-2" /> {busy ? "Sending..." : "Request school pricing"}
      </Button>
      <Honeypot value={form.website} onChange={(v) => setForm((s) => ({ ...s, website: v }))} />
    </form>
  );
}

const offers = [
  { i: BookOpenCheck, t: "Grade Booster Packs", d: "A* model answers, examiner insights and essay plans for your classes." },
  { i: Table2, t: "Learning Tables", d: "One-page topic summaries for fast, focused revision." },
  { i: MonitorPlay, t: "Grade Transformation Course", d: "Self-paced, examiner-led video lessons for your students." },
  { i: ClipboardCheck, t: "CPD & department workshops", d: "Examiner-led training for your Sociology team." },
];

export default function Schools() {
  return (
    <>
      <PageHero
        eyebrow="for schools"
        title="Exclusive resource discounts for schools."
        lede="Give your Sociology students examiner-written resources at exclusive discounted school rates. Tell me a little about your school and I'll send you a tailored quote."
        accent="navy"
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
          <a href="#enquire">Enquire now</a>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeader eyebrow="what schools can buy" title="Resources your department will actually use." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offers.map((o) => (
              <div key={o.t} className="rounded-3xl p-6 bg-brand-cream border border-border/60">
                <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white grid place-items-center"><o.i className="w-6 h-6" /></div>
                <h3 className="mt-5 text-lg font-semibold text-brand-ink">{o.t}</h3>
                <p className="text-brand-mute text-sm mt-1.5">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="section-y">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <SectionHeader
              eyebrow="school enquiry"
              title="Get your school's discounted rates."
              lede="No obligation. I'll reply personally within 24 hours."
            />
            <ul className="mt-8 space-y-4">
              {[
                [BadgePercent, "Exclusive discounted rates for schools"],
                [Award, "Written by an AQA Sociology examiner of 9 years"],
                [CheckCircle2, "Pricing tailored to your department's needs"],
              ].map(([Icon, t]) => (
                <li key={t} className="flex items-center gap-3 text-brand-ink">
                  <span className="w-10 h-10 rounded-xl bg-brand-maroonSoft text-brand-maroon grid place-items-center shrink-0"><Icon className="w-5 h-5" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 rounded-[2rem] bg-white border border-border/60 p-7 md:p-10 shadow-medium">
            <SchoolEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
