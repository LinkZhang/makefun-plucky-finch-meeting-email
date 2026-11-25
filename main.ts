import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line (134 chars, 1 line):
// "Sarah screen-shared the email for an hour, scrolled past the answer twice, and ended by forwarding it to everyone who was in the room."
//
// Why the twist works, against the judge brief in priority order:
// 1. It IS a joke about a meeting that should have been an email: the whole
//    meeting exists only to look at an email together.
// 2. The laugh lands on its own and the turn arrives on the last words.
//    The reader expects the note to end at the screen-share; instead Sarah
//    forwards the email to the very people sitting in the room with her.
//    The meeting's only product is the email it was about, re-delivered.
// 3. Surprise, not the obvious complaint: nobody says the meeting ran long
//    or that it could have been an email. The absurdity is that the email
//    was right there the whole time and still had to be forwarded.
// 4. Economy: every word earns its place — "for an hour", "twice",
//    "everyone who was in the room" are all load-bearing.
// 5. Recognition: anyone who has sat in a meeting has watched someone
//    screen-share a document and scroll past the answer.
// Reviser note: the twist works because the meeting's only product is the
// email it was convened to look at. Sarah screen-shares it for an hour —
// the whole room is already staring at it — then forwards it to everyone
// who was in the room. The sting has to stay last: if the forwarding came
// first, the line would be a complaint about a long meeting; landing it
// last turns the meeting into a delivery service for a document nobody
// needed delivered. "Scrolled past the answer twice" is the recognisable
// middle beat: the answer was visible the whole time, and the meeting
// still produced nothing but a re-send.
const LINE =
  "Sarah screen-shared the email for an hour, scrolled past the answer twice, and ended by forwarding it to everyone who was in the room.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check (RULES.txt): UTF-8 text, 1-200 chars, not only whitespace, one line.
if (LINE.length < 1 || LINE.length > 200) throw new Error(`entry length ${LINE.length} outside 1-200`);
if (!/\S/.test(LINE)) throw new Error("entry is only whitespace");
if (LINE.includes("\n")) throw new Error("entry must be a single line");
// Content checks: the joke must name the meeting's email and end on the sting.
if (!LINE.includes("email")) throw new Error("entry must name the email");
if (!LINE.includes("screen-shared")) throw new Error("entry must name the screen-share");
if (!LINE.endsWith("who was in the room.")) throw new Error("entry must end with 'who was in the room.'");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${LINE.length} chars)`);
