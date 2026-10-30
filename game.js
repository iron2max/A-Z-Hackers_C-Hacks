const $ = id => document.getElementById(id), R = Math.random, PI = Math.PI;
const CATS = { safe: "Scene safety", recog: "Warning signs", esc: "Calling for help", act: "Safe actions", comm: "Communication" };
/* [question, category, [[text, correct, feedback, isCall]]] */
const MS = [
    {
        n: "Mission 1: The Sudden Collapse", loc: [50, 50], lying: 1, resp: "Not responding", call: "Dispatch: A person has collapsed in Riverside Park. Head to the red beacon.",
        sign: "An adult lies motionless on the path. Pale skin. Bystanders are unsure what to do.", steps: [
            ["Before you touch anyone, what comes first?", "safe", [["Look around for hazards such as traffic, water or wires", 1, "Checking scene safety protects you, and you cannot help if you become a second casualty."], ["Rush in and kneel beside them", 0, "Rushing in without a look can put you in danger too."], ["Film the scene for social media", 0, "Filming wastes time. Every second matters."]]],
            ["How do you check if they respond?", "recog", [["Tap their shoulders firmly and shout “Are you okay?”", 1, "Correct. A firm tap and a loud voice is the standard way to check responsiveness."], ["Shake them hard", 0, "Hard shaking can cause harm, especially if there is an injury."], ["Splash water on their face", 0, "Water can block the airway of an unresponsive person."]]],
            ["They do not respond. What next?", "esc", [["Call 112, put the phone on speaker, and ask someone to find an AED", 1, "Correct. Early calls bring professionals sooner, and the dispatcher will coach you.", 1], ["Wait a minute to see if they wake up", 0, "Waiting wastes critical time. Call right away."], ["Carry them to your car", 0, "Moving them yourself is unsafe. Ambulance crews have equipment and training."]]],
            ["How do you check their breathing?", "recog", [["Look at the chest for up to 10 seconds. Gasping is not normal breathing", 1, "Correct. Occasional gasps can happen in cardiac arrest and are not normal breathing."], ["Give them water so they can swallow", 0, "Never give food or drink to an unresponsive person."], ["Prop their head up with a bag and leave", 0, "Do not leave an unresponsive person alone."]]],
            ["They are not breathing normally. What do you do?", "act", [["Start hard, fast chest compressions in the centre of the chest and follow the dispatcher. Use the AED when it arrives", 1, "Correct. Adults need about 5–6 cm depth at 100–120 per minute."], ["Wait quietly for the ambulance", 0, "If breathing is absent, compressions keep blood moving to the brain."], ["Give them medicine", 0, "Medicine does not help here and can cause harm."]]]]
    },
    {
        n: "Mission 2: The Roadside Injury", loc: [25, -50], lying: 1, resp: "Awake, in pain", call: "Dispatch: A cyclist was hit on Central Avenue. Traffic is still moving. Stay safe.",
        sign: "A cyclist lies near the kerb with a bent bike. Complains of neck pain. Cars pass nearby.", steps: [
            ["Cars are still driving past. What first?", "safe", [["Check traffic, stay on the safe side, and ask drivers to slow or stop", 1, "Correct. Scene hazards come before everything else."], ["Run into the lane to reach them", 0, "You could be hit. Do not enter live traffic."], ["Pull the bike out of the road first", 0, "Hazard control matters, but not by risking yourself."]]],
            ["They are awake but hurt. What now?", "esc", [["Call 112 and give the exact location", 1, "Correct. Clear location details help responders arrive faster.", 1], ["Help them stand and walk to the pavement", 0, "Moving an injured person may worsen spine injuries."], ["Offer them a lift to the hospital", 0, "Do not transport a person with a possible neck or spine injury."]]],
            ["They say their neck hurts. What do you do?", "act", [["Ask them to stay still, steady their head as found, and keep talking calmly", 1, "Correct. Avoid moving them unless there is immediate danger. Do not remove the helmet unless trained or the airway is blocked."], ["Remove the helmet and sit them up", 0, "This can worsen a spinal injury."], ["Tell them to move their neck to test it", 0, "Movement can cause further injury."]]],
            ["While you wait, what is your job?", "comm", [["Reassure them and watch their responsiveness and breathing", 1, "Correct. Changes should be told to the dispatcher right away."], ["Leave to find the driver", 0, "Stay with the injured person. Ask others to collect details."], ["Give them painkillers and water", 0, "Do not give food, drink or medicine. They may need surgery."]]]]
    },
    {
        n: "Mission 3: The Possible Stroke", loc: [-75, 0], lying: 0, resp: "Awake, slurred speech", call: "Dispatch: A man is confused near Market Street. Face looks uneven. Please assess.",
        sign: "One side of the face droops. He cannot lift his right arm. Speech is slurred.", steps: [
            ["Which signs should you check for?", "recog", [["Face droop, Arm weakness, Speech difficulty. Time to call", 1, "Correct. This is the FAST check. Time matters because brain cells are lost quickly."], ["Only check if he looks tired", 0, "Stroke signs are never to be dismissed as tiredness."], ["Wait to see if it passes", 0, "Never wait. Symptoms may fade and return."]]],
            ["What is the right call?", "esc", [["Call 112 immediately and note when symptoms started", 1, "Correct. Onset time helps doctors choose treatments.", 1], ["Let him go home and sleep it off", 0, "Sleeping delays urgent care."], ["Give him aspirin", 0, "Some strokes are caused by bleeding, and aspirin can make that worse."]]],
            ["While waiting, what do you do?", "act", [["Help him sit safely, give nothing to eat or drink, and stay with him", 1, "Correct. Swallowing may be impaired, so food or drink can cause choking."], ["Give him a cup of sweet tea", 0, "Swallowing can be affected. Do not give food or drink."], ["Walk him around to wake him up", 0, "Rest and safety are better than activity."]]],
            ["The ambulance is arriving. What do you tell them?", "comm", [["The exact time symptoms began and what you saw", 1, "Correct. Clear handover speeds hospital treatment."], ["Nothing, since they are professionals", 0, "Responders rely on witnesses for the timeline."], ["That he is probably just dizzy", 0, "Do not guess a diagnosis. Report what you saw."]]]]
    },
    {
        n: "Mission 4: The Severe Bleeding", loc: [-25, 50], lying: 1, resp: "Awake, frightened", call: "Dispatch: A worker has a deep leg wound near the construction yard. Heavy bleeding reported.",
        sign: "A worker sits holding a deep leg cut. Blood is soaking through his trousers.", steps: [
            ["Heavy bleeding. What first?", "esc", [["Call 112 or ask a bystander to, then help", 1, "Correct. Severe bleeding needs professionals quickly.", 1], ["Look for the cause for several minutes first", 0, "Delay costs blood. Act and call."], ["Give him water", 0, "Do not give drinks. He may need surgery."]]],
            ["How do you control the bleeding?", "act", [["Press firmly and directly on the wound with a clean cloth or dressing", 1, "Correct. Firm direct pressure is the first-line method."], ["Lift the cloth every few seconds to check", 0, "Lifting disturbs clots and restarts bleeding."], ["Wash the wound with water first", 0, "Stopping bleeding comes first."]]],
            ["Blood soaks through the cloth. What now?", "act", [["Add more padding on top and keep pressing", 1, "Correct. Do not remove soaked layers."], ["Remove it and start a fresh one", 0, "Removing pads disturbs clots."], ["Stop pressing and wait", 0, "Continuous pressure is needed until help arrives."]]],
            ["While waiting, what helps?", "comm", [["Lay him down, keep him warm and calm, and give no food or drink", 1, "Correct. Reassurance and warmth reduce shock."], ["Ask him to walk to the road", 0, "Movement increases bleeding."], ["Leave him to find a first-aid kit", 0, "Do not leave him. Send someone else."]]]]
    },
    {
        n: "Mission 5: The Breathing Emergency", loc: [-50, -50], lying: 0, resp: "Awake, gasping", call: "Dispatch: A woman in Greenway Park cannot catch her breath. Respond now.",
        sign: "A woman is wheezing, speaking only a few words at a time, and has blue-tinged lips.", steps: [
            ["She is struggling to breathe. First action?", "esc", [["Call 112, and help her sit upright", 1, "Correct. Sitting upright makes breathing easier.", 1], ["Lay her flat to rest", 0, "Lying flat can make breathing harder."], ["Tell her to hold her breath and calm down", 0, "That does not help and may cause panic."]]],
            ["She mentions her prescribed inhaler. What do you do?", "act", [["Help her use her own prescribed inhaler as directed", 1, "Correct. Only use the person’s own prescribed medicine."], ["Give her pills from your bag", 0, "Never give someone medicine that was not prescribed for them."], ["Make her drink water instead", 0, "Water does not treat a breathing emergency."]]],
            ["She looks scared. What do you say?", "comm", [["Speak calmly, encourage slow breaths, and stay close", 1, "Correct. Calm voices lower panic, which helps breathing."], ["Tell her it is not serious", 0, "False reassurance hides danger. Be honest but calm."], ["Walk away to find help", 0, "Stay with her and ask others to help."]]],
            ["She stops responding. What next?", "act", [["Tell the dispatcher and follow their CPR instructions", 1, "Correct. The dispatcher will coach you step by step."], ["Pat her back and wait", 0, "This is not treatment for unresponsiveness."], ["Give her something to drink", 0, "Never give drink to someone who cannot respond."]]]]
    },
    {
        n: "Mission 6: The Crowd Crisis", loc: [75, 75], lying: 1, multi: 1, resp: "Several casualties", call: "Dispatch: A stage collapse at Plaza Junction. Multiple injured. Stay safe and prioritise.",
        sign: "Debris is on the ground. Three people are down. One is silent, one is bleeding, one is shouting.", steps: [
            ["What comes first?", "safe", [["Check for ongoing hazards and move people away from danger", 1, "Correct. Scene safety comes first, even with many casualties."], ["Run to the nearest person", 0, "Unchecked hazards may cause more casualties."], ["Gather everyone to watch", 0, "Crowds create risk and block responders."]]],
            ["Calling for help. What do you tell the dispatcher?", "esc", [["Exact location, number of casualties, and any hazards", 1, "Correct. Clear details let dispatch send the right resources.", 1], ["Just say “help”", 0, "Dispatchers need specifics."], ["Hang up quickly to start helping", 0, "Stay on the line so they can guide you."]]],
            ["Who do you help first?", "recog", [["The person who is silent and not responding, then severe bleeding", 1, "Correct. Those with life-threatening problems come first, not the loudest."], ["The person shouting loudest", 0, "A shouting person is breathing and speaking. A silent one may be in more danger."], ["Whoever is closest", 0, "Prioritise by severity, not distance."]]],
            ["How do you use bystanders?", "comm", [["Assign tasks: one meets the ambulance, one keeps the crowd back, one fetches a kit", 1, "Correct. Clear roles reduce chaos."], ["Ask everyone to go home", 0, "Willing helpers are valuable if directed."], ["Do everything yourself", 0, "You cannot manage several casualties alone."]]]]
    }];
