import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMS } from "@/constants/testIds";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { CheckCircle2, Plane, Heart, PoundSterling, Users, MonitorPlay, FileEdit, GraduationCap, MessageCircle, ClipboardCheck, BarChart3 } from "lucide-react";

const provides = [
  { i: Users, t: "We provide", d: "Leads, marketing, materials, systems, training & support." },
  { i: GraduationCap, t: "You grow", d: "Develop teaching, content creation & business skills." },
  { i: Heart, t: "Make an impact", d: "Help students achieve their best in Sociology." },
  { i: PoundSterling, t: "Earn well", d: "Competitive, transparent rates on tutoring revenue." },
];

const roles = [
  { i: GraduationCap, t: "Tutor", d: "1-1 and group Sociology sessions." },
  { i: MonitorPlay, t: "Content Creator", d: "Make TikToks and share exam tips & advice." },
  { i: FileEdit, t: "Resource Creator", d: "Essay plans, model answers & revision materials." },
  { i: Users, t: "Workshop Support", d: "Assist with workshops, Q&A and marking." },
];

const process = [
  { n: 1, i: MessageCircle, t: "Chat", d: "We get to know each other and your goals." },
  { n: 2, i: ClipboardCheck, t: "Trial Project", d: "Complete a short trial task." },
  { n: 3, i: GraduationCap, t: "Training", d: "Learn our methods and get supported." },
  { n: 4, i: BarChart3, t: "Start Earning", d: "Begin tutoring, creating and making an impact." },
];

export default function TutorPartner() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", qualifications: "", experience: "", why_join: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const u = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/tutor-application", form);
      setDone(true);
      toast.success("Application received — we'll be in touch within 48 hours.");
    } catch {
      toast.error("Couldn't send — please try again.");
    } finally { setBusy(false); }
  };

  return (
    <>
      <PageHero
        eyebrow="tutor partner programme"
        title="Teach. Inspire. Earn."
        lede="Join a growing Sociology education brand. We provide the training, leads and support — you do what you love. Build a flexible, rewarding tutoring career on your terms."
        accent="sage"
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <a href="#apply">Apply to join <Plane className="w-4 h-4 ml-2 -rotate-12" /></a>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {provides.map((p) => (
              <div key={p.t} className="rounded-3xl p-6 bg-brand-pinkSoft border border-white text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-white grid place-items-center text-brand-pink"><p.i className="w-6 h-6" /></div>
                <h3 className="mt-4 font-semibold text-brand-ink">{p.t}</h3>
                <p className="text-brand-mute text-sm mt-1.5">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="rounded-[2rem] bg-white border border-border/60 p-8 shadow-soft">
            <h3 className="text-2xl font-semibold text-brand-ink">What you can do</h3>
            <div className="mt-6 space-y-4">
              {roles.map((r) => (
                <div key={r.t} className="flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-brand-pinkSoft text-brand-pink grid place-items-center flex-none"><r.i className="w-5 h-5" /></span>
                  <div>
                    <p className="font-semibold text-brand-ink">{r.t}</p>
                    <p className="text-brand-mute text-sm">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white border border-border/60 p-8 shadow-soft">
            <h3 className="text-2xl font-semibold text-brand-ink">Earn with us</h3>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 bg-brand-pinkSoft">
                <p className="font-handwritten text-2xl text-brand-pink">1-1 tutoring</p>
                <p className="text-3xl font-semibold text-brand-ink mt-1">£40–80<span className="text-base text-brand-mute font-normal">/hour</span></p>
                <p className="text-sm text-brand-mute mt-1">Set your own pricing within range</p>
              </div>
              <div className="rounded-2xl p-5 bg-brand-sageSoft">
                <p className="font-handwritten text-2xl text-brand-sageDeep">Group tutoring</p>
                <p className="text-3xl font-semibold text-brand-ink mt-1">£100–200<span className="text-base text-brand-mute font-normal">/hour</span></p>
                <p className="text-sm text-brand-mute mt-1">Typical earnings for group sessions</p>
              </div>
            </div>
            <p className="text-sm text-brand-mute mt-5 flex items-center gap-2"><Heart className="w-4 h-4 text-brand-pink fill-brand-pink" /> We handle payments, admin and marketing — you focus on teaching.</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink text-center">Our simple process</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {process.map((s) => (
              <div key={s.n} className="rounded-3xl p-6 bg-brand-warmWhite border border-border/60 text-center">
                <div className="relative w-14 h-14 mx-auto rounded-full bg-brand-pinkSoft text-brand-pink grid place-items-center">
                  <s.i className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-pink text-white text-xs font-semibold grid place-items-center">{s.n}</span>
                </div>
                <h3 className="mt-4 font-semibold text-brand-ink">{s.t}</h3>
                <p className="text-sm text-brand-mute mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section-y">
        <div className="container-px max-w-3xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-12">
            <p className="font-handwritten text-3xl text-brand-pink">ready to join?</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">Apply for the Tutor Partner Programme</h2>
            <p className="text-brand-mute mt-2">Tell us a little about yourself — we'll reply within 48 hours.</p>

            {done ? (
              <div className="mt-8 bg-white rounded-2xl p-6 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-sageDeep flex-none mt-1" />
                <div>
                  <p className="font-semibold text-brand-ink">Application received. Thank you!</p>
                  <p className="text-sm text-brand-mute">Georgina will personally review your application and email you within 48 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 bg-white rounded-2xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Full name</Label><Input data-testid={FORMS.applyName} required value={form.name} onChange={u("name")} className="h-12 rounded-xl mt-1" /></div>
                  <div><Label>Email</Label><Input data-testid={FORMS.applyEmail} required type="email" value={form.email} onChange={u("email")} className="h-12 rounded-xl mt-1" /></div>
                </div>
                <div><Label>Phone (optional)</Label><Input data-testid={FORMS.applyPhone} value={form.phone} onChange={u("phone")} className="h-12 rounded-xl mt-1" /></div>
                <div><Label>Qualifications</Label><Textarea data-testid={FORMS.applyQual} required rows={2} value={form.qualifications} onChange={u("qualifications")} className="rounded-xl mt-1" placeholder="e.g. BA Sociology (1st), PGCE, QTS..." /></div>
                <div><Label>Teaching experience</Label><Textarea data-testid={FORMS.applyExp} required rows={3} value={form.experience} onChange={u("experience")} className="rounded-xl mt-1" /></div>
                <div><Label>Why do you want to join?</Label><Textarea data-testid={FORMS.applyWhy} required rows={3} value={form.why_join} onChange={u("why_join")} className="rounded-xl mt-1" /></div>
                <Button data-testid={FORMS.applySubmit} disabled={busy} type="submit" className="w-full h-12 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white">
                  {busy ? "Sending..." : "Submit my application"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-px max-w-5xl mx-auto text-center">
          <p className="font-handwritten text-3xl text-brand-pink">teach. inspire. earn.</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1 max-w-2xl mx-auto">A growing Sociology brand — and a place for you in it.</h3>
          <p className="text-brand-mute mt-4 max-w-xl mx-auto">We handle payments, admin and marketing. You focus on teaching, creating and inspiring students.</p>
        </div>
      </section>
    </>
  );
}
