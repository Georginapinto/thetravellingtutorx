// Facebook recommendations shown in the homepage carousel.
//
// To add one: on Facebook, open the recommendation, click ⋯ → Embed, and copy
// the code. From that code take:
//   url    — the post link inside src="...href=<THIS PART>..." (or just the
//            link you get from clicking the recommendation's date)
//   height — the height="..." number, so the card isn't cut off
//
// Example:
//   { url: "https://www.facebook.com/someone/posts/pfbid0abc...", height: 260 },
export const FACEBOOK_REVIEWS = [
  { url: "https://www.facebook.com/permalink.php?story_fbid=pfbid0pBGAwoxd8J9MUzCbdc8dtZyN7prnWRP5AiqSDndePvKaheSCitfx4QZYCX3EXmMVl&id=100076516053961", height: 329 },
  { url: "https://www.facebook.com/permalink.php?story_fbid=pfbid0bw4xZrvDwRbmvSfvnYW1NNP6PYiVwnnBBFxirzzTsJVtGkb6bkijF35qRs5CDjtMl&id=100090210106240", height: 226 },
  { url: "https://www.facebook.com/fernanda.askin/posts/pfbid02BPx7mg4tvUFS7Qn215MLbVkTDxmP2eYyUHpDfwnQyZ6cHsvzYLhF9YdxrxLBkJGvl", height: 226 },
];