const TIPS = ["Save 112 in your phone. It works across India.", "Check the scene for danger before helping anyone.", "Never give food or drink to an unresponsive person.", "FAST: Face, Arms, Speech, Time. Call for help at once.", "Direct pressure with a clean cloth controls most bleeding.", "Take a certified first-aid course. This game is not a replacement."];
const SRC = ["WHO: who.int, “Basic emergency care”", "Indian Red Cross Society: indianredcross.org", "Red Cross first aid guidelines: redcross.org", "NHS: nhs.uk/conditions/stroke and /first-aid", "American Heart Association: cpr.heart.org", "India emergency number: 112"];
const fresh = () => ({ cur: 0, pts: 0, streak: 0, cats: { safe: [0, 0], recog: [0, 0], esc: [0, 0], act: [0, 0], comm: [0, 0] }, first: [], last: [], ach: {}, tips: {}, done: [] });
let S = fresh();
try { const s = JSON.parse(localStorage.getItem("pulsepoint") || "null"); if (s && typeof s === "object") S = Object.assign(S, s) } catch (e) { }
S.cur = Math.max(0, Math.min(+S.cur || 0, MS.length - 1)); S.pts = Math.max(0, +S.pts || 0); S.streak = Math.max(0, +S.streak || 0); S.first = Array.isArray(S.first) ? S.first : []; S.last = Array.isArray(S.last) ? S.last : []; S.done = Array.isArray(S.done) ? S.done : []; S.ach = S.ach || {}; S.tips = S.tips || {}; S.cats = S.cats || {}; Object.keys(CATS).forEach(k => { if (!Array.isArray(S.cats[k])) S.cats[k] = [0, 0] });
const save = () => { try { localStorage.setItem("pulsepoint", JSON.stringify(S)) } catch (e) { } };
let scene, cam, ren, sun, hemi, player, vehicle, driving = false, state = "menu", yaw = .6, pitch = .45, keys = {}, M = null, mute = false, clock = 0, cars = [], peds = [], sites = [], tipOrbs = [], bills = [], amb = null, ambT = 0, solids = [], mark, tmr = 0;
/* ---------- audio ---------- */
let AC = null;
function beep(f = 660, d = .12, type = "sine", v = .07) {
    if (mute) return;
    try {
        AC = AC || new (window.AudioContext || window.webkitAudioContext)();
        if (AC.state === 'suspended') { AC.resume(); }
        const o = AC.createOscillator(), g = AC.createGain();
        o.type = type; o.frequency.value = f; g.gain.value = v;
        g.gain.exponentialRampToValueAtTime(.001, AC.currentTime + d);
        o.connect(g); g.connect(AC.destination);
        o.start(); o.stop(AC.currentTime + d);
    } catch (e) { }
}
const thump = () => { beep(60, .18, "sine", .2); setTimeout(() => beep(55, .15, "sine", .14), 170) };
setInterval(() => { if (M && state === "scn") thump() }, 700);
/* ---------- helpers ---------- */
function announce(t) { $("live").textContent = ""; setTimeout(() => $("live").textContent = t, 20) }
function toast(t) { const e = $("toast"); e.textContent = t; announce(t); e.style.opacity = 1; clearTimeout(e._t); e._t = setTimeout(() => e.style.opacity = 0, 3200) }
function say(t) { const f = $("feed"), d = document.createElement("div"); d.textContent = t; f.appendChild(d); while (f.children.length > 4) f.removeChild(f.firstChild); announce(t); beep(880, .1, "square", .04) }
function winTex(rw, rh) { const c = document.createElement("canvas"); c.width = c.height = 64; const g = c.getContext("2d"); g.fillStyle = "#16202e"; g.fillRect(0, 0, 64, 64); for (let y = 4; y < 64; y += 12)for (let x = 4; x < 64; x += 12) { g.fillStyle = R() < .45 ? "#ffd98a" : "#27384f"; g.fillRect(x, y, 7, 7) } const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rw, rh); return t }
const mat = c => new THREE.MeshLambertMaterial({ color: c });
function mesh(g, m, x, y, z, cast) { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); if (cast) { o.castShadow = true } o.receiveShadow = true; scene.add(o); return o }
const capsule = (r, h) => THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(r, h, 6, 10) : new THREE.CylinderGeometry(r, r, h + r * 2, 10);
function limb(parent, x, y, w, h, c) { const p = new THREE.Group(); p.position.set(x, y, 0); const o = new THREE.Mesh(capsule(w / 2, Math.max(.05, h - w)), mat(c)); o.position.y = -h / 2; o.castShadow = true; p.add(o); parent.add(p); return p }
function fig(shirt, skin = 0xe0b08c) {
    const g = new THREE.Group(), mk = (geo, c, x, y, z = 0) => { const o = new THREE.Mesh(geo, mat(c)); o.position.set(x, y, z); o.castShadow = true; g.add(o); return o };
    const torso = mk(capsule(.34, .62), shirt, 0, 1.42), neck = mk(new THREE.CylinderGeometry(.13, .13, .16, 10), skin, 0, 1.9), head = mk(new THREE.SphereGeometry(.29, 14, 12), skin, 0, 2.14);
    const hair = mk(new THREE.SphereGeometry(.3, 14, 8), 0x23180f, 0, 2.28, .01); hair.scale.y = .55; const eyeM = new THREE.MeshBasicMaterial({ color: 0x101820 });[-.1, .1].forEach(x => { const e = new THREE.Mesh(new THREE.SphereGeometry(.035, 7, 6), eyeM); e.position.set(x, 2.16, .275); g.add(e) });
    mk(new THREE.CylinderGeometry(.38, .32, .12, 10), 0x1b263b, 0, .98); g.head = head; g.skin = skin; g.legL = limb(g, -.17, 1.0, .19, .9, 0x26364d); g.legR = limb(g, .17, 1.0, .19, .9, 0x26364d); g.armL = limb(g, -.42, 1.72, .16, .73, shirt); g.armR = limb(g, .42, 1.72, .16, .73, shirt); mk(new THREE.SphereGeometry(.105, 9, 8), skin, -.42, .96); mk(new THREE.SphereGeometry(.105, 9, 8), skin, .42, .96); return g
}
const walk = (f, t, v) => { const s = Math.sin(t * 10) * .7 * v; f.legL.rotation.x = s; f.legR.rotation.x = -s; f.armL.rotation.x = -s; f.armR.rotation.x = s };
/* ---------- world ---------- */
function build() {
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x7fb4e6); scene.fog = new THREE.Fog(0x7fb4e6, 60, 230);
    cam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, .1, 400);
    ren = new THREE.WebGLRenderer({ canvas: $("gl"), antialias: true }); ren.setPixelRatio(Math.min(devicePixelRatio, 2)); ren.setSize(innerWidth, innerHeight); ren.shadowMap.enabled = true;
    hemi = new THREE.HemisphereLight(0xcfe6ff, 0x333344, .8); scene.add(hemi);
    sun = new THREE.DirectionalLight(0xfff2d0, 1); sun.position.set(80, 120, 40); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); const sc = sun.shadow.camera; sc.left = sc.bottom = -140; sc.right = sc.top = 140; sc.far = 400; scene.add(sun);
    mesh(new THREE.PlaneGeometry(400, 400).rotateX(-PI / 2), mat(0x0d1117), 0, 0, 0);
    for (const k of [-75, -25, 25, 75]) {
        mesh(new THREE.PlaneGeometry(20, 270).rotateX(-PI / 2), mat(0x1b2230), k, .02, 0); mesh(new THREE.PlaneGeometry(270, 20).rotateX(-PI / 2), mat(0x1b2230), 0, .03, k);
        mesh(new THREE.PlaneGeometry(.4, 270).rotateX(-PI / 2), new THREE.MeshBasicMaterial({ color: 0xcaa94a }), k, .04, 0); mesh(new THREE.PlaneGeometry(270, .4).rotateX(-PI / 2), new THREE.MeshBasicMaterial({ color: 0xcaa94a }), 0, .05, k)
    }
    for (let i = -2; i <= 2; i++)for (let j = -2; j <= 2; j++) {
        const cx = i * 50, cz = j * 50, park = (i == 1 && j == 1) || (i == -1 && j == -1) || (i == -1 && j == 1) || (i == 0 && j == 0), hosp = i == 2 && j == -2;
        mesh(new THREE.BoxGeometry(30, .3, 30), mat(park ? 0x2d6a3e : 0x555a66), cx, .15, cz);
        if (park) {
            for (let k = 0; k < 7; k++) { const x = cx + (R() - .5) * 24, z = cz + (R() - .5) * 24; if (i == 0 && Math.abs(x) < 8 && Math.abs(z) < 8) continue; const t = new THREE.Group(); t.position.set(x, .3, z); const tr = new THREE.Mesh(new THREE.CylinderGeometry(.3, .4, 2), mat(0x5b3a1e)); tr.position.y = 1; const lf = new THREE.Mesh(new THREE.ConeGeometry(1.8, 4, 7), mat(0x1f7a3a)); lf.position.y = 4; lf.castShadow = true; t.add(tr, lf); scene.add(t) }
            if (i == 0 && j == 0) { const h = mesh(new THREE.BoxGeometry(10, 8, 10), new THREE.MeshLambertMaterial({ color: 0x19e6c1, emissive: 0x0a5a4c }), 0, 4.3, 0, 1); solids.push([0, 0, 6]) } continue
        }
        const h = hosp ? 22 : 12 + R() * 38, w = hosp ? 28 : 22 + R() * 4, m = new THREE.MeshLambertMaterial({ color: hosp ? 0xffffff : 0xffffff, map: winTex(w / 9, h / 9), emissive: 0x887755, emissiveMap: null }); m.emissiveMap = m.map; if (hosp) { m.map = null; m.emissiveMap = null; m.color.set(0xe8eef5) }
        mesh(new THREE.BoxGeometry(w, h, w), m, cx, h / 2 + .3, cz, 1); solids.push([cx, cz, w / 2 + 1]);
        if (hosp) { const c = new THREE.MeshBasicMaterial({ color: 0xff2040 }); mesh(new THREE.PlaneGeometry(10, 3), c, cx, 16, cz - w / 2 - .05); mesh(new THREE.PlaneGeometry(3, 10), c, cx, 16, cz - w / 2 - .06) }
        else if (R() < .35) { const bm = new THREE.MeshBasicMaterial({ color: 0xff00aa }); bills.push(bm); mesh(new THREE.PlaneGeometry(14, 5), bm, cx, h + 3.5, cz + w / 2 + .2) }
    }
    for (const x of [-75, -25, 25, 75]) for (const z of [-75, -25, 25, 75]) { const p = mesh(new THREE.CylinderGeometry(.15, .15, 7), mat(0x333844), x + 11, 3.5, z + 11); mesh(new THREE.SphereGeometry(.5), new THREE.MeshBasicMaterial({ color: 0xfff0b0 }), x + 11, 7.2, z + 11) }
    for (let i = 0; i < 7; i++) { const c = new THREE.Group(), paint = [0xd04040, 0x4080d0, 0xe0e0e0, 0xd0b040][i % 4], b = new THREE.Mesh(new THREE.BoxGeometry(2, .82, 4.2), mat(paint)); b.position.y = .72; b.castShadow = true; const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.78, .72, 1.95), mat(0x1a2b3d)); cabin.position.set(0, 1.42, -.28); c.add(b, cabin);[-1, 1].forEach(x => [-1.48, 1.48].forEach(z => { const wh = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, .2, 12), mat(0x101419)); wh.rotation.z = PI / 2; wh.position.set(x, .38, z); c.add(wh) }));[-.62, .62].forEach(x => { const lamp = new THREE.Mesh(new THREE.BoxGeometry(.33, .16, .08), new THREE.MeshBasicMaterial({ color: 0xfff1bb })); lamp.position.set(x, .78, -2.12); c.add(lamp) }); scene.add(c); const ln = [-75, -25, 25, 75][i % 4]; cars.push({ m: c, ln, ax: i % 2, d: i % 3 ? 1 : -1, v: 8 + R() * 5, p: (R() - .5) * 240 }) }
    for (let i = 0; i < 18; i++) { const f = fig([0xc04a4a, 0x4a8ac0, 0xc0a04a, 0x6ac04a][i % 4]); scene.add(f); peds.push({ m: f, ln: [-75, -25, 25, 75][i % 4], ax: i % 2, off: (i % 2 ? 1 : -1) * (8 + R() * 1.5), d: R() < .5 ? 1 : -1, v: 1.5 + R() * 1.2, p: (R() - .5) * 230 }) }
    player = fig(0x19e6c1); player.position.set(0, .3, 16); scene.add(player);
    const vest = new THREE.Mesh(new THREE.BoxGeometry(.75, .5, .45), new THREE.MeshBasicMaterial({ color: 0xff7a00 })); vest.position.y = 1.4; player.add(vest);
    vehicle = new THREE.Group(); const vb = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.55, 4.9), mat(0xf3f5f6)); vb.position.y = 1.05; vb.castShadow = true; const vr = new THREE.Mesh(new THREE.BoxGeometry(2.62, .44, 5.02), mat(0xd72e45)); vr.position.y = 1.25; const vw = new THREE.Mesh(new THREE.BoxGeometry(2.25, .75, 2), mat(0x203047)); vw.position.set(0, 2.15, -.35); vehicle.add(vb, vr, vw);[-1, 1].forEach(x => [-1.65, 1.65].forEach(z => { const wh = new THREE.Mesh(new THREE.CylinderGeometry(.38, .38, .25, 12), mat(0x11151b)); wh.rotation.z = PI / 2; wh.position.set(x, .45, z); vehicle.add(wh) })); const crossMat = new THREE.MeshBasicMaterial({ color: 0xd72e45 });[-1, 1].forEach(z => { const a = new THREE.Mesh(new THREE.BoxGeometry(.18, .8, .04), crossMat), b = new THREE.Mesh(new THREE.BoxGeometry(.8, .18, .04), crossMat); a.position.set(0, 1.35, z * 2.48); b.position.set(0, 1.35, z * 2.5); vehicle.add(a, b) });[-.7, .7].forEach(x => { const lamp = new THREE.Mesh(new THREE.BoxGeometry(.34, .16, .08), new THREE.MeshBasicMaterial({ color: 0xfff0b0 })); lamp.position.set(x, .9, -2.48); vehicle.add(lamp) }); const beacon = new THREE.Mesh(new THREE.BoxGeometry(1.1, .18, .38), new THREE.MeshBasicMaterial({ color: 0x19e6c1 })); beacon.position.set(0, 2.65, .15); vehicle.add(beacon); vehicle.beacon = beacon; vehicle.position.set(0, 0, 16); scene.add(vehicle);
    mark = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 60, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xff3b5c, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false })); mark.position.y = 30; mark.visible = false; scene.add(mark);
    MS.forEach((m, i) => {
        const [x, z] = m.loc, g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g); const pts = []; const n = m.multi ? 3 : 1;
        for (let k = 0; k < n; k++) { const f = fig([0x9a5ac0, 0xc08a3a, 0x3aa0c0][k % 3]); const ps = new THREE.Group(); ps.position.set(k * 2.2 - (n - 1), 0, 0); if (m.lying) { f.rotation.x = -PI / 2; f.position.set(0, .45, .9) } else { f.rotation.z = .1 } ps.add(f); g.add(ps); pts.push(f) }
        for (let k = 0; k < 2; k++) { const f = fig(0xd0d0d0); f.position.set(k ? 3.5 : -3.5, .3, 2.5); f.rotation.y = k ? -2.3 : 2.3; g.add(f); pts.push(f) }
        if (i == 1) { const b = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, 2), mat(0x888)); b.position.set(2, .4, -1); g.add(b) }
        sites.push({ g, pts: pts.slice(0, n), x, z, i })
    });
    TIPS.forEach((t, i) => { const o = new THREE.Mesh(new THREE.SphereGeometry(.7, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffc24a })); const p = [[0, 32], [-25, -25], [25, 25], [-75, 50], [75, -25], [50, 0]][i]; o.position.set(p[0], 1.8, p[1]); scene.add(o); tipOrbs.push({ o, i, x: p[0], z: p[1] }) });
    addEventListener("resize", () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); ren.setSize(innerWidth, innerHeight) })
}
/* ---------- ECG ---------- */
function ecg(c, sp, col) { const g = c.getContext("2d"), W = c.width, H = c.height; g.clearRect(0, 0, W, H); g.strokeStyle = col; g.lineWidth = 2; g.shadowColor = col; g.shadowBlur = 8; g.beginPath(); for (let x = 0; x < W; x++) { const p = ((x / W * 2) - clock * sp) % 1, q = (p + 1) % 1; let y = 0; if (q > .4 && q < .45) y = -(q - .4) * 20 * H * .9; else if (q >= .45 && q < .5) y = (q - .5) * 20 * H * .9 + H * .45 * 0; else if (q >= .5 && q < .54) y = (q - .5) * 8 * H * .3; g.lineTo(x, H / 2 + y * .35 + Math.sin(q * 40) * .6) } g.stroke() }
/* ---------- game flow ---------- */
function resetVehicle() { driving = true; vehicle.position.set(0, 0, 16); vehicle.rotation.y = 0; player.visible = false; player.position.copy(vehicle.position); yaw = 0 }
function startGame() { $("ov").classList.add("hide"); $("hud").classList.remove("hide"); state = "play"; setMission(S.cur); resetVehicle(); announce("Dispatch active. You are driving the response ambulance. Follow the beacon and park near the patient.") }
function setMission(i) { M = null; if (i >= MS.length) { return ending() } S.cur = i; const m = MS[i]; tmr = 0; mark.visible = true; mark.position.x = m.loc[0]; mark.position.z = m.loc[1]; $("feed").innerHTML = ""; say(m.call); beep(1000, .3, "square", .08); setTimeout(() => beep(800, .3, "square", .08), 350); hud() }
function hud() { const m = MS[Math.min(S.cur, 5)]; $("obj").innerHTML = `<b>Objective</b><br>${m.n}<br><small>${driving ? "Drive to the red beacon. Press E to exit the ambulance." : "Walk to the patient. Press E to assess."}</small>`; $("pts").innerHTML = `Rescue Points <b>${S.pts}</b><br>Level ${Math.floor(S.pts / 60) + 1} · Streak ${S.streak}<br><span id=tm></span>` }
function openScn(i) { state = "scn"; paused = true; M = { i, step: 0, stab: 60, ok: 0, tot: 0, wrong: [], log: [], t0: performance.now(), eta: null, fb: null }; S.streak = S.streak || 0; renderScn(); say("You: Approaching patient. Observe and assess.") }
let paused = false;
function renderScn() {
    const m = MS[M.i], s = m.steps[M.step];
    const opts = s[2].map((o, k) => ({ o, k })).sort(() => R() - .5); M.opts = opts;
    const ov = $("ov"); ov.className = ""; ov.classList.remove("hide");
    const col = M.stab > 60 ? "#19e6c1" : M.stab > 30 ? "#ffc24a" : "#ff3b5c";
    ov.innerHTML = `<div class="card"><h2>${m.n}</h2><div class="sg">👁 ${m.sign}</div>
<div class="row"><span>Responsiveness: <b>${M.stab < 30 ? "Declining" : m.resp}</b></span><span>Help: <b>${M.eta === null ? "Not called" : M.eta > 0 ? "ETA " + Math.ceil(M.eta) + "s (simulated)" : "On scene"}</b></span></div>
<div class="row"><span>Game stability (fictional, not a medical value)</span><span>${M.stab}%</span></div><div class="bar"><i style="width:${M.stab}%;background:${col}"></i></div>
<h3>Step ${M.step + 1}/${m.steps.length}: ${s[0]}</h3>
${opts.map((x, n) => `<button class="opt choice-btn" data-n="${n}"><span class="choice-key">${n + 1}</span>${x.o[0]}</button>`).join("")}
<div class="safe-note"><b>Training simulation.</b> Prioritise your safety, call professional help early, and follow the dispatcher. This is educational—not diagnosis or a substitute for certified training.</div>
<p><button id="leaveMissionBtn" class="opt" style="background:#334155; margin-top: 10px;">Return to Main Menu</button></p>
<small>Press 1–3 to choose. Safe choices matter more than speed.</small></div>`;

    ov.querySelectorAll("button.choice-btn").forEach(b => b.onclick = () => { beep(880, .1); pick(+b.dataset.n); });
    $("leaveMissionBtn").onclick = () => {
        beep(600, .1);
        state = "menu";
        paused = false;
        M = null;
        if (amb) { scene.remove(amb); amb = null; }
        mark.visible = false;
        $("hud").classList.add("hide");
        menu();
        toast("Returned to main menu.");
    };
    const firstChoice = ov.querySelector("button.choice-btn");
    if (firstChoice) firstChoice.focus();
    ecgSpeed = 1 + (100 - M.stab) / 60;
}
let ecgSpeed = 1;
function enactChoice(text, ok) { if (!ok || !player) return; const q = text.toLowerCase(); player.visible = true; let pose = "reassuring"; if (q.includes("compress") || q.includes("pressure")) { player.armL.rotation.x = player.armR.rotation.x = -1.7; pose = "hands-on response" } else if (q.includes("call") || q.includes("dispatcher")) { player.armR.rotation.z = -1.4; pose = "calling dispatch" } else if (q.includes("stay still") || q.includes("sit safely")) { player.armL.rotation.z = .8; player.armR.rotation.z = -.8; pose = "calming and supporting" } else { player.armL.rotation.x = -.8; player.armR.rotation.x = -.8 } toast("Responder action: " + pose); clearTimeout(player._pose); player._pose = setTimeout(() => { if (player.armL) { player.armL.rotation.set(0, 0, 0); player.armR.rotation.set(0, 0, 0) } }, 1100) }
function pick(n) {
    if (!M || !M.opts || !M.opts[n]) return; const m = MS[M.i], s = m.steps[M.step], o = M.opts[n].o, ok = o[1]; if (M.fb) return;
    M.tot++; S.cats[s[1]][1]++; if (ok) { M.ok++; S.cats[s[1]][0]++; S.streak++; S.pts += 10 + Math.min(S.streak, 5); M.stab = Math.min(100, M.stab + 15); beep(880, .15) } else { S.streak = 0; S.pts = Math.max(0, S.pts - 5); M.stab = Math.max(5, M.stab - 20); M.wrong.push([s[0], o[0], s[2].find(x => x[1])[2]]); beep(180, .3, "sawtooth", .08) }
    if (o[3] && ok) M.eta = 45; M.log.push([s[0], o[0], ok]); enactChoice(o[0], ok); announce((ok ? "Safe choice. " : "Unsafe choice. ") + o[2]);
    M.fb = 1; const card = document.querySelector(".card");
    card.querySelectorAll(".opt").forEach(b => b.disabled = true);
    const fb = document.createElement("div"); fb.className = "fb " + (ok ? "g" : "b"); fb.innerHTML = (ok ? "✅ " : "⚠️ ") + (ok ? o[2] : "Unsafe choice. " + s[2].find(x => x[1])[2] + " Safer option: <b>" + s[2].find(x => x[1])[0] + "</b>");
    const bt = document.createElement("button"); bt.className = "opt"; bt.textContent = M.step + 1 < m.steps.length ? "Continue (Enter)" : "Call it in: responders arrive";
    bt.onclick = () => { beep(880, .1); next(); };
    card.append(fb, bt); bt.focus();
    setPatient(); hud(); if (ok && s[1] === "safe") ach("Scene Safety First")
}
function next() { if (!M) return; M.fb = null; M.step++; if (M.step >= MS[M.i].steps.length) return arrive(); renderScn() }
function setPatient() { const s = sites[M.i]; s.pts.forEach(f => { const c = new THREE.Color(f.skin).lerp(new THREE.Color(0xb8c8e0), (100 - M.stab) / 120); f.head.material.color.copy(c) }) }
function ach(n) { if (S.ach[n]) return; S.ach[n] = 1; toast("🏆 Achievement: " + n); save() }
function arrive() {
    $("ov").classList.add("hide"); state = "cine"; const s = sites[M.i]; if (amb) scene.remove(amb); amb = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 6), mat(0xf4f4f4)); b.position.y = 1.7; const st = new THREE.Mesh(new THREE.BoxGeometry(2.7, .5, 6.1), mat(0xe03040)); st.position.y = 1.5; amb.l1 = new THREE.Mesh(new THREE.BoxGeometry(.8, .3, .5), new THREE.MeshBasicMaterial({ color: 0xff0000 })); amb.l2 = new THREE.Mesh(new THREE.BoxGeometry(.8, .3, .5), new THREE.MeshBasicMaterial({ color: 0x0000ff })); amb.l1.position.set(-.7, 3.1, 0); amb.l2.position.set(.7, 3.1, 0); amb.add(b, st, amb.l1, amb.l2); amb.position.set(s.x + 8, 0, s.z - 30); scene.add(amb); ambT = 0;
    say("Dispatch: Ambulance on scene. Good work. Handing over."); const d = sites[M.i]; player.position.set(s.x + 3, .3, s.z + 3); setTimeout(debrief, 4200)
}
function debrief() {
    state = "deb"; const m = MS[M.i], pct = Math.round(M.ok / M.tot * 100), i = M.i;
    if (S.first[i] == null) S.first[i] = pct; S.last[i] = pct; if (!S.done.includes(i)) S.done.push(i);
    if (M.wrong.length == 0) ach("Calm Under Pressure"); if (M.log.some(l => l[2])) ach("Warning Sign Detective"); save();
    $("ov").className = ""; $("ov").innerHTML = `<div class="card"><h2>Debrief: ${m.n}</h2><p>Safety and decision score: <b>${pct}%</b> · Rescue Points <b>${S.pts}</b><br><small>Scoring rewards safe priorities, not speed. Time on scene: ${Math.round((performance.now() - M.t0) / 1000)}s.${M.eta === null ? " You never called for help, so the simulated response was delayed." : ""}</small></p>
<h3>Decision timeline</h3>${M.log.map(l => `<div class="fb ${l[2] ? "g" : "b"}">${l[2] ? "✅" : "⚠️"} <small>${l[0]}</small><br>${l[1]}</div>`).join("")}
${M.wrong.length ? `<h3>Unsafe actions to avoid</h3>${M.wrong.map(w => `<div>• ${w[1]}<br><small>Why: ${w[2]}</small></div>`).join("")}` : "<p>🎯 No unsafe choices. Excellent.</p>"}
<p><button id="rp">Replay mission</button> <button id="nx" class="big">${i < 5 ? "Next mission" : "See campaign result"}</button></p>
<p><button id="leaveDebriefBtn" class="opt" style="background:#334155; width:100%; margin-top:8px;">Return to Main Menu</button></p></div>`;

    $("rp").onclick = () => { beep(880, .1); S.cur = i; go(i); };
    $("nx").onclick = () => { beep(880, .1); i < 5 ? breakScreen(i + 1) : go(i + 1); };
    $("leaveDebriefBtn").onclick = () => {
        beep(600, .1);
        state = "menu";
        paused = false;
        M = null;
        if (amb) { scene.remove(amb); amb = null; }
        mark.visible = false;
        $("hud").classList.add("hide");
        menu();
        toast("Returned to main menu.");
    };
    $("nx").focus()
}
let brk;
function breakScreen(n) {
    S.cur = n; save(); let t = 15; const tip = TIPS[Math.floor(R() * TIPS.length)]; $("ov").className = ""; $("ov").classList.remove("hide");
    $("ov").innerHTML = `<div class="card" style="text-align:center"><h2>Shift break</h2><p>Take a breath. Mission ${n + 1} of 6 is next.</p><div style="font-size:46px;font-weight:700" id="bt">${t}</div><p>Rescue Points <b>${S.pts}</b> · Level ${Math.floor(S.pts / 60) + 1} · Streak ${S.streak}</p><div class="fb g">💡 ${tip}</div><button id="rd" class="big">I’m ready</button><br><small>Rest as long as you like. The next dispatch call comes when you press ready.</small></div>`;
    clearInterval(brk); brk = setInterval(() => { t = Math.max(0, t - 1); const e = $("bt"); if (e) e.textContent = t || "Rest complete" }, 1000);
    $("rd").onclick = () => { beep(880, .1); clearInterval(brk); go(n); }; $("rd").focus()
}
function go(i) { $("ov").classList.add("hide"); if (amb) { scene.remove(amb); amb = null } state = "play"; paused = false; S.cur = i; save(); if (i >= MS.length) ending(); else { setMission(i); resetVehicle() } }
function ending() {
    state = "end"; mark.visible = false; const t = Object.values(S.cats).reduce((a, c) => [a[0] + c[0], a[1] + c[1]], [0, 0]), acc = t[1] ? t[0] / t[1] : 0, half = a => a.reduce((s, v) => s + v, 0) / (a.length || 1), imp = half(S.last.slice(3)) - half(S.last.slice(0, 3));
    let e = ["THE LEARNING HERO", "You made mistakes, studied the feedback, and improved. That is how real skills grow."];
    if (acc < .5) e = ["THE UNSAFE RESPONSE", "Several choices would have put people at risk. Review the feedback below and try again."];
    else if (acc >= .85) e = ["THE LIFE-SAVER", "Consistently safe, well-prioritised decisions. Strong emergency awareness."];
    else if (imp > 10) e = ["THE LEARNING HERO", "Your later missions were clearly stronger than your first ones."];
    else if (acc >= .6) e = ["THE QUICK RESPONDER", "You act quickly but missed some important safety steps. Slow down and check the scene."];
    const weak = Object.entries(S.cats).sort((a, b) => a[1][0] / (a[1][1] || 1) - b[1][0] / (b[1][1] || 1))[0];
    addLB("Responder", S.pts, Math.round(acc * 100), e[0]);
    $("ov").className = ""; $("ov").classList.remove("hide"); $("ov").innerHTML = `<div class="card"><h1 style="font-size:34px">${e[0]}</h1><p>${e[1]}</p>
<h3>Educational impact (SDG 3)</h3>
${Object.entries(S.cats).map(([k, v]) => `<div class="row"><span>${CATS[k]}</span><span>${v[0]}/${v[1]} correct</span></div><div class="bar"><i style="width:${v[1] ? v[0] / v[1] * 100 : 0}%"></i></div>`).join("")}
<p>Safe actions chosen: <b>${t[0]}</b> of ${t[1]}. Misconceptions corrected: <b>${t[1] - t[0]}</b>.<br>First attempt average: <b>${Math.round(half(S.first.filter(x => x != null)))}%</b> → latest: <b>${Math.round(half(S.last.filter(x => x != null)))}%</b><br>Revise next: <b>${CATS[weak[0]]}</b></p>
<h3>Learning sources</h3><div class="src">${SRC.map(x => "• " + x).join("<br>")}</div>
<p><b>In a real emergency in India, call 112.</b> This game is educational and does not replace certified first-aid training or professional care.</p>
<h3>Leaderboard</h3><small>Your best campaign score is saved automatically on this device.</small><div id="lbl"></div><p><button id="again" class="big">Play again</button></p></div>`; $("again").onclick = () => { beep(880, .1); reset(); location.reload() }; $("lbl").innerHTML = lbHtml()
}
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function getLB() {
    try {
        return JSON.parse(localStorage.getItem("pulsepoint_lb") || "[]");
    } catch (e) {
        return [];
    }
}
function addLB(n, p, a, e) {
    try {
        const l = getLB(), name = n.slice(0, 14), old = l.find(r => r.n === name);
        if (old) {
            if (p > old.p || p === old.p && a > old.a) Object.assign(old, { p, a, e });
        } else {
            l.push({ n: name, p, a, e });
        }
        l.sort((x, y) => y.p - x.p || y.a - x.a);
        localStorage.setItem("pulsepoint_lb", JSON.stringify(l.slice(0, 10)));
    } catch (x) {
        console.warn("Leaderboard storage unavailable");
    }
}
function lbHtml() { const l = getLB(); return l.length ? `<table style="width:100%;border-collapse:collapse">${l.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r.n)}</td><td>${r.p} pts</td><td>${r.a}% safe</td><td><small>${esc(r.e)}</small></td></tr>`).join("")}</table>` : "<p>No scores yet. Finish the campaign to set the first one.</p>" }
function lbScreen(back) { $("ov").className = ""; $("ov").innerHTML = `<div class="card"><h2>Leaderboard</h2><small>Top scores on this device, updated automatically after every completed campaign.</small>${lbHtml()}<p><button id="bk" class="big">Back</button></p></div>`; $("bk").onclick = () => { beep(880, .1); back(); }; $("bk").focus() }
function reset() { try { localStorage.removeItem("pulsepoint") } catch (e) { } }
/* Google Identity Services. Set your Client ID in config.js before publishing. */
function updateGoogleProfile(profile) {
    const status = $("signInStatus"), button = $("googleSignIn"), signOut = $("signOut");
    if (!status || !button || !signOut) return;
    if (profile) { status.textContent = "Signed in as " + profile.name + " (stored only in this browser)."; button.classList.add("hide"); signOut.classList.remove("hide"); }
    else { status.textContent = "Sign in to use your Google profile on this device."; button.classList.remove("hide"); signOut.classList.add("hide"); }
}
function onGoogleCredential(response) {
    try {
        const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        const profile = { name: payload.name || payload.email || "Responder", email: payload.email || "" };
        localStorage.setItem("pulsepoint_google_profile", JSON.stringify(profile));
        updateGoogleProfile(profile); toast("Welcome, " + profile.name + "!");
    } catch (e) { toast("Google sign-in could not be read. Please try again."); }
}
function setupGoogleSignIn() {
    const stored = (() => { try { return JSON.parse(localStorage.getItem("pulsepoint_google_profile") || "null") } catch (e) { return null } })();
    updateGoogleProfile(stored);
    const signOut = $("signOut"); if (signOut) signOut.onclick = () => { beep(600, .1); localStorage.removeItem("pulsepoint_google_profile"); if (window.google?.accounts?.id) google.accounts.id.disableAutoSelect(); updateGoogleProfile(null); };
    const clientId = window.PULSEPOINT_GOOGLE_CLIENT_ID;
    const target = $("googleSignIn");
    if (!clientId || clientId.includes("PASTE_")) { if (target) target.innerHTML = '<small>Add your Google Client ID in config.js to enable sign-in.</small>'; return; }
    if (!window.google?.accounts?.id) { setTimeout(setupGoogleSignIn, 200); return; }
    google.accounts.id.initialize({ client_id: clientId, callback: onGoogleCredential, auto_select: false });
    google.accounts.id.renderButton(target, { theme: "outline", size: "large", text: "continue_with", shape: "rect", width: 330 });
}
function menu() {
    const ov = $("ov"); ov.className = "menu"; ov.innerHTML = `<div style="text-align:center;max-width:680px"><h1>PULSEPOINT</h1><p style="font-size:20px;letter-spacing:3px;margin:6px 0">THE 60-SECOND EMERGENCY</p><canvas id="ecg2" width="420" height="70"></canvas>
