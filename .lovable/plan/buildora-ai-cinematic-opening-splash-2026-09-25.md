# Buildora AI cinematic opening splash

## What will change
- Add a full-screen opening layer that uses the uploaded Buildora AI artwork unchanged.
- Animate from pure black into a sharp metallic reveal with a restrained silver sweep, soft reflections, and faint atmospheric glow.
- Hold the completed artwork briefly, then fade smoothly into the existing landing page in about 3.5 seconds.
- Use a simplified, faster reveal when reduced motion is enabled.

## What will stay unchanged
- Keep the existing landing page, navigation, builder flow, styling, functionality, and all later screens intact.
- Do not add new copy, colors, controls, or sound.

## Technical details
- Store the uploaded artwork as a project-served image asset and render it responsively with its original proportions.
- Add isolated splash animation styles using opacity, clipping, blur-to-sharp focus, glow, and a narrow metallic light sweep.
- Keep the landing page mounted underneath so the transition is seamless and interaction becomes available only after the splash exits.
- Verify the reveal and final landing state on desktop and mobile, including overflow, runtime errors, and reduced-motion behavior.
