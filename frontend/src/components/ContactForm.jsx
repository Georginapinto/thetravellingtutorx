import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FORMS } from "../constants/testIds";
import { api } from "../lib/api";
import { toast } from "sonner";
import { Send } from "lucide-react";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "student", subject: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent — Georgina will reply within 24 hours.");
      setForm({ name: "", email: "", role: "student", subject: "", message: "" });
    } catch {
      toast.error("Couldn't send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const u = (k) => (e) => setForm((s) => ({ ...s, [k]: e?.target ? e.target.value : e }));

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input data-testid={FORMS.contactName} required value={form.name} onChange={u("name")} className="h-12 rounded-xl mt-1" />
        </div>
        <div>
          <Label>Email</Label>
          <Input data-testid={FORMS.contactEmail} required type="email" value={form.email} onChange={u("email")} className="h-12 rounded-xl mt-1" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>I am a</Label>
          <Select value={form.role} onValueChange={(v) => setForm((s) => ({ ...s, role: v }))}>
            <SelectTrigger data-testid={FORMS.contactRole} className="h-12 rounded-xl mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>How can I help?</Label>
          <Input data-testid={FORMS.contactSubject} value={form.subject} onChange={u("subject")} placeholder="e.g. A-Level Tutoring" className="h-12 rounded-xl mt-1" />
        </div>
      </div>
      <div>
        <Label>Message</Label>
        <Textarea data-testid={FORMS.contactMessage} required rows={5} value={form.message} onChange={u("message")} className="rounded-xl mt-1" />
      </div>
      <Button data-testid={FORMS.contactSubmit} disabled={busy} type="submit" className="h-12 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white px-7">
        <Send className="w-4 h-4 mr-2" /> {busy ? "Sending..." : "Let's Get Started"}
      </Button>
    </form>
  );
};

export default ContactForm;
