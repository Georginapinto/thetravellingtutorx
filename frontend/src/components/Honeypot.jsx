import React from "react";

// Spam trap: hidden from people (off-screen, skipped by keyboard and screen
// readers) but filled in by bots. The API quietly drops any submission where
// `website` has a value.
export const Honeypot = ({ value, onChange }) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      Leave this field empty
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  </div>
);

export default Honeypot;
