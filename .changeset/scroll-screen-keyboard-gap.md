---
'@ellobo/design-system': patch
---

fix: `ScrollScreen` footer sits right on the keyboard

With the bottom safe-area edge (the default), the sticky footer used to float one inset above the
keyboard (Android navigation bar, iOS home indicator), leaving a transparent gap where the content
showed through. The keyboard height already covers that inset, so the footer now gets it back as the
open offset.