<p>Drive a rapid-response ambulance, park safely, assess six emergencies, and practise the safest next decision.</p><div class="home-grid"><div class="home-card">🚑 <b>Response drive</b><br>Spawn in your ambulance and follow the beacon.</div><div class="home-card">🧠 <b>Learn by doing</b><br>Your responder visibly acts on each safe decision.</div><div class="home-card">🏅 <b>Earn mastery</b><br>Score safety, streaks, tips, and mission debriefs.</div></div><p><small><b>Drive:</b> WASD or arrow keys · Shift: boost · E: park / interact · Drag or Z/C: look</small></p>
<button id="st" class="big">Begin</button> <button id="lb">Leaderboard</button> ${S.done.length ? `<button id="rs">Reset progress</button><br><small>Saved progress: ${S.done.length} of 6 missions complete</small>` : ""}
<div class="signin" id="signInPanel"><b>Responder profile</b><br><small id="signInStatus">Sign in to use your Google profile on this device.</small><div id="googleSignIn" class="google-signin"></div><button id="signOut" class="hide" type="button">Sign out</button></div><p><span class="tag">6 scenarios</span><span class="tag">Safety-first scoring</span><span class="tag">Keyboard + touch</span></p><p><small>Educational only. If someone may be in immediate danger, call your local emergency number (112 in India) and follow the dispatcher. Guidance is general and not a substitute for certified first-aid training.</small></p></div>`;
    $("st").onclick = () => { beep(880, .1); S.cur = Math.min(S.cur, 5); try { AC = AC || new (window.AudioContext || window.webkitAudioContext)() } catch (e) { } startGame() };
    $("st").focus();
    setupGoogleSignIn();
    $("lb").onclick = () => { beep(880, .1); lbScreen(menu); };
    if ($("rs")) $("rs").onclick = () => { beep(180, .1); reset(); location.reload(); }
}
/* ---------- input ---------- */
addEventListener("keydown", e => {
    if (e.key.startsWith("Arrow") || e.key === " ") e.preventDefault(); keys[e.key.toLowerCase()] = true;
    if (e.key === "Escape" && lbOpen) { lbPop(false); return } if (lbOpen) return;
    if (state === "scn" && M && !M.fb && /^[1-4]$/.test(e.key) && M.opts[+e.key - 1]) pick(+e.key - 1);
    if (state === "scn" && M && M.fb && (e.key === "Enter" || e.key === " ")) next();
    if (state === "play" && e.key.toLowerCase() === "e") interact()
});
addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);
function interact() { if (driving) { driving = false; player.visible = true; player.position.copy(vehicle.position); player.position.x += 2.4; hud(); toast("Ambulance parked. Approach safely on foot."); return } const vd = Math.hypot(player.position.x - vehicle.position.x, player.position.z - vehicle.position.z); if (vd < 4) { driving = true; player.visible = false; hud(); toast("Driving mode. WASD or arrow keys steer the ambulance."); return } const s = sites[S.cur]; if (!s) return; const d = Math.hypot(player.position.x - s.x, player.position.z - s.z); if (d < 6) openScn(S.cur); else toast("Move closer to the red beacon before assessing the scene.") }
let drag = false; addEventListener("mousedown", e => { if (e.target.id === "gl") drag = true }); addEventListener("mouseup", () => drag = false);
addEventListener("mousemove", e => { if (drag) { yaw -= e.movementX * .005; pitch = Math.max(.15, Math.min(1.1, pitch + e.movementY * .004)) } });
$("bm").onclick = () => { mute = !mute; $("bm").textContent = mute ? "🔇" : "🔊" }; $("ba").onclick = () => document.body.classList.toggle("big");
let lbOpen = false;
function lbPop(open) { let d = $("lbp"); if (!open) { lbOpen = false; if (d) d.remove(); return } if (lbOpen || state === "menu" || state === "end") return; lbOpen = true; d = document.createElement("div"); d.id = "lbp"; d.style.cssText = "position:fixed;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;background:rgba(3,8,16,.7);padding:12px"; d.innerHTML = `<div class="card"><h2>Leaderboard</h2><small>Top 10 on this device. The game is paused while this is open.</small>${lbHtml()}<p><button id="lbx" class="big">Back to mission</button></p></div>`; document.body.appendChild(d); $("lbx").onclick = () => { beep(880, .1); lbPop(false); }; $("lbx").focus() }
$("bl").onclick = () => { beep(880, .1); lbPop(true); };
document.querySelectorAll("#touch [data-m]").forEach(b => { const k = b.dataset.m, down = e => { e.preventDefault(); if (k === "interact") interact(); else keys[k === "sprint" ? "shift" : "arrow" + k] = true }, up = e => { e.preventDefault(); if (k !== "interact") keys[k === "sprint" ? "shift" : "arrow" + k] = false }; b.addEventListener("pointerdown", down);["pointerup", "pointercancel", "pointerleave"].forEach(x => b.addEventListener(x, up)) });
/* ---------- loop ---------- */
const blocked = (x, z) => Math.abs(x) > 120 || Math.abs(z) > 120 || solids.some(s => Math.abs(x - s[0]) < s[2] && Math.abs(z - s[1]) < s[2]);
let last = performance.now(), dispT = 0;
function loop(now) {
    requestAnimationFrame(loop); const dt = Math.min(.05, (now - last) / 1000); last = now; clock += dt;
    const f = Math.min(1, clock / 240); scene.background.setHex(0x7fb4e6).lerp(new THREE.Color(0x1a1030), f); scene.fog.color.copy(scene.background); sun.color.setHex(0xfff2d0).lerp(new THREE.Color(0xff7a3d), f); sun.intensity = 1 - .5 * f; hemi.intensity = .8 - .45 * f; sun.position.set(80 - f * 60, 120 - f * 70, 40);
    bills.forEach((b, i) => b.color.setHSL((clock * .1 + i * .2) % 1, 1, .55));
    for (const c of cars) { c.p += c.d * c.v * dt; if (Math.abs(c.p) > 135) c.p = -c.d * 135; const o = c.d > 0 ? -4 : 4; if (c.ax) { c.m.position.set(c.ln + o, 0, c.p); c.m.rotation.y = c.d > 0 ? 0 : PI } else { c.m.position.set(c.p, 0, c.ln + o); c.m.rotation.y = c.d > 0 ? PI / 2 : -PI / 2 } }
    for (const p of peds) { p.p += p.d * p.v * dt; if (Math.abs(p.p) > 130) p.d *= -1; if (p.ax) { p.m.position.set(p.ln + p.off, .3, p.p); p.m.rotation.y = p.d > 0 ? 0 : PI } else { p.m.position.set(p.p, .3, p.ln + p.off); p.m.rotation.y = p.d > 0 ? PI / 2 : -PI / 2 } walk(p.m, clock + p.v * 5, 1) }
    tipOrbs.forEach(t => { t.o.position.y = 1.8 + Math.sin(clock * 2 + t.i) * .3; t.o.visible = !S.tips[t.i] });
    sites.forEach(s => { s.g.visible = true; s.pts.forEach(p => { if (!MS[s.i].lying) p.rotation.z = .1 + Math.sin(clock * 1.5) * .05 }) });
    if (mark.visible) { mark.material.opacity = .25 + .15 * Math.sin(clock * 4) }
    if (amb) { ambT += dt; const s = sites[M.i], k = Math.min(1, ambT / 2.5); amb.position.z = s.z - 30 + k * 24; amb.l1.visible = Math.sin(ambT * 14) > 0; amb.l2.visible = !amb.l1.visible; if (ambT < 2.5 && Math.floor(ambT * 4) !== Math.floor((ambT - dt) * 4)) beep(Math.floor(ambT * 4) % 2 ? 960 : 720, .2, "triangle", .06); cam.position.lerp(new THREE.Vector3(s.x - 8, 5, s.z + 10), .04); cam.lookAt(s.x, 1.5, s.z) }
    if (state === "menu") { const a = clock * .08; cam.position.set(Math.sin(a) * 110, 55, Math.cos(a) * 110); cam.lookAt(0, 5, 0); const c = $("ecg2"); if (c) ecg(c, .3, "#ff3b5c") }
    else if (state === "play" || state === "scn") {
        if (state === "play" && !lbOpen) {
            tmr += dt; let mx = ((keys.arrowright || keys.d) ? 1 : 0) - ((keys.arrowleft || keys.a) ? 1 : 0), mz = ((keys.arrowup || keys.w) ? 1 : 0) - ((keys.arrowdown || keys.s) ? 1 : 0); if (keys.z) yaw += dt * 1.8; if (keys.c) yaw -= dt * 1.8;
            const actor = driving ? vehicle : player, sp = (driving ? (keys.shift ? 18 : 13) : (keys.shift ? 9 : 5)) * dt; if (mx || mz) { const l = Math.hypot(mx, mz); mx /= l; mz /= l; const dx = (-Math.sin(yaw) * mz + Math.cos(yaw) * mx), dz = (-Math.cos(yaw) * mz - Math.sin(yaw) * mx), p = actor.position; if (!blocked(p.x + dx * sp, p.z)) p.x += dx * sp; if (!blocked(p.x, p.z + dz * sp)) p.z += dz * sp; let tr = Math.atan2(dx, dz), d = tr - actor.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); actor.rotation.y += d * Math.min(1, dt * 12); const follow = Math.atan2(Math.sin((actor.rotation.y - PI) - yaw), Math.cos((actor.rotation.y - PI) - yaw)); yaw += follow * Math.min(1, dt * 5); if (!driving) walk(player, clock * (keys.shift ? 1.5 : 1), 1) } else if (!driving) walk(player, 0, 0);
            if (driving) { player.position.copy(vehicle.position); vehicle.beacon.material.color.setHex(Math.sin(clock * 8) > 0 ? 0x19e6c1 : 0xff3b5c) }
            const s = sites[S.cur]; if (s) {
                const focus = driving ? vehicle.position : player.position; const d = Math.hypot(focus.x - s.x, focus.z - s.z); const pr = $("prompt"); pr.classList.toggle("hide", driving ? false : d > 6); pr.textContent = driving ? "Press E: park & approach safely" : "Press E: assess patient";
                if (d < 30 && !s.warned) { s.warned = 1; say("You: Emergency scene ahead. Check for danger.") }
            }
            tipOrbs.forEach(t => { if (!S.tips[t.i] && Math.hypot(player.position.x - t.x, player.position.z - t.z) < 2.5) { S.tips[t.i] = 1; S.pts += 5; toast("💡 Safety tip (+5): " + TIPS[t.i]); beep(1200, .2); save(); hud(); if (Object.keys(S.tips).length >= 3) ach("Curious Citizen") } });
            $("tm") && ($("tm").textContent = "Time " + Math.floor(tmr / 60) + ":" + String(Math.floor(tmr % 60)).padStart(2, "0"))
        }
        else { $("prompt").classList.add("hide"); if (M && M.eta !== null && M.eta > 0) M.eta = Math.max(0, M.eta - dt) }
        const t = driving ? vehicle.position : player.position, camDist = driving ? 12 : 9, cx = t.x + Math.sin(yaw) * Math.cos(pitch) * camDist, cy = (driving ? 3 : 1.8) + Math.sin(pitch) * camDist, cz = t.z + Math.cos(yaw) * Math.cos(pitch) * camDist; cam.position.lerp(new THREE.Vector3(cx, cy, cz), .15); cam.lookAt(t.x, driving ? 1.2 : 1.8, t.z);
        ecg($("ecg"), state === "scn" ? ecgSpeed : .4, state === "scn" && M && M.stab < 30 ? "#ff3b5c" : "#19e6c1"); minimap()
    }
    else if (state === "cine" || state === "deb") { $("prompt").classList.add("hide") }
    ren.render(scene, cam)
}
function minimap() {
    const c = $("mm"), g = c.getContext("2d"), k = 140 / 260, X = x => (x + 130) * k, Z = z => (z + 130) * k; g.fillStyle = "#0b1420"; g.fillRect(0, 0, 140, 140); g.fillStyle = "#2d6a3e"; for (const [i, j] of [[1, 1], [-1, -1], [-1, 1], [0, 0]]) g.fillRect(X(i * 50 - 15), Z(j * 50 - 15), 30 * k, 30 * k);
    g.fillStyle = "#3a4150"; solids.forEach(s => { if (s[2] > 7) g.fillRect(X(s[0] - s[2]), Z(s[1] - s[2]), s[2] * 2 * k, s[2] * 2 * k) }); g.fillStyle = "#ff2040"; g.fillRect(X(100) - 3, Z(-100) - 3, 6, 6);
    const m = sites[S.cur]; if (m && mark.visible) { g.fillStyle = "#ff3b5c"; g.beginPath(); g.arc(X(m.x), Z(m.z), 4 + Math.sin(clock * 5) * 1.5, 0, 7); g.fill() }
    const unit = driving ? vehicle : player; g.save(); g.translate(X(unit.position.x), Z(unit.position.z)); g.rotate(-unit.rotation.y + PI); g.fillStyle = driving ? "#ffffff" : "#19e6c1"; g.beginPath(); g.moveTo(0, -6); g.lineTo(4, 5); g.lineTo(-4, 5); g.fill(); g.restore()
}
/* ---------- boot ---------- */
try { if (!window.THREE) throw new Error("Three.js failed to load. Check your internet connection and reload."); build(); menu(); $("ld").classList.add("hide"); requestAnimationFrame(loop) } catch (e) { $("ld").innerHTML = "⚠️ " + e.message }