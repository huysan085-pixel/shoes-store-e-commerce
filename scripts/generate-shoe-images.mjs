// Generates the sample sneaker illustrations used by the demo store.
// Run from the frontend folder:  node scripts/generate-shoe-images.mjs
// These are original vector illustrations (no brand logos, no copyrighted photos).
// You can replace any file in public/images/shoes with a real photo later.
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'public/images/shoes';
mkdirSync(OUT, { recursive: true });

const P = (o) => ({
  upper: '#f4f4f2', toe: null, heel: null, panel: null, collar: '#d9d9d6', tongue: null,
  lace: '#ffffff', accent: null, accentStyle: 'none', sole: '#ffffff', outsole: '#d6d6d3',
  midsoleStyle: 'plain', foxing: null, window: '#cfd3d8', mesh: false, patch: null, ...o,
});

// slug -> [colorway1, colorway2]; kind = silhouette
export const SHOES = {
  'nike-air-force-1-07': { kind: 'low', h: 64, ways: [
    P({ upper: '#f6f6f4', toe: '#f1f1ee', heel: '#ececea', panel: '#f1f1ee', accent: '#fbfbfa', accentStyle: 'wedge', collar: '#e4e4e1' }),
    P({ upper: '#1a1b1d', toe: '#222326', heel: '#26272a', panel: '#222326', accent: '#2f3033', accentStyle: 'wedge', collar: '#101011', lace: '#2f3033', sole: '#1a1b1d', outsole: '#0c0c0d' }),
  ] },
  'nike-dunk-low': { kind: 'low', h: 50, ways: [
    P({ upper: '#f4f4f1', toe: '#9ba1a7', heel: '#9ba1a7', panel: '#9ba1a7', accent: '#9ba1a7', accentStyle: 'wedge', collar: '#7d838a', tongue: '#f4f4f1' }),
    P({ upper: '#f4f4f1', toe: '#17181a', heel: '#17181a', panel: '#17181a', accent: '#17181a', accentStyle: 'wedge', collar: '#17181a', tongue: '#f4f4f1' }),
  ] },
  'nike-air-max-90': { kind: 'runner', h: 78, ways: [
    P({ upper: '#f2f2f0', toe: '#d1d4d8', heel: '#8d9399', panel: '#8d9399', accent: '#2c2d30', accentStyle: 'wedge', sole: '#f2f2f0', outsole: '#b7bbc0', midsoleStyle: 'air', window: '#d5d8dc', mesh: true }),
    P({ upper: '#1a1b1d', toe: '#35373b', heel: '#35373b', panel: '#35373b', accent: '#e5372a', accentStyle: 'wedge', sole: '#ecebe8', outsole: '#bdbdba', midsoleStyle: 'air', window: '#e5372a', mesh: true, collar: '#e5372a' }),
  ] },
  'adidas-samba-og': { kind: 'low', h: 34, ways: [
    P({ upper: '#f5f3ee', toe: '#f5f3ee', heel: '#17181a', panel: '#f5f3ee', accent: '#17181a', accentStyle: 'lines', sole: '#ebe5d9', outsole: '#c19a6b', collar: '#17181a', tongue: '#f5f3ee', lace: '#f5f3ee' }),
    P({ upper: '#1a1b1d', toe: '#2a2b2e', heel: '#f5f3ee', panel: '#1a1b1d', accent: '#f5f3ee', accentStyle: 'lines', sole: '#ebe5d9', outsole: '#c19a6b', collar: '#f5f3ee', lace: '#1a1b1d' }),
  ] },
  'adidas-ultraboost': { kind: 'runner', h: 84, ways: [
    P({ upper: '#1d1e20', toe: '#2a2b2e', heel: '#3a3b3e', panel: '#2a2b2e', accent: '#5a5d63', accentStyle: 'lines', sole: '#1d1e20', outsole: '#0f0f10', midsoleStyle: 'boost', mesh: true, collar: '#2a2b2e', lace: '#3a3b3e' }),
    P({ upper: '#efefed', toe: '#e4e5e6', heel: '#d7d9dc', panel: '#e4e5e6', accent: '#c4c7cb', accentStyle: 'lines', sole: '#fafafa', outsole: '#cfd1d3', midsoleStyle: 'boost', mesh: true, collar: '#d7d9dc' }),
  ] },
  'adidas-campus-00s': { kind: 'low', h: 46, ways: [
    P({ upper: '#9a9ea3', toe: '#9a9ea3', heel: '#9a9ea3', panel: '#9a9ea3', accent: '#f4f4f2', accentStyle: 'lines', sole: '#f4f4f2', outsole: '#d8d6d0', midsoleStyle: 'foxing', foxing: '#f4f4f2', collar: '#f4f4f2', tongue: '#9a9ea3', lace: '#f4f4f2' }),
    P({ upper: '#234d3b', toe: '#234d3b', heel: '#234d3b', panel: '#234d3b', accent: '#f4f4f2', accentStyle: 'lines', sole: '#f4f4f2', outsole: '#d8d6d0', midsoleStyle: 'foxing', foxing: '#f4f4f2', collar: '#f4f4f2', tongue: '#234d3b', lace: '#f4f4f2' }),
  ] },
  'new-balance-530': { kind: 'runner', h: 62, ways: [
    P({ upper: '#f1f1ef', toe: '#d4d7da', heel: '#c4c8cc', panel: '#b9bec3', accent: '#9ca2a8', accentStyle: 'lines', sole: '#f1f1ef', outsole: '#cfd1d3', mesh: true, collar: '#c4c8cc' }),
    P({ upper: '#cfd2d5', toe: '#b3b8bd', heel: '#2b3a55', panel: '#2b3a55', accent: '#2b3a55', accentStyle: 'lines', sole: '#e6e6e3', outsole: '#bdbdba', mesh: true, collar: '#2b3a55' }),
  ] },
  'new-balance-9060': { kind: 'runner', h: 96, ways: [
    P({ upper: '#e6e2da', toe: '#cfc8bb', heel: '#a8a39a', panel: '#bdb7ab', accent: '#8f8a80', accentStyle: 'lines', sole: '#dcd7cd', outsole: '#b4afa4', mesh: true, midsoleStyle: 'boost', collar: '#a8a39a' }),
    P({ upper: '#8c9096', toe: '#6f737a', heel: '#50545a', panel: '#70747b', accent: '#d9dbde', accentStyle: 'lines', sole: '#c9cbce', outsole: '#9a9da2', mesh: true, midsoleStyle: 'boost', collar: '#50545a' }),
  ] },
  'asics-gel-kayano-14': { kind: 'runner', h: 86, ways: [
    P({ upper: '#ece7dc', toe: '#c7c9cc', heel: '#b7bbbf', panel: '#c0c3c7', accent: '#8f959b', accentStyle: 'lines', sole: '#ece7dc', outsole: '#bdb8ac', mesh: true, midsoleStyle: 'air', window: '#8d9db8', collar: '#b7bbbf' }),
    P({ upper: '#1f2022', toe: '#4a4c50', heel: '#5d6066', panel: '#3a3c40', accent: '#a9adb3', accentStyle: 'lines', sole: '#2b2c2f', outsole: '#121213', mesh: true, midsoleStyle: 'air', window: '#6c7078', collar: '#5d6066', lace: '#a9adb3' }),
  ] },
  'converse-chuck-70': { kind: 'high', h: 44, ways: [
    P({ upper: '#151617', toe: '#f1ede2', heel: '#151617', panel: '#151617', accent: '#f1ede2', sole: '#f1ede2', outsole: '#d9d3c2', midsoleStyle: 'foxing', foxing: '#f1ede2', collar: '#151617', lace: '#f1ede2', patch: '#f1ede2' }),
    P({ upper: '#ece6d4', toe: '#f5f1e4', heel: '#ece6d4', panel: '#e4ddc8', accent: '#151617', sole: '#f5f1e4', outsole: '#d9d3c2', midsoleStyle: 'foxing', foxing: '#151617', collar: '#e4ddc8', lace: '#f8f5ea', patch: '#151617' }),
  ] },
};

