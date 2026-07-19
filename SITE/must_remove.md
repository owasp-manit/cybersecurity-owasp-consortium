# Must Remove Before Production

## 1. Fake Contact Form Submission States

The contact form currently shows simulated success messaging without submitting to a real backend.

- [script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/script.js:189) shows `Connecting to community...`
- [script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/script.js:193) shows `✓ Welcome aboard! Message sent.`
- [script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/script.js:195) shows `Message Sent ✓`
- [script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/script.js:201) resets to `Ready to connect...`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:450) shows the initial visible status text

This is misleading in production because users will assume their message was actually delivered.

## 2. Fake Loading / Boot Sequence Content

The loading experience contains cinematic demo text that reads like mock system output rather than real user-facing content.

- [index.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/index.html:368) `Initializing ∙ 0%`
- [index.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/index.html:373) `ASCII ART + TERMINAL BOOT SEQUENCE`
- [index.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/index.html:393) `Loading threat intelligence db...`
- [index.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/index.html:396) `Initializing neural interface...`
- [index.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/index.html:438) `Initializing ∙ ${pct}%`
- [loading.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/loading.html:113) `threat surface initializing`
- [loading.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/loading.html:124) `LOADING... 0%`
- [loading_script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/loading_script.js:47) `cache restored` / `threat surface initializing`
- [loading_script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/loading_script.js:154) `SECURE LOADING...`

If this is not intentionally part of the brand experience, it should not be visible on a deployed site.

## 3. Fake Hero Terminal / System Messaging

The homepage hero includes mock terminal/system text that suggests fake platform behavior.

- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:99) `owasp-os — boot sequence`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:104) `initializing community grid...`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:107) `syncing learning modules ✓`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:125) `Challenge Active`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:132) `24 / 7`
- [script.js](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/script.js:56) rotating log includes `debugging a CTF payload`

This may be acceptable only if the site deliberately wants a stylized fictional interface. Otherwise it reads as demo copy.

## 4. Obvious Low-Quality / Unfinished Visible Copy

These are visible to users and should be cleaned before deployment.

- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:276) `Funds Gathereed`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:289) `Web Devloper`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:289) `SponsorShip`
- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:289) `With Over 35+ Active Member`

## 5. Internal-Looking Identifier In Markup

Not directly user-visible in normal browsing, but not deploy-clean:

- [home.html](/home/baki/Desktop/Beware/temp_14_03_2026/New_Folder/home.html:210) `id="idknow"`

## Notes

- Standard loading labels such as `Loading event data...` and `Loading team directory...` were not treated as dummy content.
- This file only lists content that looks misleading, mock/demo-like, or obviously unfinished for a public deployment.
