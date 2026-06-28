import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FORMS, HOME } from "../constants/testIds";
import { api } from "../lib/api";
import { toast } from "sonner";
import { Plane, CalendarCheck2 } from "lucide-react";

export const BookingDialog = ({ open, onOpenChange }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "student", preferred_date: "", preferred_time: "", notes: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/booking", form);
      setDone(true);
      toast.success("Booking request received — Georgina will be in touch.");
    } catch {
      toast.error("Couldn't send your booking. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setDone(false); }}>
      <DialogContent data-testid={HOME.bookingDialog} className="sm:max-w-lg rounded-3xl p-0 overflow-hidden">
        <div className="bg-brand-pinkSoft p-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white grid place-items-center text-brand-pink">
            <CalendarCheck2 className="w-6 h-6" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-brand-ink">Book a Free Consultation</DialogTitle>
            <DialogDescription className="text-brand-mute">A 20-min chat to map out your Sociology journey.</DialogDescription>
          </div>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <Plane className="w-10 h-10 mx-auto text-brand-pink -rotate-12" />
            <h4 className="text-2xl font-heading mt-3">You're booked in — almost.</h4>
            <p className="text-brand-mute mt-2">Georgina will email you within 24 hours to confirm your slot.</p>
            <Button onClick={() => onOpenChange(false)} className="mt-6 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white px-6 h-11">Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full name</Label>
                <Input data-testid={FORMS.bookingName} required value={form.name} onChange={update("name")} className="h-11 rounded-xl mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input data-testid={FORMS.bookingEmail} required type="email" value={form.email} onChange={update("email")} className="h-11 rounded-xl mt-1" />
              </div>
              <div>
                <Label>Phone (optional)</Label>
                <Input data-testid={FORMS.bookingPhone} value={form.phone} onChange={update("phone")} className="h-11 rounded-xl mt-1" />
              </div>
              <div>
                <Label>I am a</Label>
                <Select value={form.role} onValueChange={(v) => setForm((s) => ({ ...s, role: v }))}>
                  <SelectTrigger data-testid={FORMS.bookingRole} className="h-11 rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred date</Label>
                <Input data-testid={FORMS.bookingDate} type="date" value={form.preferred_date} onChange={update("preferred_date")} className="h-11 rounded-xl mt-1" />
              </div>
              <div>
                <Label>Preferred time</Label>
                <Input data-testid={FORMS.bookingTime} type="time" value={form.preferred_time} onChange={update("preferred_time")} className="h-11 rounded-xl mt-1" />
              </div>
            </div>
            <div>
              <Label>Anything you'd like me to know?</Label>
              <Textarea data-testid={FORMS.bookingNotes} rows={3} value={form.notes} onChange={update("notes")} className="rounded-xl mt-1" />
            </div>
            <Button data-testid={FORMS.bookingSubmit} disabled={busy} className="w-full h-12 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white">
              {busy ? "Sending..." : "Request my consultation"}
            </Button>
            <p className="text-xs text-brand-mute text-center">Powered by The Travelling Tutor · Calendar sync coming soon.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