function shoeSvg(kind, h, c) {
  const yb = 440, ym = yb - h, yt = ym - 6;
  const toe = c.toe ?? c.upper, heel = c.heel ?? c.upper, panel = c.panel ?? c.upper, tongue = c.tongue ?? c.upper;
  const out = 'stroke="rgba(0,0,0,.22)" stroke-width="2" stroke-linejoin="round"';
  let upper, S, E, collarPath, tonguePath, heelPath;
  if (kind === 'high') {
    upper = `M112 ${yt} L104 ${yt-250} Q102 ${yt-330} 140 ${yt-340} L236 ${yt-346} Q268 ${yt-338} 274 ${yt-304} L520 ${yt-92} Q610 ${yt-80} 670 ${yt-52} Q730 ${yt-28} 738 ${yt-4} L738 ${yt} Z`;
    S = [274, yt-304]; E = [520, yt-92];
    collarPath = `M140 ${yt-340} L236 ${yt-346} Q268 ${yt-338} 274 ${yt-304} L252 ${yt-300} Q244 ${yt-318} 232 ${yt-322} L146 ${yt-318} Z`;
    tonguePath = `M258 ${yt-296} Q272 ${yt-356} 326 ${yt-352} L372 ${yt-270} L300 ${yt-246} Z`;
    heelPath = `M112 ${yt} L104 ${yt-250} Q102 ${yt-330} 140 ${yt-340} L176 ${yt-342} Q216 ${yt-170} 196 ${yt} Z`;
  } else if (kind === 'runner') {
    upper = `M112 ${yt} L104 ${yt-112} Q102 ${yt-150} 134 ${yt-158} L206 ${yt-168} Q246 ${yt-152} 276 ${yt-142} L${300} ${yt-138} L540 ${yt-80} Q620 ${yt-70} 676 ${yt-46} Q732 ${yt-26} 738 ${yt-4} L738 ${yt} Z`;
    S = [300, yt-138]; E = [540, yt-80];
    collarPath = `M134 ${yt-158} L206 ${yt-168} Q246 ${yt-152} 276 ${yt-142} L258 ${yt-130} Q232 ${yt-142} 204 ${yt-146} L140 ${yt-134} Z`;
    tonguePath = `M262 ${yt-146} Q286 ${yt-190} 336 ${yt-184} L392 ${yt-118} L322 ${yt-110} Z`;
    heelPath = `M112 ${yt} L104 ${yt-112} Q102 ${yt-150} 134 ${yt-158} L172 ${yt-164} Q214 ${yt-90} 200 ${yt} Z`;
  } else {
    upper = `M112 ${yt} L106 ${yt-130} Q104 ${yt-176} 140 ${yt-186} L212 ${yt-196} Q248 ${yt-178} 282 ${yt-152} L300 ${yt-150} L520 ${yt-92} Q610 ${yt-80} 670 ${yt-52} Q730 ${yt-28} 738 ${yt-4} L738 ${yt} Z`;
    S = [300, yt-150]; E = [520, yt-92];
    collarPath = `M140 ${yt-186} L212 ${yt-196} Q248 ${yt-178} 282 ${yt-152} L262 ${yt-142} Q236 ${yt-162} 206 ${yt-168} L146 ${yt-156} Z`;
    tonguePath = `M266 ${yt-158} Q290 ${yt-210} 342 ${yt-204} L398 ${yt-130} L326 ${yt-120} Z`;
    heelPath = `M112 ${yt} L106 ${yt-130} Q104 ${yt-176} 140 ${yt-186} L176 ${yt-190} Q216 ${yt-110} 198 ${yt} Z`;
  }
  const dx = E[0]-S[0], dy = E[1]-S[1], len = Math.hypot(dx, dy);
  const n = [-dy/len, dx/len];
  const L = kind === 'high' ? 34 : 38;
  const eyestay = `M${S[0]} ${S[1]} L${E[0]} ${E[1]} L${E[0]+n[0]*L} ${E[1]+n[1]*L} L${S[0]+n[0]*L} ${S[1]+n[1]*L} Z`;
  const count = kind === 'high' ? 6 : 5;
  let laces = '';
  for (let i = 0; i < count; i++) {
    const t = (i + 0.6) / (count + 0.1);
    const px = S[0] + dx*t, py = S[1] + dy*t;
    laces += `<line x1="${(px).toFixed(1)}" y1="${(py-3).toFixed(1)}" x2="${(px+n[0]*(L+8)).toFixed(1)}" y2="${(py+n[1]*(L+8)).toFixed(1)}" stroke="${c.lace}" stroke-width="8" stroke-linecap="round" stroke-opacity=".95"/>`;
    laces += `<line x1="${(px).toFixed(1)}" y1="${(py+3).toFixed(1)}" x2="${(px+n[0]*(L+8)).toFixed(1)}" y2="${(py+n[1]*(L+8)+6).toFixed(1)}" stroke="rgba(0,0,0,.15)" stroke-width="2" stroke-linecap="round"/>`;
  }
  // toe cap
  const toeCap = kind === 'high'
    ? `M590 ${yt-80} Q662 ${yt-70} 686 ${yt-48} Q736 ${yt-30} 738 ${yt-4} L738 ${yt} L600 ${yt} Q604 ${yt-40} 590 ${yt-80} Z`
    : `M560 ${yt-84} Q640 ${yt-76} 672 ${yt-52} Q730 ${yt-28} 738 ${yt-4} L738 ${yt} L596 ${yt} Q590 ${yt-50} 560 ${yt-84} Z`;
  // accent
  let accent = '';
  const ay = kind === 'high' ? yt-20 : yt;
  if (c.accentStyle === 'wedge') {
    accent = `<path d="M236 ${ay-36} Q330 ${ay-78} 438 ${ay-118} Q404 ${ay-50} 320 ${ay-24} Q262 ${ay-14} 236 ${ay-36} Z" fill="${c.accent}" ${out}/>`;
  } else if (c.accentStyle === 'lines') {
    accent = [0, 22, 44].map((o) => `<path d="M${250+o} ${ay-6} Q${320+o} ${ay-60} ${420+o*0.4} ${ay-96+o*0.5}" fill="none" stroke="${c.accent}" stroke-width="9" stroke-linecap="round"/>`).join('');
  }
  if (kind === 'high') accent = `<circle cx="196" cy="${yt-120}" r="34" fill="${c.patch}" stroke="rgba(0,0,0,.2)" stroke-width="2"/><circle cx="196" cy="${yt-120}" r="18" fill="none" stroke="${c.upper === '#151617' ? '#151617' : '#ece6d4'}" stroke-width="4" opacity=".6"/>`;
  // midsole
  const midsole = kind === 'runner'
    ? `M90 ${ym-6} L94 ${yb-12} Q96 ${yb} 124 ${yb} L676 ${yb} Q728 ${yb} 738 ${yb-40} L746 ${ym+8} Q746 ${ym-6} 724 ${ym-6} Z`
    : `M104 ${ym-6} L104 ${yb-12} Q104 ${yb} 126 ${yb} L676 ${yb} Q726 ${yb} 738 ${yb-34} L742 ${ym} Q742 ${ym-6} 728 ${ym-6} Z`;
  const outsole = `M106 ${yb-18} Q106 ${yb+10} 134 ${yb+10} L672 ${yb+10} Q726 ${yb+10} 738 ${yb-28} Z`;
  let soleExtra = '';
  if (c.midsoleStyle === 'air') soleExtra = `<rect x="128" y="${ym+8}" width="132" height="${Math.max(h-26, 20)}" rx="14" fill="${c.window}" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`;
  if (c.midsoleStyle === 'boost') soleExtra = `<path d="M96 ${ym-6} L96 ${yb-12} Q98 ${yb} 124 ${yb} L676 ${yb} Q728 ${yb} 738 ${yb-40} L746 ${ym+8} Q746 ${ym-6} 724 ${ym-6} Z" fill="url(#boost)"/>`;
  if (c.midsoleStyle === 'foxing') soleExtra = `<rect x="106" y="${ym+(h>40?10:6)}" width="634" height="7" rx="3" fill="${c.foxing}" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>`;
  const soleLine = `<path d="M108 ${ym+h*0.55} L738 ${ym+h*0.55}" stroke="rgba(0,0,0,.12)" stroke-width="2" fill="none"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520" role="img">
<defs>
<linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
<pattern id="mesh" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.3" fill="#000" fill-opacity=".16"/></pattern>
<pattern id="boost" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="4.5" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="2"/></pattern>
<clipPath id="u"><path d="${upper}"/></clipPath>
</defs>
<ellipse cx="420" cy="${yb+26}" rx="340" ry="14" fill="#000" opacity=".13"/>
<path d="${outsole}" fill="${c.outsole}" ${out}/>
<path d="${tonguePath}" fill="${tongue}" ${out}/>
<path d="${midsole}" fill="${c.sole}" ${out}/>
${soleExtra}${soleLine}
<path d="${upper}" fill="${c.upper}" ${out}/>
<g clip-path="url(#u)">
<path d="${toeCap}" fill="${toe}" ${out}/>
<path d="${heelPath}" fill="${heel}" ${out}/>
<path d="${eyestay}" fill="${panel}" ${out}/>
${c.mesh ? `<path d="${upper}" fill="url(#mesh)"/>` : ''}
${accent}
${laces}
<path d="${upper}" fill="url(#sh)"/>
</g>
<path d="${collarPath}" fill="${c.collar}" ${out}/>
<path d="${upper}" fill="none" ${out}/>
</svg>`;
}

for (const [slug, def] of Object.entries(SHOES)) {
  def.ways.forEach((w, i) => writeFileSync(`${OUT}/${slug}-${i + 1}.svg`, shoeSvg(def.kind, def.h, w)));
}
writeFileSync('public/images/placeholder.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520" role="img" aria-label="Image coming soon"><rect width="800" height="520" fill="#ececec"/><g fill="none" stroke="#9a9ea3" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M250 330 L250 250 Q250 230 270 230 L330 250 L470 300 Q540 310 560 330 L560 350 L250 350 Z"/></g><text x="400" y="420" font-family="Arial, sans-serif" font-size="28" fill="#6b6e73" text-anchor="middle">Image coming soon</text></svg>`);
console.log('Sneaker images written to', OUT);
