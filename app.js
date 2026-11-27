/* Repwerk – Training, Ernährung, Fortschritt. Alle Daten bleiben lokal auf dem Gerät (localStorage). */
"use strict";

/* ---------- Icons (einheitlich: Kontur, 2px, 24er Raster) ---------- */
const IC={
  heute:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  training:'<path d="M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11"/>',
  plan:'<rect x="4" y="4.5" width="16" height="16" rx="2"/><path d="M8 2.5v4M16 2.5v4M4 10h16M8 14h3M8 17h6"/>',
  ernaehrung:'<path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8a2 2 0 0 1-2 2M17 21V3c-2 1-3.5 3.5-3.5 7s1.5 4 3.5 4"/>',
  fortschritt:'<path d="M3 20h18"/><path d="m4 15 5-5 4 4 7-8"/><path d="M15 6h5v5"/>',
  koerper:'<path d="M5 7h14l-1.5 13h-11z"/><path d="M9.5 11.5a2.5 2.5 0 0 1 5 0"/><path d="m12 11.5 1-1.5"/>',
  tools:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  profil:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.5 1 2.5 2 3 0-3 .5-6 1-8.5Z"/>',
  trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M9.5 17h5"/>',
  droplet:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".5"/>',
  timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',
  sunrise:'<path d="M4 18h16M7 14a5 5 0 0 1 10 0M12 4v3M5 8l1.5 1.5M19 8l-1.5 1.5M2 14h2M20 14h2"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
  moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
  apple:'<path d="M12 7c-1.5-1-4-1.2-5.5.5S5 13 7 17c1.2 2.4 3 4 5 3 2 1 3.8-.6 5-3 2-4 1.5-7.8 0-9.5S13.5 6 12 7Z"/><path d="M12 7c0-2 1-3.5 3-4"/>',
  zap:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  download:'<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  upload:'<path d="M12 15V3M7 8l5-5 5 5M4 20h16"/>',
  play:'<path d="M7 4v16l13-8z"/>',
  calendar:'<rect x="4" y="4.5" width="16" height="16" rx="2"/><path d="M8 2.5v4M16 2.5v4M4 10h16"/>',
  scale:'<path d="M5 7h14l-1.5 13h-11z"/><path d="M9.5 11.5a2.5 2.5 0 0 1 5 0"/>'
};
const icon=(n,cls="")=>`<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||""}</svg>`;

/* ---------- Konstanten ---------- */
const ROUTES=[["heute","Heute"],["training","Training"],["plan","Plan"],["ernaehrung","Ernährung"],["fortschritt","Fortschritt"],["koerper","Körper"],["tools","Tools"],["profil","Profil"]];
const ALIAS={essen:"ernaehrung",mehr:"heute"};
const WD=["So","Mo","Di","Mi","Do","Fr","Sa"];
const WD_LONG=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
const MEALS=["Frühstück","Mittagessen","Abendessen","Snacks"];
const MEAL_IC={"Frühstück":"sunrise","Mittagessen":"sun","Abendessen":"moon","Snacks":"apple"};
/* Übungsarten: w = Gewicht × Wdh., bw = Körpergewicht (+Zusatzgewicht) × Wdh.,
   hold = Halten (+Zusatzgewicht) × Sekunden, wt = Last × Sekunden (Tragen),
   time = Ausdauer (km optional) × Minuten, reps = nur Anzahl (z. B. Landungen, Treffer)
   a/b = Spaltenköpfe (a leer = keine Gewichtsspalte), u = Einheit hinter dem Wert, vol = zählt zum Trainingsvolumen */
const TYPES={
  w:{label:"Gewicht",a:"kg",b:"Wdh.",plus:false,u:"",vol:true},
  bw:{label:"Körpergewicht",a:"+kg",b:"Wdh.",plus:true,u:"",vol:true},
  hold:{label:"Halten",a:"+kg",b:"Sek.",plus:true,u:" s",vol:false},
  wt:{label:"Last & Zeit",a:"kg",b:"Sek.",plus:false,u:" s",vol:false},
  time:{label:"Ausdauer",a:"km",b:"Min.",plus:false,u:" Min.",vol:false},
  reps:{label:"Nur Wiederholungen",a:"",b:"Anzahl",plus:false,u:"",vol:false}
};
const EQUIP=["Calisthenics","Kettlebell","Langhantel","Kurzhantel","Maschine & Kabel"];
// Name, Art, Ausrüstung, Muskelgruppe
const LIB=[
  ["Klimmzüge","bw","Calisthenics","Rücken"],["Chin-ups","bw","Calisthenics","Rücken"],["Australian Pull-ups","bw","Calisthenics","Rücken"],["Muscle-ups","bw","Calisthenics","Ganzkörper"],
  ["Liegestütze","bw","Calisthenics","Brust"],["Diamond-Liegestütze","bw","Calisthenics","Arme"],["Archer-Liegestütze","bw","Calisthenics","Brust"],["Pike Push-ups","bw","Calisthenics","Schultern"],
  ["Handstand-Liegestütze","bw","Calisthenics","Schultern"],["Dips","bw","Calisthenics","Brust"],["Bank-Dips","bw","Calisthenics","Arme"],["Air Squats","bw","Calisthenics","Beine"],
  ["Pistol Squats","bw","Calisthenics","Beine"],["Bulgarian Split Squats","bw","Calisthenics","Beine"],["Jump Squats","bw","Calisthenics","Beine"],["Nordic Curls","bw","Calisthenics","Beine"],
  ["Hanging Leg Raises","bw","Calisthenics","Core"],["Toes to Bar","bw","Calisthenics","Core"],["Dragon Flag","bw","Calisthenics","Core"],["Burpees","bw","Calisthenics","Ganzkörper"],
  ["Plank","hold","Calisthenics","Core"],["Seitstütz","hold","Calisthenics","Core"],["Hollow Body Hold","hold","Calisthenics","Core"],["L-Sit","hold","Calisthenics","Core"],
  ["Handstand","hold","Calisthenics","Schultern"],["Dead Hang","hold","Calisthenics","Rücken"],["Wall Sit","hold","Calisthenics","Beine"],["Front Lever (Tuck)","hold","Calisthenics","Rücken"],["Planche Lean","hold","Calisthenics","Schultern"],
  ["Kettlebell Swing","w","Kettlebell","Ganzkörper"],["Goblet Squat","w","Kettlebell","Beine"],["Turkish Get-up","w","Kettlebell","Ganzkörper"],["Kettlebell Clean & Press","w","Kettlebell","Schultern"],
  ["Kettlebell Snatch","w","Kettlebell","Ganzkörper"],["Kettlebell Rudern","w","Kettlebell","Rücken"],["Kettlebell Front Squat","w","Kettlebell","Beine"],["Kettlebell Thruster","w","Kettlebell","Ganzkörper"],
  ["Kettlebell Deadlift","w","Kettlebell","Beine"],["Kettlebell Windmill","w","Kettlebell","Core"],["Kettlebell Halo","w","Kettlebell","Schultern"],["Farmer's Walk","wt","Kettlebell","Ganzkörper"],
  ["Bankdrücken","w","Langhantel","Brust"],["Schrägbankdrücken","w","Langhantel","Brust"],["Kniebeuge","w","Langhantel","Beine"],["Frontkniebeuge","w","Langhantel","Beine"],
  ["Kreuzheben","w","Langhantel","Rücken"],["Rumänisches Kreuzheben","w","Langhantel","Beine"],["Schulterdrücken","w","Langhantel","Schultern"],["Langhantelrudern","w","Langhantel","Rücken"],
  ["Hip Thrust","w","Langhantel","Beine"],["Langhantelcurls","w","Langhantel","Arme"],
  ["Kurzhantel-Bankdrücken","w","Kurzhantel","Brust"],["Kurzhantel-Schulterdrücken","w","Kurzhantel","Schultern"],["Kurzhantelrudern","w","Kurzhantel","Rücken"],["Bizepscurls","w","Kurzhantel","Arme"],
  ["Hammercurls","w","Kurzhantel","Arme"],["Seitheben","w","Kurzhantel","Schultern"],["Ausfallschritte","w","Kurzhantel","Beine"],["Trizeps über Kopf","w","Kurzhantel","Arme"],
  ["Latziehen","w","Maschine & Kabel","Rücken"],["Kabelrudern","w","Maschine & Kabel","Rücken"],["Beinpresse","w","Maschine & Kabel","Beine"],["Beinstrecker","w","Maschine & Kabel","Beine"],
  ["Beinbeuger","w","Maschine & Kabel","Beine"],["Butterfly","w","Maschine & Kabel","Brust"],["Trizepsdrücken","w","Maschine & Kabel","Arme"],["Face Pulls","w","Maschine & Kabel","Schultern"],["Wadenheben","w","Maschine & Kabel","Beine"]
];
const EXERCISES=LIB.map(x=>x[0]);
function libOf(n){if(!libOf.m)libOf.m=new Map(LIB.map(x=>[norm(x[0]),x]));return libOf.m.get(norm(n))}
function typeOf(name,given){if(given&&TYPES[given])return given;const l=libOf(name);return l?l[1]:"w"}
const MUSCLE=[[/bank|brust|butterfly|liegest|dips|fly/i,"Brust"],[/klimm|latz|rudern|face pull|rücken|pull/i,"Rücken"],[/kniebeuge|beinpresse|ausfall|beinstreck|beinbeug|wade|hip thrust|kreuzheben|squat|lunge/i,"Beine"],[/schulter|seitheb|military|ohp/i,"Schultern"],[/bizeps|trizeps|curl|hammer/i,"Arme"],[/plank|bauch|crunch|core/i,"Core"]];
const muscleOf=n=>{const l=libOf(n);if(l)return l[3];for(const [re,g] of MUSCLE)if(re.test(n))return g;return null};
// Progressionsstufen (leicht → schwer)
const PROGRESSIONS=[
  ["Liegestütz",["Wand-Liegestütze","Knie-Liegestütze","Liegestütze","Diamond-Liegestütze","Archer-Liegestütze","Einarmige Liegestütze"]],
  ["Klimmzug",["Dead Hang","Australian Pull-ups","Negative Klimmzüge","Klimmzüge","Klimmzüge +Zusatzgewicht","Muscle-ups"]],
  ["Dips",["Bank-Dips","Negative Dips","Dips","Dips +Zusatzgewicht","Ring-Dips"]],
  ["Beine",["Air Squats","Bulgarian Split Squats","Assisted Pistols","Pistol Squats","Pistols +Zusatzgewicht"]],
  ["Core",["Plank","Hollow Body Hold","Hanging Leg Raises","L-Sit","Dragon Flag"]],
  ["Handstand",["Pike Push-ups","Handstand an der Wand","Freier Handstand","Handstand-Liegestütze"]]
];
// Name, kcal, Eiweiß, Kohlenhydrate, Fett je 100 g, übliche Portion in g
const FOODS=[
["Haferflocken",372,13.5,58.7,7,60],["Banane",89,1.1,22.8,0.3,120],["Apfel",52,0.3,14,0.2,150],["Hähnchenbrust (roh)",110,23,0,1.5,150],
["Reis (gekocht)",130,2.7,28,0.3,200],["Reis (roh)",350,7,77,0.6,80],["Nudeln (roh)",360,12.5,72,1.5,100],["Nudeln (gekocht)",150,5.5,30,0.8,250],
["Ei",143,12.6,0.7,9.5,60],["Magerquark",67,12,4,0.2,250],["Skyr",63,11,4,0.2,150],["Naturjoghurt 1,5 %",47,3.5,5,1.5,150],
["Milch 1,5 %",47,3.4,4.9,1.5,250],["Milch 3,5 %",64,3.3,4.8,3.5,250],["Whey Protein",380,78,6,5,30],["Lachs",208,20,0,13,125],
["Thunfisch (Wasser)",116,26,0,1,130],["Rinderhack",250,17,0,20,125],["Kartoffeln",77,2,17,0.1,250],["Süßkartoffel",86,1.6,20,0.1,250],
["Vollkornbrot",220,8,41,1.5,50],["Toastbrot",265,8,49,3.5,25],["Gouda",356,25,2,27,30],["Erdnussbutter",588,25,20,50,20],
["Olivenöl",884,0,0,100,10],["Mandeln",579,21,22,50,30],["Brokkoli",34,2.8,7,0.4,200],["Avocado",160,2,9,15,80],
["Tofu",120,13,2,7,150],["Linsen (gekocht)",116,9,20,0.4,200],["Kidneybohnen (Dose)",90,6,13,0.5,125],["Hüttenkäse",98,12,3,4.3,200],
["Putenbrust",105,24,0,1,150],["Beeren (gemischt)",45,0.8,9,0.4,125],["Orangensaft",45,0.7,10,0.2,250],["Dunkle Schokolade 70 %",580,8,36,42,20],
["Proteinriegel",360,33,35,11,60],["Wraps (Weizen)",300,8,50,7,60],["Mozzarella light",160,19,1,9,125],["Erdbeeren",32,0.7,7.7,0.3,150]];
const TEMPLATES={
  ganz:{label:"Ganzkörper",sub:"3× pro Woche · ideal für den Einstieg",days:[["Ganzkörper A",1,[["Kniebeuge",3,"5",60],["Bankdrücken",3,"5",50],["Langhantelrudern",3,"8",45],["Plank",3,"45",0]]],["Ganzkörper B",3,[["Kreuzheben",3,"5",80],["Schulterdrücken",3,"6",30],["Latziehen",3,"10",45],["Ausfallschritte",3,"10",20]]],["Ganzkörper C",5,[["Kniebeuge",3,"8",55],["Schrägbankdrücken",3,"8",40],["Kabelrudern",3,"10",45],["Bizepscurls",2,"12",12]]]]},
  ppl:{label:"Push / Pull / Beine",sub:"3× pro Woche · Muskelaufbau",days:[["Push",1,[["Bankdrücken",4,"6-8",60],["Schulterdrücken",3,"8-10",35],["Dips",3,"10",0],["Seitheben",3,"15",8],["Trizepsdrücken",3,"12",20]]],["Pull",3,[["Klimmzüge",4,"6-8",0],["Langhantelrudern",3,"8-10",50],["Face Pulls",3,"15",15],["Bizepscurls",3,"10-12",12]]],["Beine",5,[["Kniebeuge",4,"6-8",70],["Rumänisches Kreuzheben",3,"8-10",60],["Beinpresse",3,"12",100],["Wadenheben",4,"15",40]]]]},
  okuk:{label:"Oberkörper / Unterkörper",sub:"4× pro Woche · Kraft & Masse",days:[["Oberkörper 1",1,[["Bankdrücken",4,"6",60],["Langhantelrudern",4,"8",50],["Schulterdrücken",3,"10",30],["Latziehen",3,"10",45]]],["Unterkörper 1",2,[["Kniebeuge",4,"6",70],["Rumänisches Kreuzheben",3,"10",60],["Beinbeuger",3,"12",30],["Wadenheben",3,"15",40]]],["Oberkörper 2",4,[["Schrägbankdrücken",4,"8",45],["Klimmzüge",4,"8",0],["Dips",3,"10",0],["Bizepscurls",3,"12",12]]],["Unterkörper 2",5,[["Kreuzheben",3,"5",90],["Beinpresse",3,"12",100],["Ausfallschritte",3,"10",20],["Hip Thrust",3,"10",60]]]]},
  cali:{label:"Calisthenics Grundlagen",sub:"3× pro Woche · nur Körpergewicht",days:[["Cali Push",1,[["Liegestütze",4,"10-15",0],["Dips",3,"8-12",0],["Pike Push-ups",3,"8-10",0],["Plank",3,"45",0]]],["Cali Pull",3,[["Klimmzüge",4,"5-8",0],["Australian Pull-ups",3,"10-12",0],["Chin-ups",3,"6-8",0],["Hanging Leg Raises",3,"10",0]]],["Cali Beine & Core",5,[["Air Squats",4,"20",0],["Bulgarian Split Squats",3,"10",0],["Nordic Curls",3,"5",0],["Hollow Body Hold",3,"30",0],["L-Sit",3,"15",0]]]]},
  wcali:{label:"Weighted Calisthenics",sub:"3× pro Woche · mit Zusatzgewicht (Gürtel/Weste)",days:[["Weighted Pull",1,[["Klimmzüge",5,"5",10],["Chin-ups",3,"6",5],["Dead Hang",2,"30",10],["Hanging Leg Raises",3,"10",0]]],["Weighted Push",3,[["Dips",5,"5",15],["Liegestütze",3,"12",10],["Handstand-Liegestütze",3,"5",0],["L-Sit",3,"15",0]]],["Weighted Beine",5,[["Pistol Squats",4,"5",0],["Bulgarian Split Squats",3,"8",10],["Nordic Curls",3,"5",0],["Plank",3,"60",10]]]]},
  kb:{label:"Kettlebell Ganzkörper",sub:"3× pro Woche · eine oder zwei Kugeln",days:[["Kettlebell A",1,[["Kettlebell Swing",5,"15",20],["Goblet Squat",4,"10",16],["Kettlebell Clean & Press",3,"6",12],["Kettlebell Rudern",3,"10",16],["Farmer's Walk",3,"40",24]]],["Kettlebell B",3,[["Turkish Get-up",3,"2",12],["Kettlebell Snatch",4,"8",12],["Kettlebell Front Squat",3,"8",16],["Kettlebell Windmill",3,"6",8],["Liegestütze",3,"15",0]]],["Kettlebell C",5,[["Kettlebell Swing",10,"10",24],["Kettlebell Thruster",4,"8",12],["Kettlebell Deadlift",3,"12",24],["Kettlebell Halo",3,"10",8],["Hollow Body Hold",3,"30",0]]]]}
};
const mkPlanDays=t=>t.days.map(([n,wd,exs])=>({id:uid(),name:n,weekday:wd,exercises:exs.map(([en,s,r,w,ty])=>({id:uid(),name:en,type:typeOf(en,ty),sets:s,reps:r,weight:w}))}));
/* Versteckte Vorlage: nur verschlüsselt im Code (AES-GCM, Schlüssel per PBKDF2 aus dem Passcode).
   Aufruf: 5× schnell aufs Logo tippen. */
const SECRET={it:250000,salt:"ucY3PimbU0ULVCu/Vc/hOw==",iv:"+4p/38eAji5qkqX1",ct:"kuE812R/j/cJnneu5/mG/Bav9pNPx+2qPRzhy6V2dsmD0Mq9SNee1AzLQ2juV8MtVtfnK/NkuYi87JCiakUKKKbFq4MfWn/Tg1y3P1F2gp5DXPZaxdXPSzAz0Mlnia2+fc0MjO9qSZHZUgXgB2YXooGHFdxZ6i1g6GNJX8AiSNcu9A/f1bK+agA35si40Qp1ILpdjFrp+FckqQPJT0k+XuEiiwc7170XZif6lhPdftffSPd0+ypmOIePcJaGdzZZ5bKgzmFf62NocBGA1yTyCIwr7P/F/Z76PM9zKLN8o27IxGJQA56xMgW3+RGX6CcgwDGLo6yQ1ITyYW8VKo6Akop5dQgy/MGrDKVAFzUZx5AVAVmDX4ylZTe2+gtpMDwQLZjiKW+DNvDsBDsU/2uQXZo1HWa3nQXEOpXVcaYN7JY5lz1AYcRJw4KmjOH6ncmHwPvR2F4qbjg28eWob6qYBHqaE/I4BNKmiGUFbikF2SVZngV3GBVyol2fz8aqS4E9GOf3d0jAIAy3GPqhZH5y9rPud1hcs4xKmKZacq9HxIVSHCKQEwmo5enDGyAVLhpzcLEaVQl/f9Ekcw0qqkbqRPqEWOuIjIebHCpJLl72y2WmxobElDnlZrtm2TlVv2H23WNi+fBquVGzxNe/vXbWXrqEwCDZ0xITXFtBZPhMU3rarK5guLX6uiLgwE8wM9hBNrTjFH15xpZxOeVoYQzEBv7Iqhg2MXkVJuhw5rSXZ7FOIUOYn6+vPXDTt3g9t/dxOeJtgY+33HWY9wwGY1VNR5JquuGwwK4rQkMV8Zb+2Zhkkv4PW1yG5rPDaaZkhyV+hU4s2mTDSIkdgOH78EYP8mrVV9Os/UIgKKrMXOY/MGlDrFNMgzMO9MR9Yh4eop6ySJKmmGN2r1M6YO0I4FyktUchCaiFkj0UyFfNpiAkWELn5wW76ZdDUtrKVDEa/A8G+9NzKyGGReR4/P9jVCdJmwZk1HmKFwO0Pz1Gh2LAZ2/8zd5jP1NpVxQxsE3V30XgGTJt7u1hSE3Ldr5dfLMJ0+bCvr57Yg3zg0lXOZHngFLDwA+pYSrC/LzMSwAiA+LTX/3GNkWcFm9TiFNVlfc8spz4mFffO1iF/wPeMGhKL/hGlgWW4w4bFKIzx3L94OcR/iOuA3gY9pOYyCb5wS7vLo2rM0I7bv6g6UlkfGtSLY6UfFM4CA84oktf80sQv2Vl6s+/AraZL8InehSo8obMvj0yJFsgVL0E6GXqtypXb8Z7xWaWBtdisg3GhZW6TGwyorBsIgdTvAU+23uW6Nz3cKyyF3KyWhNJBW2z0hOv/xyuEhfhTwq1Nnft+eyxU6V5LcZbhC5XcxSuCKHqlM+/BfnWzAWHXTqxab2lUHhxxCikaM769ClPU+IOHRcr2vzcf8q+EZiLDv8+AXvMygjqooP+Cn0WhKU/C2RnCv6nh7ttezdSA4rKho4VSchiX94akq4cVbwo5xnJ82fyQV67R1z704XjKGUfyVOycgSEsQVjrE+ZyYZ4wwIOYy3URlhGLvBWN+966MSEOE5VNjrXvG/HK4NFbpiZzaCCkimDo2q+jJN0XbQ2K2KIgDQCw4aWHbzvirukBpz2K4+YLaQ5+JW2zZ9khi6HFibw5gJ4Ij9aRq4q0VgOO5CJ1JeBWDjSKH39QQHxh7tqe6bTBP+bx8F3QNzNUUyZCTeX8FR+gA+LuU33JvhJmbNFetSv220V3nciXl4rplspVZZ1lEXyVNSM+sYvajftO99SzBLZZBmo055of0s+INTRgNt8k8zGrmkAF+hyWNPvWHqkrY0rKZMlR2OUVj48CFfwMtQoJqS+BdwTUdHGNbM+BaNGK37hJ5ZzXsYM5/OjpqG0114FpRcKMdSJ0bUVc+T9iFa8wh9G63H79JatsHoC4EdxYk+s/z6dZd1kKLxu3wPk8w11XXEU+kvTl6A8/z5Lfg9DkQpFvWsNlB3Cv06wUCymtnQtmQefycp2ozsEAihDHfJfpFEmkB6Hu1PfkjM4Bv68tUob4eZBsKY84hgVkOXKMBg6wVOLmOBhWFdB4rhxKp8bKo/f2uq5I3YTHV8quIe2eGS4jkQyOYW+KiYnSfxOXgp2DDT9CbcwcpHQBrnXUGWHStFcAzXJKourWn6vGF51XyV4LhWs6MfYYvB7uRRNF1hlVFtMyF0JihiWM1djTGH4bsQBnUSrRlUioitaNruzKr+rLeGh/yg0q3t9VyKee2mJknqmP7Asrq9ljAE2lER3aR4Q5+hdxZHeE6udYDY4R8dUAlq7kUfpm/X0iCoCj8xO9x+YB1is3McjFPc2wSMEGZu/nODmLDlm63PI7OnDQkR7BUkj2UY+AuE0HlHzNC3uRaA5+MaAZUKG5GZWQIYxSMUMq2WPKWIli0IhDeWGBohv7NALPumooeSR/BeRKBl/FMI4uBKBAeOZ0LPITtWss1Blzdq0eRWJxlZGmoeIhcr9tGgvnv7ef/1gjFLQ3r7+iYmPazgsa8tVWFmlcLmcYHwpuNTzm5MXWWeSh7a8YdN6fizogJIYut1Q1gT8/MqWck1vSkrdUGioA3s38vC2dosBPzJARv8xVxCy3VCyEi32LycS7065d1viyH/iiNHMts2ALAHv+Mezk0rvjbgGFQ9DZ17c/zFGK+VmgBTu8zC5dsJal9TlnMfjE+ODvHnVnLzH9HlLQxxGmABWY93kLqKzNMqxbRRu80rXEOIxRdXDwImGBgVcz+1Wug=="};
const b64d=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function unlockSecret(code){
  const enc=new TextEncoder();const base=await crypto.subtle.importKey("raw",enc.encode(code),"PBKDF2",false,["deriveKey"]);
  const key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:b64d(SECRET.salt),iterations:SECRET.it,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);
  return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:b64d(SECRET.iv)},key,b64d(SECRET.ct))));
}
let secretTpl=null;
const ACTIVITY=[[1.2,"Kaum Bewegung (Büro)"],[1.375,"Leicht aktiv (1–3× Sport)"],[1.55,"Aktiv (3–5× Sport)"],[1.725,"Sehr aktiv (6–7× Sport)"],[1.9,"Extrem aktiv (körperlicher Job + Sport)"]];

/* ---------- Hilfsfunktionen ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const pad=n=>String(n).padStart(2,"0");
const iso=(d=new Date())=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parseISO=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};
const addDays=(s,n)=>{const d=parseISO(s);d.setDate(d.getDate()+n);return iso(d)};
const weekStart=s=>{const d=parseISO(s);d.setDate(d.getDate()-((d.getDay()+6)%7));return iso(d)};
const fdate=(s,o={day:"2-digit",month:"2-digit"})=>parseISO(s).toLocaleDateString("de-DE",o);
const nf=(n,d=1)=>(n==null||isNaN(n))?"–":Number(n).toLocaleString("de-DE",{maximumFractionDigits:d});
const num=v=>{if(v===""||v==null)return null;const n=parseFloat(String(v).replace(",","."));return isNaN(n)?null:n};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const firstNum=s=>{const m=String(s??"").match(/\d+/);return m?+m[0]:null};
const norm=s=>String(s||"").trim().toLowerCase();
const e1rm=(w,r)=>r<=1?w:w*(1+r/30);
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}
function lsDel(k){try{localStorage.removeItem(k)}catch(e){}}

/* ---------- Speicher (lokal auf dem Gerät) ---------- */
const LS="repwerk:";
const docs={};
function loadAll(){
  try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith(LS+"d:")){try{docs[k.slice(LS.length+2)]=JSON.parse(localStorage.getItem(k))}catch(e){}}}}catch(e){}
}
function put(key,data){
  if(data==null){delete docs[key];lsDel(LS+"d:"+key);return}
  docs[key]=data;
  if(!lsSet(LS+"d:"+key,JSON.stringify(data)))toast("Speichern nicht möglich. Ist der Gerätespeicher voll?");
}
function defaults(key){
  if(key==="profile")return{sex:"m",age:30,height:178,weight:78,activity:1.55,goal:"cut",goalWeight:null,water:2500,rest:90,kcal:null};
  if(key==="plan")return{days:[],goals:{},weekly:3};
  if(key==="body")return{weights:[],measures:[]};
  if(key==="foods")return{custom:[]};
  if(key==="badges")return{seen:[]};
  if(key.startsWith("w-"))return{items:[]};
  if(key.startsWith("f-"))return{items:[],water:0};
  return{};
}
const get=key=>docs[key]?{...defaults(key),...docs[key]}:defaults(key);
function update(key,fn,rerender=true){const cur=structuredClone(get(key));fn(cur);put(key,cur);if(rerender)render()}
const settings=(()=>{try{return JSON.parse(lsGet(LS+"settings")||"{}")}catch(e){return{}}})();
const saveSettings=()=>lsSet(LS+"settings",JSON.stringify(settings));
function isDark(){const t=settings.theme||"system";return t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches)}
function applyTheme(){const t=settings.theme||"system";if(t==="system")document.documentElement.removeAttribute("data-theme");else document.documentElement.setAttribute("data-theme",t);
  document.querySelector('meta[name="theme-color"]').setAttribute("content",isDark()?"#2A3342":"#FFFFFF")}

/* ---------- Abgeleitete Daten ---------- */
const profile=()=>get("profile");
const plan=()=>get("plan");
const body=()=>get("body");
function workouts(){
  const out=[];for(const k in docs){if(k.startsWith("w-")&&docs[k])for(const w of (docs[k].items||[]))out.push({...w,_key:k})}
  return out.sort((a,b)=>a.date===b.date?(a.start||0)-(b.start||0):a.date<b.date?-1:1);
}
function currentWeight(){const w=body().weights;return w.length?w[w.length-1].kg:null}
function targets(){
  const p=profile();const w=currentWeight()??p.weight??75;const h=p.height||175,a=p.age||30;
  const bmr=10*w+6.25*h-5*a+(p.sex==="w"?-161:5);const tdee=bmr*(p.activity||1.55);
  const adj=p.goal==="cut"?-450:p.goal==="bulk"?300:0;
  const kcal=p.kcal||Math.round((tdee+adj)/10)*10;
  const protein=Math.round(w*(p.goal==="maintain"?1.8:2));const fat=Math.round(w*.8);
  const carbs=Math.max(0,Math.round((kcal-protein*4-fat*9)/4));
  return{bmr:Math.round(bmr),tdee:Math.round(tdee),kcal,protein,fat,carbs,water:p.water||2500,weight:w};
}
function foodDay(d){return get("f-"+d)}
function dayTotals(d){const t={kcal:0,p:0,c:0,f:0};for(const i of foodDay(d).items){t.kcal+=+i.kcal||0;t.p+=+i.p||0;t.c+=+i.c||0;t.f+=+i.f||0}return t}
function exHistory(name){
  const n=norm(name),out=[];
  for(const w of workouts()){const ex=(w.exercises||[]).find(e=>norm(e.name)===n);if(!ex||!ex.sets.length)continue;
    let maxW=0,maxR=0,best=0,vol=0;for(const s of ex.sets){maxW=Math.max(maxW,s.w||0);maxR=Math.max(maxR,s.r||0);best=Math.max(best,e1rm(s.w||0,s.r||0));vol+=(s.w||0)*(s.r||0)}
    out.push({date:w.date,maxW,maxR,e1rm:best,vol,sets:ex.sets})}
  return out;
}
// Welche Art hat eine Übung? Plan > letztes Training > Bibliothek
function exType(name){
  const n=norm(name);for(const d of plan().days)for(const e of d.exercises)if(norm(e.name)===n&&e.type)return e.type;
  const ws=workouts();for(let i=ws.length-1;i>=0;i--){const e=(ws[i].exercises||[]).find(x=>norm(x.name)===n);if(e&&e.type)return e.type}
  return typeOf(name);
}
// Messgröße für Fortschritt: kg (Gewicht/Zusatzgewicht), Wiederholungen oder Sekunden
function exMetric(h,type="w"){
  const anyW=h.some(x=>x.maxW>0);
  if(type==="bw"||type==="hold"){if(anyW)return{bw:true,kg:true,unit:"kg",label:"Zusatzgewicht",plus:true,val:x=>x.maxW};
    return type==="hold"?{bw:true,kg:false,unit:"s",label:"Haltezeit",val:x=>x.maxR}:{bw:true,kg:false,unit:"Wdh.",label:"Wiederholungen",val:x=>x.maxR}}
  if(type==="wt")return{bw:true,kg:true,unit:"kg",label:"Last",val:x=>x.maxW};
  if(type==="time")return anyW?{bw:true,kg:true,unit:"km",label:"Strecke",val:x=>x.maxW}:{bw:true,kg:false,unit:"Min.",label:"Dauer",val:x=>x.maxR};
  if(type==="reps")return{bw:true,kg:false,unit:"×",label:"Anzahl",val:x=>x.maxR};
  return anyW?{bw:false,kg:true,unit:"kg",label:"Gewicht",val:x=>x.maxW}:{bw:true,kg:false,unit:"Wdh.",label:"Wiederholungen",val:x=>x.maxR};
}
const metricOf=name=>{const h=exHistory(name);return{h,m:exMetric(h,exType(name))}};
function allExerciseNames(){
  const m=new Map();const add=n=>{if(n&&!m.has(norm(n)))m.set(norm(n),n.trim())};
  plan().days.forEach(d=>d.exercises.forEach(e=>add(e.name)));workouts().forEach(w=>(w.exercises||[]).forEach(e=>add(e.name)));
  Object.keys(plan().goals||{}).forEach(add);return [...m.values()];
}
function lastSets(name){const h=exHistory(name);return h.length?h[h.length-1]:null}
// Zusatzangabe zum Satz: Gewicht, Zusatzgewicht oder Strecke
function wText(w,T){if(!w)return"";return T.a==="km"?" · "+nf(w,2)+" km":" @ "+(T.plus?"+":"")+nf(w,2)+" kg"}
function setsSummary(sets,type="w"){
  if(!sets||!sets.length)return"";
  const T=TYPES[type]||TYPES.w;
  const same=sets.every(s=>s.w===sets[0].w&&s.r===sets[0].r);
  if(same)return sets.length+"×"+sets[0].r+T.u+wText(sets[0].w,T);
  return sets.map(s=>s.r+T.u+wText(s.w,T)).join(", ");
}
const fmtVal=(v,m)=>(m&&m.plus&&v>0?"+":"")+nf(v,2);
function goalProgress(name,target){
  const {h,m}=metricOf(name);if(!h.length)return{cur:null,start:null,pct:0,unit:m.unit,m};
  const start=m.val(h[0]);const cur=Math.max(...h.map(m.val));
  const pct=target<=start?(cur>=target?100:0):clamp((cur-start)/(target-start)*100,0,100);
  return{cur,start,pct,unit:m.unit,m};
}
// Volumen: Gewicht × Wdh.; bei Körpergewichtsübungen zählt das eigene Körpergewicht mit
function wkVolume(w){
  const bwKg=currentWeight()??profile().weight??75;
  return (w.exercises||[]).reduce((a,e)=>{const t=typeOf(e.name,e.type);if(!TYPES[t].vol)return a;
    return a+e.sets.reduce((b,s)=>b+((t==="bw"?bwKg:0)+(s.w||0))*(s.r||0),0)},0);
}

/* ---------- Serien & Abzeichen ---------- */
function stats(){
  const wks=workouts(),p=plan(),pr=profile(),today=iso();
  // Wochen-Serie: aufeinanderfolgende Wochen mit erreichtem Wochenziel
  const byWeek={};wks.forEach(w=>{const k=weekStart(w.date);(byWeek[k]=byWeek[k]||new Set()).add(w.date)});
  const hit=k=>(byWeek[k]?.size||0)>=p.weekly;
  let ws=weekStart(today);if(!hit(ws))ws=addDays(ws,-7);let weekStreak=0;while(hit(ws)){weekStreak++;ws=addDays(ws,-7)}
  let bestWeek=0;if(wks.length){let run=0;for(let k=weekStart(wks[0].date);k<=weekStart(today);k=addDays(k,7)){run=hit(k)?run+1:0;bestWeek=Math.max(bestWeek,run)}}
  // Rekorde zählen
  // Rekorde getrennt nach Messgröße zählen (kg vs. Wdh./Sek.), Calisthenics mit Zusatzgewicht und Kettlebell-Trainings
  const best={};let prs=0,weightedBW=0,kbSessions=0;
  for(const w of wks){let kb=false;for(const e of (w.exercises||[])){const t=typeOf(e.name,e.type);const anyW=e.sets.some(s=>s.w>0);
    if((t==="bw"||t==="hold")&&anyW)weightedBW++;if(libOf(e.name)?.[2]==="Kettlebell")kb=true;
    const kg=anyW;const n=norm(e.name)+(kg?"|kg":"|r");const v=kg?Math.max(...e.sets.map(s=>s.w)):Math.max(...e.sets.map(s=>s.r));
    if(best[n]!=null&&v>best[n])prs++;best[n]=Math.max(best[n]??-1,v)}if(kb)kbSessions++}
  // Ernährungs-Serie und Wasser-Tage
  const t=targets();const fdays=Object.keys(docs).filter(k=>k.startsWith("f-")&&docs[k]).map(k=>k.slice(2)).sort();
  const logged=new Set(fdays.filter(d=>(docs["f-"+d].items||[]).length));
  let d=today;if(!logged.has(d))d=addDays(d,-1);let foodStreak=0;while(logged.has(d)){foodStreak++;d=addDays(d,-1)}
  let bestFood=0;{let run=0,prev=null;for(const x of [...logged].sort()){run=prev&&addDays(prev,1)===x?run+1:1;bestFood=Math.max(bestFood,run);prev=x}}
  const waterDays=fdays.filter(x=>(docs["f-"+x].water||0)>=t.water).length;
  const goals=Object.entries(p.goals||{});const goalsHit=goals.filter(([n,tg])=>goalProgress(n,tg).pct>=100).length;
  const cw=currentWeight(),b=body();let weightGoal=false;
  if(pr.goalWeight&&cw!=null&&b.weights.length>1){const start=b.weights[0].kg;weightGoal=start>pr.goalWeight?cw<=pr.goalWeight:start<pr.goalWeight?cw>=pr.goalWeight:false}
  return{total:wks.length,volume:wks.reduce((a,w)=>a+wkVolume(w),0),weekStreak,bestWeek,prs,foodStreak,bestFood,waterDays,goalsHit,weightGoal,weightedBW,kbSessions};
}
const BADGES=[
  ["first","Erster Schritt","1 Training gespeichert","star",s=>[s.total,1]],
  ["w10","Dranbleiber","10 Trainings","training",s=>[s.total,10]],
  ["w25","Stammgast","25 Trainings","training",s=>[s.total,25]],
  ["w50","Eisenfresser","50 Trainings","training",s=>[s.total,50]],
  ["w100","Hundert","100 Trainings","trophy",s=>[s.total,100]],
  ["s2","Im Rhythmus","2 Wochen Ziel in Folge","flame",s=>[s.bestWeek,2]],
  ["s4","Ein Monat stark","4 Wochen Ziel in Folge","flame",s=>[s.bestWeek,4]],
  ["s12","Quartal durchgezogen","12 Wochen Ziel in Folge","flame",s=>[s.bestWeek,12]],
  ["v10","10 Tonnen","10 t bewegt","zap",s=>[s.volume/1000,10]],
  ["v100","100 Tonnen","100 t bewegt","zap",s=>[s.volume/1000,100]],
  ["pr1","Rekordjäger","1 persönlicher Rekord","award",s=>[s.prs,1]],
  ["pr10","Rekordmaschine","10 persönliche Rekorde","award",s=>[s.prs,10]],
  ["f7","Sauber protokolliert","7 Tage Essen am Stück","ernaehrung",s=>[s.bestFood,7]],
  ["h7","Gut hydriert","7 Tage Wasserziel","droplet",s=>[s.waterDays,7]],
  ["g1","Ziel erreicht","1 Kraftziel geschafft","target",s=>[s.goalsHit,1]],
  ["wg","Wunschgewicht","Zielgewicht erreicht","scale",s=>[s.weightGoal?1:0,1]],
  ["cw1","Schwerer als du","Calisthenics mit Zusatzgewicht","zap",s=>[s.weightedBW,1]],
  ["kb5","Kugel im Rollen","5 Trainings mit Kettlebell","training",s=>[s.kbSessions,5]]
];
function badgeState(s=stats()){return BADGES.map(([id,title,desc,ic,fn])=>{const [v,need]=fn(s);return{id,title,desc,ic,won:v>=need,pct:clamp(v/need*100,0,100)}})}
function checkBadges(extra=[]){
  const won=badgeState().filter(b=>b.won);const seen=new Set(get("badges").seen);
  const fresh=won.filter(b=>!seen.has(b.id));
  if(fresh.length||!docs.badges)put("badges",{seen:won.map(b=>b.id)});
  if(!docs.badges)return;
  if(fresh.length||extra.length)celebrate(fresh,extra);
}
function celebrate(fresh,extra){
  const el=$("#celebrate");const items=[...extra.map(t=>`<li>${icon("award")}${esc(t)}</li>`),...fresh.map(b=>`<li>${icon(b.ic)}<span>Abzeichen: <b>${esc(b.title)}</b><br><span class="muted small">${esc(b.desc)}</span></span></li>`)];
  el.innerHTML=`<div class="card"><div class="medal">${icon(fresh.length?"trophy":"award")}</div><h3 id="cel-title">${fresh.length?"Abzeichen freigeschaltet!":"Neuer Rekord!"}</h3><p class="muted" style="margin:0">Stark. Genau so geht Fortschritt.</p><ul>${items.join("")}</ul><button class="primary wide" data-a="cel-close">Weiter</button></div>`;
  $("#toast").hidden=true;el.hidden=false;buzz([40,60,40,60,80]);setTimeout(()=>el.querySelector("button").focus(),50);
}

/* ---------- Diagramme (interaktiv) ---------- */
let chartN=0;const CH={};
function niceStep(x){const e=10**Math.floor(Math.log10(x));const f=x/e;return(f<1.5?1:f<3?2:f<7?5:10)*e}
function lineChart(pts,{goal=null,unit="kg",h=240,label="",dec=1}={}){
  if(!pts.length)return`<div class="empty">Noch keine Daten in diesem Zeitraum.</div>`;
  const id="c"+(++chartN);
  const W=420,H=h,pl=42,pr=16,pt=22,pb=26;
  const xs=pts.map(p=>parseISO(p.d).getTime());let x0=Math.min(...xs),x1=Math.max(...xs);if(x0===x1){x0-=864e5*3;x1+=864e5*3}
  const ys=pts.map(p=>p.y).concat(goal!=null?[goal]:[]);let y0=Math.min(...ys),y1=Math.max(...ys);const padY=(y1-y0)*.15||Math.max(1,Math.abs(y1)*.05);y0-=padY;y1+=padY;
  const step=niceStep((y1-y0)/4);const X=t=>pl+(t-x0)/(x1-x0)*(W-pl-pr);const Y=v=>pt+(1-(v-y0)/(y1-y0))*(H-pt-pb);
  let g="";for(let v=Math.ceil(y0/step)*step;v<=y1;v+=step){g+=`<line class="grid-l" x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="axis" x="${pl-6}" y="${Y(v)+4}" text-anchor="end">${nf(v,1)}</text>`}
  const P=pts.map((p,i)=>[X(xs[i]),Y(p.y)]);
  const line=P.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  const area=line+` L${P[P.length-1][0].toFixed(1)} ${H-pb} L${P[0][0].toFixed(1)} ${H-pb} Z`;
  let goalSvg="";if(goal!=null){const gy=Y(goal);goalSvg=`<line class="goal" x1="${pl}" x2="${W-pr}" y1="${gy}" y2="${gy}"/><text class="goal-t" x="${W-pr}" y="${gy-6}" text-anchor="end">Ziel ${nf(goal,1)} ${unit}</text>`}
  const dots=P.map((p,i)=>`<circle class="dot${i===P.length-1?" last":""}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i===P.length-1?5.5:3.5}"/>`).join("");
  const xl=`<text class="axis" x="${pl}" y="${H-6}">${fdate(pts[0].d)}</text>`+(pts.length>1?`<text class="axis" x="${W-pr}" y="${H-6}" text-anchor="end">${fdate(pts[pts.length-1].d)}</text>`:"");
  CH[id]={kind:"line",W,H,pts:P.map((p,i)=>({x:p[0],y:p[1],t:fdate(pts[i].d,{weekday:"short",day:"2-digit",month:"2-digit"}),v:nf(pts[i].y,dec)+" "+unit}))};
  return`<div class="chart-box" data-chart="${id}"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}. Letzter Wert ${nf(pts[pts.length-1].y,dec)} ${unit}"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="grad-a"/><stop offset="1" class="grad-b"/></linearGradient></defs>${g}<path d="${area}" fill="url(#${id}g)"/><path class="line" d="${line}"/>${goalSvg}${dots}${xl}<line class="cursor" id="${id}-cur" y1="${pt}" y2="${H-pb}" hidden/><circle class="hl" id="${id}-hl" r="7" hidden/></svg><div class="tip" id="${id}-tip" hidden></div></div>`;
}
function barChart(items,{target=null,h=200,unit="",label=""}={}){
  const id="c"+(++chartN);
  const W=420,H=h,pl=42,pr=10,pt=14,pb=24;const max=Math.max(1,...items.map(i=>i.v),target||0)*1.1;
  const step=niceStep(max/4);const Y=v=>pt+(1-v/max)*(H-pt-pb);const bw=(W-pl-pr)/items.length;
  let g="";for(let v=0;v<=max;v+=step)g+=`<line class="grid-l" x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="axis" x="${pl-6}" y="${Y(v)+4}" text-anchor="end">${nf(v,0)}</text>`;
  const pts=[];
  const bars=items.map((it,i)=>{const x=pl+i*bw+bw*.18,w=bw*.64,y=Y(it.v);const over=target&&it.v>target*1.05;pts.push({x:x+w/2,y,t:it.tip||it.label,v:nf(it.v,0)+" "+unit});
    return`<rect class="barr${over?" over":""}${it.dim?" dim":""}" id="${id}-b${i}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(0,H-pb-y).toFixed(1)}" rx="4"/><text class="axis" x="${(x+w/2).toFixed(1)}" y="${H-6}" text-anchor="middle">${esc(it.label)}</text>`}).join("");
  const t=target?`<line class="target" x1="${pl}" x2="${W-pr}" y1="${Y(target)}" y2="${Y(target)}"/>`:"";
  CH[id]={kind:"bar",W,H,pts};
  return`<div class="chart-box" data-chart="${id}"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">${g}${bars}${t}</svg><div class="tip" id="${id}-tip" hidden></div></div>`;
}
function chartPoint(box,clientX){
  const id=box.dataset.chart,c=CH[id];if(!c)return;const svg=box.querySelector("svg");const r=svg.getBoundingClientRect();const sx=(clientX-r.left)*c.W/r.width;
  let bi=0;c.pts.forEach((p,i)=>{if(Math.abs(p.x-sx)<Math.abs(c.pts[bi].x-sx))bi=i});const p=c.pts[bi];
  const tip=box.querySelector(".tip");tip.innerHTML=`<b>${esc(p.v)}</b> · ${esc(p.t)}`;tip.hidden=false;
  const k=r.width/c.W;tip.style.left=clamp(p.x*k,60,r.width-60)+"px";tip.style.top=(p.y*k)+"px";
  if(c.kind==="line"){const cur=box.querySelector(`#${id}-cur`),hl=box.querySelector(`#${id}-hl`);cur.setAttribute("x1",p.x);cur.setAttribute("x2",p.x);cur.hidden=false;hl.setAttribute("cx",p.x);hl.setAttribute("cy",p.y);hl.hidden=false}
  else{box.querySelectorAll(".barr").forEach(b=>b.classList.remove("active"));box.querySelector(`#${id}-b${bi}`)?.classList.add("active")}
}
function chartHide(box){box.querySelector(".tip").hidden=true;box.querySelectorAll(".cursor,.hl").forEach(e=>e.hidden=true);box.querySelectorAll(".barr.active").forEach(b=>b.classList.remove("active"))}
document.addEventListener("pointermove",e=>{const b=e.target.closest(".chart-box");if(b&&e.pointerType==="mouse")chartPoint(b,e.clientX)});
document.addEventListener("pointerdown",e=>{const b=e.target.closest(".chart-box");document.querySelectorAll(".chart-box").forEach(x=>{if(x!==b)chartHide(x)});if(b)chartPoint(b,e.clientX)});
document.addEventListener("pointerout",e=>{const b=e.target.closest(".chart-box");if(b&&e.pointerType==="mouse"&&!b.contains(e.relatedTarget))chartHide(b)});
const RANGES=[["28","4 Wo."],["91","3 Mon."],["365","1 Jahr"],["all","Alle"]];
function rangeSeg(key){const cur=settings["range_"+key]||"all";return`<div class="seg range" role="group" aria-label="Zeitraum">${RANGES.map(([v,l])=>`<button data-a="range" data-key="${key}" data-v="${v}" aria-pressed="${cur===v}">${l}</button>`).join("")}</div>`}
function inRange(key,date){const v=settings["range_"+key]||"all";return v==="all"||date>=addDays(iso(),-+v)}
function ring(v,t){
  const r=56,c=2*Math.PI*r,frac=t?clamp(v/t,0,1):0,over=t&&v>t;
  return`<svg class="ring" viewBox="0 0 136 136" role="img" aria-label="${nf(v,0)} von ${nf(t,0)} kcal"><circle class="track" cx="68" cy="68" r="${r}" fill="none" stroke-width="13"/><circle class="val${over?" over":""}" cx="68" cy="68" r="${r}" fill="none" stroke-width="13" stroke-linecap="round" stroke-dasharray="${(c*frac).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 68 68)"/><text x="68" y="72" text-anchor="middle" font-size="32">${nf(Math.abs(t-v),0)}</text><text class="sub" x="68" y="92" text-anchor="middle" font-size="12">${over?"kcal drüber":"kcal übrig"}</text></svg>`;
}
const bar=(pct,cls="")=>`<div class="bar ${cls}" role="presentation"><i style="width:${clamp(pct,0,100).toFixed(1)}%"></i></div>`;

/* ---------- UI-Zustand ---------- */
let libQ="",libCat="Alle",libDay=null;
let route="heute",foodDate=iso(),progEx=null,pendingRender=false,toastT=null,installEvt=null,swWaiting=null;
let active=null;try{active=JSON.parse(lsGet(LS+"active")||"null")}catch(e){active=null}
let rest=null,audioCtx=null,wakeLock=null;
const saveActive=()=>{if(active)lsSet(LS+"active",JSON.stringify(active));else lsDel(LS+"active");keepAwake()};
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,3600)}
function isEditing(){const a=document.activeElement;return a&&$("#main").contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)}
function requestRender(){if(isEditing()){pendingRender=true;return}render()}
document.addEventListener("focusout",()=>setTimeout(()=>{if(pendingRender&&!isEditing()){pendingRender=false;render()}},0));
async function keepAwake(){ // Bildschirm bleibt während eines Trainings an
  try{if(active&&document.visibilityState==="visible"&&"wakeLock" in navigator&&!wakeLock){wakeLock=await navigator.wakeLock.request("screen");wakeLock.addEventListener("release",()=>{wakeLock=null})}
    else if(!active&&wakeLock){await wakeLock.release();wakeLock=null}}catch(e){}
}
document.addEventListener("visibilitychange",()=>{keepAwake();if(rest)renderRest()});
const isStandalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);

/* ---------- Ansichten ---------- */
function hasData(){return Object.keys(docs).some(k=>docs[k]&&k!=="badges")}
function head(ic,label,title,right=""){return`<div class="view-head"><div><div class="label">${icon(ic)}${label}</div><h2>${title}</h2></div>${right}</div>`}
function cardHead(ic,title,right="",tone=""){return`<div class="card-head"><div class="card-title"><span class="chip-ic ${tone}">${icon(ic)}</span><h3>${title}</h3></div>${right}</div>`}

function viewHeute(){
  const today=iso(),t=targets(),tot=dayTotals(today),fd=foodDay(today),p=plan(),wks=workouts(),s=stats();
  const dow=new Date().getDay();const todays=p.days.filter(d=>d.weekday===dow);const doneToday=wks.filter(w=>w.date===today);
  const ws=weekStart(today);const weekDone=new Set(wks.filter(w=>w.date>=ws).map(w=>w.date));
  const h=new Date().getHours();const greet=h<11?"Guten Morgen":h<18?"Los geht's":"Guten Abend";
  const bs=badgeState(s);
  let html=head("calendar",esc(new Date().toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"})),greet);
  if(swWaiting)html+=`<div class="card update"><span><b>Neue Version verfügbar.</b><br><span class="muted small">Deine Daten bleiben erhalten.</span></span><button class="primary" data-a="sw-update">Jetzt aktualisieren</button></div>`;
  if(!hasData()){
    html+=`<div class="card block" style="margin-bottom:16px"><div class="label">Willkommen</div><h3>Los geht's mit Repwerk</h3><ol><li><b>Profil</b> ausfüllen: Daraus berechnet die App deinen Kalorienbedarf.</li><li><b>Trainingsplan</b> anlegen oder eine Vorlage wählen.</li><li>Sätze abhaken, Essen eintragen, Abzeichen sammeln.</li></ol><div class="row"><button data-a="go" data-to="profil">Profil ausfüllen</button><button class="ghost" data-a="sample">Beispieldaten ansehen</button></div></div>`;
  }
  html+=`<div class="stats" style="margin-bottom:16px"><div class="stat fill"><span class="label">${icon("flame")}Wochen-Serie</span><span class="mid">${s.weekStreak} <small>${s.weekStreak===1?"Woche":"Wochen"}</small></span></div><div class="stat"><span class="label">${icon("training")}Trainings</span><span class="mid">${s.total}</span></div><div class="stat"><span class="label">${icon("ernaehrung")}Essen-Serie</span><span class="mid">${s.foodStreak} <small>${s.foodStreak===1?"Tag":"Tage"}</small></span></div><div class="stat"><span class="label">${icon("trophy")}Abzeichen</span><span class="mid">${bs.filter(b=>b.won).length}<small class="muted"> / ${bs.length}</small></span></div></div>`;
  html+=`<div class="grid">`;
  // Training heute (Farbblock)
  let tr=`<div class="card block">`;
  if(active)tr+=`<div class="label">Läuft gerade</div><h3>${esc(active.dayName)}</h3><p class="muted" style="margin:0 0 14px">${active.exercises.reduce((a,e)=>a+e.sets.filter(x=>x.done).length,0)} von ${active.exercises.reduce((a,e)=>a+e.sets.length,0)} Sätzen erledigt</p><button data-a="go" data-to="training">${icon("play")}Weiter trainieren</button>`;
  else if(doneToday.length)tr+=`<div class="row between"><div class="label">Training heute</div><span class="pill">${icon("check")}Erledigt</span></div>`+doneToday.map(w=>`<h3>${esc(w.dayName)}</h3><p class="muted" style="margin:0 0 14px">${w.duration||"?"} min · ${(w.exercises||[]).length} Übungen · ${nf(wkVolume(w),0)} kg bewegt</p>`).join("")+`<button data-a="go" data-to="fortschritt">Fortschritt ansehen</button>`;
  else if(todays.length)tr+=todays.map(d=>`<div class="label">Heute auf dem Plan</div><h3>${esc(d.name)}</h3><p class="muted" style="margin:0 0 14px">${d.exercises.map(e=>esc(e.name)).join(" · ")||"Keine Übungen"}</p><button data-a="start" data-day="${d.id}">${icon("play")}Training starten</button>`).join("");
  else tr+=`<div class="label">Training heute</div><h3>${p.days.length?"Ruhetag":"Noch kein Plan"}</h3><p class="muted" style="margin:0 0 14px">${p.days.length?"Regeneration gehört zum Fortschritt. Lust hast du trotzdem?":"Leg deinen Trainingsplan an, dann weißt du jeden Tag, was dran ist."}</p>${p.days.length?`<button data-a="go" data-to="training">Trotzdem trainieren</button>`:`<button data-a="go" data-to="plan">Plan anlegen</button>`}`;
  tr+=`</div>`;
  // Kalorien
  const kc=`<div class="card">${cardHead("ernaehrung","Kalorien",`<span class="muted small"><span class="num">${nf(tot.kcal,0)}</span> / ${nf(t.kcal,0)} kcal</span>`)}<div class="ring-wrap">${ring(tot.kcal,t.kcal)}<div class="macros">${macroRow("Eiweiß",tot.p,t.protein,"p")}${macroRow("Kohlenhydrate",tot.c,t.carbs,"c")}${macroRow("Fett",tot.f,t.fat,"f")}</div></div><button class="primary wide" style="margin-top:14px" data-a="go" data-to="ernaehrung">${icon("plus")}Essen eintragen</button></div>`;
  // Woche
  const planned=new Set(p.days.map(d=>d.weekday).filter(x=>x!=null));
  let wk=`<div class="card">${cardHead("calendar","Diese Woche",`<span class="pill ${weekDone.size>=p.weekly?"good":"accent"}">${weekDone.size} / ${p.weekly} Einheiten</span>`,"green")}<div class="week">`;
  for(let i=0;i<7;i++){const d=addDays(ws,i);const wd=parseISO(d).getDay();wk+=`<div class="d${d===today?" today":""}"><span class="dot${weekDone.has(d)?" on":planned.has(wd)?" plan":""}" title="${WD_LONG[wd]}">${weekDone.has(d)?icon("check"):""}</span>${WD[wd]}</div>`}
  wk+=`</div><p class="muted small" style="margin:12px 0 0">Grün = trainiert, gestrichelt = laut Plan.</p></div>`;
  // Wasser
  const wpct=fd.water/t.water*100;
  const wa=`<div class="card">${cardHead("droplet","Wasser",`<span class="muted small"><span class="num">${nf(fd.water/1000,2)}</span> / ${nf(t.water/1000,1)} l</span>`,"blue")}${bar(wpct,wpct>=100?"good":"water")}<div class="row" style="margin-top:12px"><button class="sm" data-a="water" data-ml="250" data-d="${today}">+ 250 ml</button><button class="sm" data-a="water" data-ml="500" data-d="${today}">+ 500 ml</button><button class="ghost sm" data-a="water" data-ml="-250" data-d="${today}" aria-label="250 ml abziehen">− 250</button></div></div>`;
  // Gewicht
  const b=body(),pr=profile();const cw=currentWeight();
  let gw=`<div class="card">${cardHead("scale","Körpergewicht",pr.goalWeight?`<span class="pill">${icon("target")}${nf(pr.goalWeight)} kg</span>`:"","violet")}`;
  if(cw!=null){const start=b.weights[0].kg;const diff=cw-start;let pct=null;if(pr.goalWeight&&start!==pr.goalWeight)pct=clamp((start-cw)/(start-pr.goalWeight)*100,0,100);
    const good=pr.goalWeight!=null&&diff!==0&&Math.sign(diff)===Math.sign(pr.goalWeight-start);
    gw+=`<div class="row" style="align-items:baseline;gap:8px"><span class="big">${nf(cw)}</span><span class="muted">kg</span><span class="pill ${diff===0?"":good?"good":pr.goalWeight!=null?"bad":"accent"}">${diff>0?"+":""}${nf(diff)} kg seit Start</span></div>`;
    if(pct!=null)gw+=`<div style="margin-top:12px">${bar(pct,"good")}<div class="muted small" style="margin-top:6px">${nf(pct,0)} % geschafft · noch ${nf(Math.abs(pr.goalWeight-cw))} kg</div></div>`;}
  else gw+=`<p class="muted" style="margin:0">Noch kein Gewicht eingetragen.</p>`;
  gw+=`<form class="row" data-f="weight-quick" style="margin-top:12px;flex-wrap:nowrap"><input id="wq" type="number" inputmode="decimal" step="0.1" min="20" max="400" placeholder="Gewicht heute (kg)" aria-label="Gewicht heute in kg"><button class="primary">Speichern</button></form></div>`;
  // Ziele
  const goals=Object.entries(p.goals||{});
  let gl=`<div class="card">${cardHead("target","Kraftziele",`<button class="ghost sm" data-a="go" data-to="plan">Bearbeiten</button>`)}`;
  if(goals.length)gl+=`<div class="stack" style="gap:14px">`+goals.slice(0,5).map(([n,tg])=>{const g=goalProgress(n,tg);return`<div><div class="row between small" style="margin-bottom:6px;flex-wrap:nowrap"><b>${esc(n)}</b><span class="muted"><span class="num">${g.cur!=null?nf(g.cur,2):"–"}</span> / ${nf(tg,2)} ${g.unit||"kg"}</span></div>${bar(g.pct,g.pct>=100?"good":"")}</div>`}).join("")+`</div>`;
  else gl+=`<p class="muted" style="margin:0">Setze im Trainingsplan Zielgewichte für deine Übungen, dann siehst du hier, wie weit du bist.</p>`;
  gl+=`</div>`;
  // Nächstes Abzeichen
  const next=bs.filter(x=>!x.won).sort((a,c)=>c.pct-a.pct)[0];
  const nb=next?`<div class="card">${cardHead("trophy","Nächstes Abzeichen",`<button class="ghost sm" data-a="go" data-to="fortschritt">Alle</button>`,"gold")}<div class="row" style="flex-wrap:nowrap;gap:14px"><div class="badge" style="flex:none;width:92px;padding:10px 6px"><span class="medal">${icon(next.ic)}</span></div><div style="flex:1;min-width:0"><b>${esc(next.title)}</b><div class="muted small" style="margin-bottom:8px">${esc(next.desc)}</div>${bar(next.pct)}<div class="muted small" style="margin-top:4px">${nf(next.pct,0)} %</div></div></div></div>`:"";
  return html+tr+kc+wk+gl+nb+gw+wa+`</div>`;
}
function macroRow(n,v,t,cls){return`<div class="macro"><div class="row"><span>${n}</span><span class="muted"><span class="num">${nf(v,0)}</span> / ${nf(t,0)} g</span></div>${bar(t?v/t*100:0,v>t*1.1?"over":cls)}</div>`}

function viewTraining(){
  if(active)return viewSession();
  const p=plan(),wks=workouts().slice().reverse();const dow=new Date().getDay();
  let html=head("training","Training loggen","Training",`<button class="sm" data-a="go" data-to="plan">${icon("plan")}Plan bearbeiten</button>`)+`<div class="grid"><div class="card">${cardHead("play","Welcher Tag?")}`;
  if(p.days.length)html+=`<div class="stack" style="gap:8px">`+p.days.map(d=>`<button class="tpl ${d.weekday===dow?"primary":""}" data-a="start" data-day="${d.id}"><span>${esc(d.name)}</span><small>${d.weekday!=null?WD_LONG[d.weekday]+" · ":""}${d.exercises.length} Übungen${d.weekday===dow?" · heute":""}</small></button>`).join("")+`</div>`;
  else html+=`<p class="muted" style="margin-top:0">Du hast noch keinen Trainingsplan. Leg einen an oder starte ein freies Training.</p><button class="primary wide" data-a="go" data-to="plan">Trainingsplan anlegen</button>`;
  html+=`<button class="wide" style="margin-top:10px" data-a="start" data-day="">Freies Training starten</button></div>`;
  html+=`<div class="card">${cardHead("calendar","Verlauf",`<span class="muted small">${wks.length} Trainings</span>`,"green")}`;
  if(!wks.length)html+=`<div class="empty">Hier erscheinen deine gespeicherten Trainings.</div>`;
  else html+=wks.slice(0,20).map(w=>`<details class="wk"><summary><span><b>${esc(w.dayName)}</b><br><span class="muted small">${fdate(w.date,{weekday:"short",day:"2-digit",month:"2-digit"})} · ${w.duration||"?"} min · ${nf(wkVolume(w),0)} kg</span></span><span class="pill">${(w.exercises||[]).length} Übungen</span></summary><ul class="list" style="margin-top:6px">${(w.exercises||[]).map(e=>`<li><span class="grow">${esc(e.name)}</span><span class="muted small">${esc(setsSummary(e.sets,typeOf(e.name,e.type)))}</span></li>`).join("")}</ul>${w.notes?`<p class="muted small">${esc(w.notes)}</p>`:""}<button class="ghost danger sm" data-a="wk-del" data-key="${w._key}" data-id="${w.id}" data-confirm="Wirklich löschen?">Training löschen</button></details>`).join("");
  return html+`</div></div>`;
}
function viewSession(){
  const a=active;const pr=profile();
  const total=a.exercises.reduce((s,e)=>s+e.sets.length,0),done=a.exercises.reduce((s,e)=>s+e.sets.filter(x=>x.done).length,0);
  let html=head("training","Training läuft",esc(a.dayName));
  html+=`<div class="session-bar"><div><div class="label">Dauer</div><div class="mid" id="elapsed">${elapsed()}</div></div><div style="flex:1;max-width:220px"><div class="label" style="margin-bottom:6px">${done} / ${total} Sätze</div>${bar(total?done/total*100:0,done===total&&total?"good":"")}</div><button class="sm" data-a="rest" data-s="${pr.rest||90}">${icon("timer")}Pause</button></div><div class="grid">`;
  a.exercises.forEach((ex,ei)=>{const last=lastSets(ex.name);const mg=muscleOf(ex.name);const ty=ex.type||exType(ex.name);const T=TYPES[ty];
    html+=`<div class="card ex-card"><div class="card-head" style="align-items:flex-start"><div style="min-width:0"><div class="row" style="gap:6px">${mg?`<span class="mg">${mg}</span>`:""}${ty!=="w"?`<span class="mg mg-type">${T.label}</span>`:""}</div><h3 style="margin-top:4px">${esc(ex.name)}</h3><div class="last">${ex.target?"Plan: "+esc(ex.target):""}${last?(ex.target?"<br>":"")+"Letztes Mal ("+fdate(last.date)+"): "+esc(setsSummary(last.sets,ty)):""}</div></div><button class="ghost icon danger" data-a="ex-del" data-ex="${ei}" data-confirm="Weg?" aria-label="Übung entfernen">${icon("x")}</button></div>
    <table class="sets"><thead><tr><th>Satz</th>${T.a?`<th>${T.a}</th>`:""}<th>${T.b}</th><th><span class="sr" hidden>Erledigt</span></th></tr></thead><tbody>${ex.sets.map((s,si)=>`<tr class="${s.done?"done":""}"><td>${si+1}</td>${T.a?`<td><input id="w-${ei}-${si}" inputmode="decimal" data-c="set" data-ex="${ei}" data-set="${si}" data-k="w" value="${esc(s.w)}" placeholder="${T.plus?"+0":"0"}" aria-label="${T.plus?"Zusatzgewicht":T.a==="km"?"Strecke":"Gewicht"} Satz ${si+1}"></td>`:""}<td><input id="r-${ei}-${si}" inputmode="numeric" data-c="set" data-ex="${ei}" data-set="${si}" data-k="r" value="${esc(s.r)}" placeholder="${s.tr??""}" aria-label="${T.b} Satz ${si+1}"></td><td><button class="chk${s.done?" on":""}" data-a="set-done" data-ex="${ei}" data-set="${si}" aria-pressed="${!!s.done}" aria-label="Satz ${si+1} abhaken">${icon("check")}</button></td></tr>`).join("")}</tbody></table>
    <div class="row" style="margin-top:8px"><button class="ghost sm" data-a="set-add" data-ex="${ei}">${icon("plus")}Satz</button>${ex.sets.length>1?`<button class="ghost sm" data-a="set-del" data-ex="${ei}">− Satz</button>`:""}</div></div>`});
  html+=`<div class="card">${cardHead("plus","Übung hinzufügen")}<form class="row" data-f="ex-add" style="flex-wrap:nowrap"><input id="new-ex" list="ex-list" placeholder="z. B. Bizepscurls" aria-label="Übungsname"><button>Hinzufügen</button></form>${exDatalist()}<label class="f" style="margin-top:14px">Notizen<textarea id="s-notes" data-c="notes" placeholder="Wie lief's? Schlaf, Energie, Schmerzen …">${esc(a.notes||"")}</textarea></label></div></div>`;
  html+=`<div class="row" style="margin-top:16px;justify-content:flex-end"><button class="ghost danger" data-a="session-discard" data-confirm="Wirklich verwerfen?">Training verwerfen</button><button class="primary" data-a="session-finish">${icon("check")}Training beenden &amp; speichern</button></div>`;
  return html;
}
function libList(){
  const q=norm(libQ);const items=LIB.filter(x=>(libCat==="Alle"||x[2]===libCat)&&(!q||norm(x[0]).includes(q)||norm(x[3]).includes(q)));
  if(!items.length)return`<li><span class="muted">Keine Übung gefunden. Du kannst jede Übung auch frei im Plan eintippen.</span></li>`;
  return items.map(([n,t,eq,mg])=>`<li><span class="grow"><b>${esc(n)}</b><br><span class="row" style="gap:6px;margin-top:4px"><span class="mg">${mg}</span><span class="mg mg-type">${TYPES[t].label}</span>${libCat==="Alle"?`<span class="muted small">${esc(eq)}</span>`:""}</span></span><button class="sm" data-a="lib-add" data-n="${esc(n)}" aria-label="${esc(n)} zum Plan hinzufügen">${icon("plus")}Plan</button></li>`).join("");
}
function exDatalist(){const names=[...new Set([...allExerciseNames(),...EXERCISES])];return`<datalist id="ex-list">${names.map(n=>`<option value="${esc(n)}"></option>`).join("")}</datalist>`}
function elapsed(){if(!active)return"";const s=Math.floor((Date.now()-active.start)/1000);const h=Math.floor(s/3600);return(h?h+":"+pad(Math.floor(s/60)%60):Math.floor(s/60))+":"+pad(s%60)}

function viewPlan(){
  const p=plan();
  let html=head("plan","Deine Woche","Trainingsplan",`<label class="f" style="flex-direction:row;align-items:center;gap:8px">Ziel pro Woche<select id="weekly" data-c="weekly" style="width:auto">${[1,2,3,4,5,6,7].map(n=>`<option ${n===p.weekly?"selected":""}>${n}</option>`).join("")}</select></label>`);
  const tplCards=`<div class="tpl-grid">${Object.entries(TEMPLATES).map(([k,t])=>`<button class="tpl" data-a="tpl" data-t="${k}" ${p.days.length?'data-confirm="Aktuellen Plan ersetzen?"':""}><span>${esc(t.label)}</span><small>${esc(t.sub)}</small></button>`).join("")}</div>`;
  if(!p.days.length)html+=`<div class="card" style="margin-bottom:16px">${cardHead("star","Mit einer Vorlage starten")}<p class="muted small" style="margin-top:-6px">Gym, Calisthenics oder Kettlebell. Übungen, Sätze und Gewichte kannst du danach anpassen.</p>${tplCards}</div>`;
  else html+=`<details class="card tpl-more" style="margin-bottom:16px"><summary class="card-title"><span class="chip-ic">${icon("star")}</span><h3>Vorlagen</h3><span class="muted small" style="margin-left:auto">ersetzt den Plan</span></summary><div style="margin-top:12px">${tplCards}</div></details>`;
  html+=`<div class="grid">`;
  p.days.forEach(d=>{
    html+=`<div class="card day-card"><div class="row" style="margin-bottom:8px;flex-wrap:nowrap"><input id="dn-${d.id}" data-c="day" data-day="${d.id}" data-k="name" value="${esc(d.name)}" aria-label="Name des Trainingstags" style="font-weight:700;font-size:1.05rem"><button class="ghost icon danger" data-a="day-del" data-day="${d.id}" data-confirm="Löschen?" aria-label="Tag löschen">${icon("x")}</button></div>
    <select id="dw-${d.id}" data-c="day" data-day="${d.id}" data-k="weekday" aria-label="Wochentag"><option value="">Kein fester Wochentag</option>${[1,2,3,4,5,6,0].map(i=>`<option value="${i}" ${d.weekday===i?"selected":""}>${WD_LONG[i]}</option>`).join("")}</select>
    <div class="plan-ex head" style="margin-top:12px"><span>Übung</span><span>Art</span><span>Sätze</span><span>Wdh./Zeit</span><span>kg/km</span><span></span></div>
    ${d.exercises.map(e=>{const ty=typeOf(e.name,e.type);const T=TYPES[ty];return`<div class="plan-ex"><input id="en-${e.id}" list="ex-list" data-c="pex" data-day="${d.id}" data-ex="${e.id}" data-k="name" value="${esc(e.name)}" placeholder="Übung" aria-label="Übung"><label class="pf pt"><span>Art</span><select id="et-${e.id}" data-c="pex" data-day="${d.id}" data-ex="${e.id}" data-k="type" aria-label="Übungsart">${Object.entries(TYPES).map(([k,x])=>`<option value="${k}" ${k===ty?"selected":""}>${x.label}</option>`).join("")}</select></label><label class="pf"><span>Sätze</span><input id="es-${e.id}" inputmode="numeric" data-c="pex" data-day="${d.id}" data-ex="${e.id}" data-k="sets" value="${esc(e.sets)}" aria-label="Sätze"></label><label class="pf"><span>${T.b}</span><input id="er-${e.id}" data-c="pex" data-day="${d.id}" data-ex="${e.id}" data-k="reps" value="${esc(e.reps)}" aria-label="${T.b}"></label>${T.a?`<label class="pf"><span>${T.a}</span><input id="ew-${e.id}" inputmode="decimal" data-c="pex" data-day="${d.id}" data-ex="${e.id}" data-k="weight" value="${esc(e.weight||"")}" placeholder="${T.plus?"+0":""}" aria-label="${T.plus?"Zusatzgewicht":T.a==="km"?"Strecke":"Gewicht"}"></label>`:`<span class="pf" aria-hidden="true"></span>`}<button class="ghost icon" data-a="pex-del" data-day="${d.id}" data-ex="${e.id}" aria-label="Übung entfernen">${icon("x")}</button></div>`}).join("")}
    <div class="row" style="margin-top:12px"><button class="ghost sm" data-a="pex-add" data-day="${d.id}">${icon("plus")}Übung</button><button class="primary sm" data-a="start" data-day="${d.id}">${icon("play")}Jetzt trainieren</button></div></div>`});
  html+=`<div class="card" style="display:grid;place-items:center;min-height:120px;border-style:dashed;box-shadow:none"><button class="primary" data-a="day-add">${icon("plus")}Trainingstag hinzufügen</button></div>${exDatalist()}`;
  // Übungsbibliothek
  html+=`<div class="card span">${cardHead("training","Übungsbibliothek",`<span class="muted small">${LIB.length} Übungen</span>`)}
    <div class="row lib-tools"><input id="lib-q" data-i="libq" placeholder="Übung suchen …" value="${esc(libQ)}" aria-label="Übung suchen" style="flex:2;min-width:180px;width:auto"><label class="f" style="flex:1;min-width:160px">Hinzufügen zu<select id="lib-day" data-c="libday">${p.days.length?p.days.map(d=>`<option value="${d.id}" ${d.id===libDay?"selected":""}>${esc(d.name)}</option>`).join(""):`<option value="">Neuer Trainingstag</option>`}</select></label></div>
    <div class="chips" style="margin:12px 0 4px" role="group" aria-label="Kategorie">${["Alle",...EQUIP].map(c=>`<button class="chip${libCat===c?" on":""}" data-a="libcat" data-c2="${esc(c)}" aria-pressed="${libCat===c}">${esc(c)}</button>`).join("")}</div>
    <ul class="list lib-list" id="lib-list">${libList()}</ul></div>`;
  const names=allExerciseNames();
  html+=`<div class="card span">${cardHead("target","Ziele pro Übung",`<span class="muted small">kg, Zusatz-kg, Wdh. oder Sekunden</span>`,"green")}`;
  if(!names.length)html+=`<p class="muted" style="margin:0">Füge erst Übungen hinzu.</p>`;
  else html+=`<ul class="list">${names.map((n,i)=>{const tg=(p.goals||{})[n];const g=goalProgress(n,tg||0);const ty=exType(n);const unit=g.cur!=null?g.unit:(ty==="bw"?"Wdh.":ty==="hold"?"s":"kg");const mg=muscleOf(n);
    return`<li><span class="grow"><b>${esc(n)}</b> ${mg?`<span class="mg">${mg}</span>`:""}<br><span class="muted small">Aktuell: ${g.cur!=null?fmtVal(g.cur,g.m)+" "+unit+(g.m&&g.m.plus?" Zusatz":""):"noch nicht trainiert"}</span></span><input id="goal-${i}" inputmode="decimal" data-c="goal" data-name="${esc(n)}" value="${tg??""}" placeholder="Ziel ${unit}" style="width:100px;text-align:center" aria-label="Ziel für ${esc(n)} in ${unit}"></li>`}).join("")}</ul><p class="muted small" style="margin:10px 0 0">Bei Calisthenics zählt das Zusatzgewicht, sobald du einmal mit Gewicht trainiert hast, vorher die Wiederholungen bzw. Sekunden.</p>`;
  return html+`</div></div>`;
}

function viewFood(){
  const d=foodDate,t=targets(),tot=dayTotals(d),fd=foodDay(d),today=iso();
  const label=d===today?"Heute":d===addDays(today,-1)?"Gestern":fdate(d,{weekday:"long",day:"numeric",month:"long"});
  let html=head("ernaehrung","Kalorientracker",esc(label),`<div class="row"><button class="icon" data-a="fday" data-n="-1" aria-label="Vorheriger Tag">‹</button>${d!==today?`<button data-a="fday" data-n="0">Heute</button>`:""}<button class="icon" data-a="fday" data-n="1" aria-label="Nächster Tag" ${d>=today?"disabled":""}>›</button></div>`)+`<div class="grid">`;
  html+=`<div class="card">${cardHead("zap","Bilanz",`<span class="muted small">Ziel ${nf(t.kcal,0)} kcal</span>`)}<div class="ring-wrap">${ring(tot.kcal,t.kcal)}<div class="macros">${macroRow("Eiweiß",tot.p,t.protein,"p")}${macroRow("Kohlenhydrate",tot.c,t.carbs,"c")}${macroRow("Fett",tot.f,t.fat,"f")}</div></div>
  <div style="margin-top:18px"><div class="row between small" style="margin-bottom:6px"><b class="row" style="gap:6px">${icon("droplet")}Wasser</b><span class="muted"><span class="num">${nf(fd.water/1000,2)}</span> / ${nf(t.water/1000,1)} l</span></div>${bar(fd.water/t.water*100,fd.water>=t.water?"good":"water")}<div class="row" style="margin-top:10px"><button class="sm" data-a="water" data-ml="250" data-d="${d}">+ 250 ml</button><button class="sm" data-a="water" data-ml="500" data-d="${d}">+ 500 ml</button><button class="ghost sm" data-a="water" data-ml="-250" data-d="${d}">− 250</button></div></div></div>`;
  const foods=allFoods();
  html+=`<div class="card">${cardHead("plus","Essen hinzufügen")}`;
  const recent=recentFoods();
  if(recent.length)html+=`<div class="label" style="margin-bottom:8px">Schnell nochmal</div><div class="chips" style="margin-bottom:16px">${recent.map((r,i)=>`<button class="chip" data-a="food-re" data-i="${i}">${esc(r.name)} · ${nf(r.kcal,0)}</button>`).join("")}</div>`;
  html+=`<form data-f="food-add" class="stack" style="gap:10px" autocomplete="off">
   <div class="fields" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr)"><label class="f">Lebensmittel<input id="f-name" list="food-list" data-i="food" placeholder="z. B. Haferflocken" required></label><label class="f">Menge (g)<input id="f-g" inputmode="decimal" data-i="food" placeholder="100"></label></div>
   <datalist id="food-list">${foods.map(f=>`<option value="${esc(f[0])}">${f[1]} kcal / 100 g</option>`).join("")}</datalist>
   <div class="fields" style="grid-template-columns:repeat(4,minmax(0,1fr))"><label class="f">kcal<input id="f-k" inputmode="decimal" required></label><label class="f">Eiweiß<input id="f-p" inputmode="decimal"></label><label class="f">KH<input id="f-c" inputmode="decimal"></label><label class="f">Fett<input id="f-f" inputmode="decimal"></label></div>
   <label class="f">Mahlzeit<select id="f-meal">${MEALS.map(m=>`<option ${m===defaultMeal()?"selected":""}>${m}</option>`).join("")}</select></label>
   <label class="row small muted" style="gap:10px;flex-wrap:nowrap;min-height:44px"><input id="f-save" type="checkbox"> Als eigenes Lebensmittel merken</label>
   <p class="muted small" id="f-hint" style="margin:0">Lebensmittel aus der Liste wählen und Menge eingeben, die Nährwerte werden ausgerechnet.</p>
   <button class="primary wide">${icon("plus")}Hinzufügen</button></form></div>`;
  html+=`<div class="card">${cardHead("ernaehrung","Mahlzeiten")}`;
  if(!fd.items.length)html+=`<div class="empty">Für diesen Tag ist noch nichts eingetragen.</div>`;
  for(const m of MEALS){const its=fd.items.filter(i=>i.meal===m);if(!its.length)continue;const k=its.reduce((a,i)=>a+(+i.kcal||0),0);
    html+=`<div class="meal"><h4><span>${icon(MEAL_IC[m])}${m}</span><span class="num">${nf(k,0)} kcal</span></h4><ul class="list">${its.map(i=>`<li><span class="grow">${esc(i.name)}${i.g?` <span class="muted small">${nf(i.g,0)} g</span>`:""}<br><span class="muted small">E ${nf(i.p,0)} · KH ${nf(i.c,0)} · F ${nf(i.f,0)}</span></span><span class="num">${nf(i.kcal,0)}</span><button class="ghost icon" data-a="food-del" data-id="${i.id}" aria-label="${esc(i.name)} entfernen">${icon("x")}</button></li>`).join("")}</ul></div>`}
  html+=`</div>`;
  const days=[];for(let i=6;i>=0;i--){const dd=addDays(d,-i);days.push({label:WD[parseISO(dd).getDay()],tip:fdate(dd,{weekday:"short",day:"2-digit",month:"2-digit"}),v:dayTotals(dd).kcal,dim:dd>today})}
  const avg=days.filter(x=>x.v>0);
  html+=`<div class="card">${cardHead("fortschritt","Letzte 7 Tage",`<span class="muted small">Ø ${avg.length?nf(avg.reduce((a,x)=>a+x.v,0)/avg.length,0):"–"} kcal</span>`)}${barChart(days,{target:t.kcal,unit:"kcal",label:"Kalorien der letzten 7 Tage"})}<p class="muted small" style="margin:6px 0 0">Antippen zeigt den Wert. Gestrichelt: dein Tagesziel, rot: mehr als 5 % drüber.</p></div>`;
  return html+`</div>`;
}
function allFoods(){return[...get("foods").custom.map(f=>[f.name,f.kcal,f.p,f.c,f.f,f.por||100]),...FOODS]}
function findFood(n){n=norm(n);return allFoods().find(f=>norm(f[0])===n)}
function defaultMeal(){const h=new Date().getHours()+new Date().getMinutes()/60;return h<10.5?MEALS[0]:h<15?MEALS[1]:h<17.5?MEALS[3]:h<21.5?MEALS[2]:MEALS[3]}
function recentFoods(){
  const seen=new Set(),out=[];for(let i=0;i<21&&out.length<10;i++){const d=addDays(iso(),-i);const its=foodDay(d).items.slice().reverse();for(const it of its){const k=norm(it.name)+"|"+it.kcal;if(seen.has(k))continue;seen.add(k);out.push(it);if(out.length>=10)break}}
  return out;
}

function viewProgress(){
  const names=allExerciseNames().filter(n=>exHistory(n).length);const wks=workouts();const p=plan();const s=stats();const bs=badgeState(s);
  if(!progEx||!names.includes(progEx))progEx=names[0]||null;
  let html=head("fortschritt","Auswertung","Fortschritt");
  html+=`<div class="stats" style="margin-bottom:16px"><div class="stat fill"><span class="label">${icon("training")}Trainings</span><span class="mid">${s.total}</span></div><div class="stat"><span class="label">${icon("zap")}Bewegt</span><span class="mid">${nf(s.volume/1000,1)} <small>t</small></span></div><div class="stat"><span class="label">${icon("flame")}Beste Serie</span><span class="mid">${s.bestWeek} <small>Wo.</small></span></div><div class="stat"><span class="label">${icon("award")}Rekorde</span><span class="mid">${s.prs}</span></div></div><div class="grid">`;
  if(!wks.length)html+=`<div class="card span"><div class="empty">Sobald du dein erstes Training gespeichert hast, siehst du hier Kurven, Rekorde und wie nah du an deinen Zielen bist.</div><button class="primary wide" style="margin-top:12px" data-a="go" data-to="training">Training starten</button></div>`;
  if(progEx){const all=exHistory(progEx);const h=all.filter(x=>inRange("ex",x.date));const m=exMetric(all,exType(progEx));const goal=(p.goals||{})[progEx]??null;const g=goal!=null?goalProgress(progEx,goal):null;const best=Math.max(...all.map(m.val));const be1=Math.max(...all.map(x=>x.e1rm));
    html+=`<div class="card span"><div class="card-head" style="flex-wrap:wrap"><div class="card-title"><span class="chip-ic">${icon("fortschritt")}</span><select id="prog-ex" data-c="progex" style="font-weight:700;width:auto;max-width:100%" aria-label="Übung wählen">${names.map(n=>`<option ${n===progEx?"selected":""}>${esc(n)}</option>`).join("")}</select></div>${rangeSeg("ex")}</div>
    <p class="muted small" style="margin:-4px 0 12px">Gemessen: <b>${m.label}</b>${m.plus?" (zusätzlich zum Körpergewicht)":""} · ${TYPES[exType(progEx)].label}</p>
    <div class="kpis" style="margin-bottom:14px"><div class="kpi"><span class="label">Start</span><span class="mid">${fmtVal(m.val(all[0]),m)} <small class="muted">${m.unit}</small></span></div><div class="kpi"><span class="label">Bestwert</span><span class="mid">${fmtVal(best,m)} <small class="muted">${m.unit}</small></span></div>${m.bw?"":`<div class="kpi"><span class="label">1RM ca.</span><span class="mid">${nf(be1,1)} <small class="muted">kg</small></span></div>`}<div class="kpi"><span class="label">Ziel</span><span class="mid">${goal!=null?fmtVal(goal,m):"–"} <small class="muted">${goal!=null?m.unit:""}</small></span></div></div>
    ${g?`<div style="margin-bottom:14px">${bar(g.pct,g.pct>=100?"good":"")}<div class="muted small" style="margin-top:6px">${g.pct>=100?"Ziel erreicht! Zeit für ein neues.":nf(g.pct,0)+" % vom Start zum Ziel · noch "+nf(goal-g.cur,2)+" "+m.unit}</div></div>`:`<p class="muted small">Kein Ziel gesetzt. <a href="#plan">Im Trainingsplan festlegen</a>.</p>`}
    ${lineChart(h.map(x=>({d:x.date,y:m.val(x)})),{goal,unit:m.unit,label:"Verlauf "+progEx,dec:2})}<p class="muted small" style="margin:6px 0 0">Tippe auf die Kurve, um einzelne Werte zu sehen.</p></div>`}
  // Abzeichen
  html+=`<div class="card span">${cardHead("trophy","Abzeichen",`<span class="pill gold">${bs.filter(b=>b.won).length} / ${bs.length}</span>`,"gold")}<div class="badges">${bs.map(b=>`<div class="badge${b.won?" won":""}" title="${esc(b.desc)}"><span class="medal">${icon(b.won?b.ic:"lock")}</span><b>${esc(b.title)}</b><small>${esc(b.desc)}</small>${b.won?"":`<div class="prog">${bar(b.pct)}</div>`}</div>`).join("")}</div></div>`;
  if(wks.length){
    const weeks=[];const ws0=weekStart(iso());for(let i=7;i>=0;i--){const st=addDays(ws0,-7*i),e=addDays(st,7);weeks.push({label:fdate(st,{day:"numeric",month:"numeric"}),tip:"Woche ab "+fdate(st),v:wks.filter(w=>w.date>=st&&w.date<e).reduce((a,w)=>a+wkVolume(w),0)})}
    html+=`<div class="card">${cardHead("zap","Volumen pro Woche",`<span class="muted small">kg × Wdh., inkl. Körpergewicht</span>`)}${barChart(weeks,{unit:"kg",label:"Trainingsvolumen pro Woche"})}</div>`;
    const days=new Set(wks.map(w=>w.date));const start=addDays(weekStart(iso()),-7*15);let cells="";
    for(let i=0;i<16*7;i++){const d=addDays(start,i);cells+=`<i class="${d>iso()?"fut":days.has(d)?"l2":""}" title="${fdate(d,{weekday:"short",day:"2-digit",month:"2-digit"})}${days.has(d)?" · trainiert":""}"></i>`}
    html+=`<div class="card">${cardHead("calendar","Trainingstage",`<span class="muted small">16 Wochen</span>`,"green")}<div class="heat" aria-label="Kalender der Trainingstage">${cells}</div><p class="muted small" style="margin:8px 0 0">Jede Spalte ist eine Woche, oben Montag.</p></div>`;
    html+=`<div class="card span">${cardHead("award","Persönliche Rekorde","","gold")}<div class="tbl-wrap"><table class="data"><thead><tr><th>Übung</th><th>Bestwert</th><th>1RM ca.</th><th>Datum</th></tr></thead><tbody>${names.map(n=>{const {h,m}=metricOf(n);let bi=0;h.forEach((x,i)=>{if(m.val(x)>m.val(h[bi]))bi=i});const b=h[bi];return`<tr><td>${esc(n)}</td><td class="num">${fmtVal(m.val(b),m)} ${m.unit}</td><td>${m.bw?"–":nf(Math.max(...h.map(x=>x.e1rm)),1)}</td><td>${fdate(b.date)}</td></tr>`}).join("")}</tbody></table></div></div>`;
  }
  return html+`</div>`;
}

function viewBody(){
  const b=body(),pr=profile(),cw=currentWeight();const h=(pr.height||0)/100;const bmi=cw&&h?cw/(h*h):null;
  const bmiCat=bmi==null?"":bmi<18.5?"Untergewicht":bmi<25?"Normalgewicht":bmi<30?"Übergewicht":"Adipositas";
  let html=head("koerper","Körperdaten","Körper");
  html+=`<div class="stats" style="margin-bottom:16px"><div class="stat fill"><span class="label">${icon("scale")}Aktuell</span><span class="mid">${cw!=null?nf(cw):"–"} <small>kg</small></span></div><div class="stat"><span class="label">${icon("target")}Ziel</span><span class="mid">${pr.goalWeight?nf(pr.goalWeight):"–"} <small>kg</small></span></div><div class="stat"><span class="label">${icon("koerper")}BMI</span><span class="mid">${bmi?nf(bmi):"–"}</span><span class="muted small">${bmiCat}</span></div></div><div class="grid">`;
  const pts=b.weights.filter(w=>inRange("bw",w.date));
  html+=`<div class="card span"><div class="card-head" style="flex-wrap:wrap"><div class="card-title"><span class="chip-ic violet">${icon("fortschritt")}</span><h3>Gewichtsverlauf</h3></div>${rangeSeg("bw")}</div>${lineChart(pts.map(w=>({d:w.date,y:w.kg})),{goal:pr.goalWeight||null,unit:"kg",label:"Körpergewicht"})}</div>`;
  html+=`<div class="card">${cardHead("plus","Gewicht eintragen","","violet")}<form data-f="weight-add" class="stack" style="gap:10px"><div class="fields"><label class="f">Datum<input id="bw-d" type="date" value="${iso()}" max="${iso()}" required></label><label class="f">Gewicht (kg)<input id="bw-kg" type="number" inputmode="decimal" step="0.1" min="20" max="400" required></label></div><button class="primary wide">Speichern</button></form>
  ${b.weights.length?`<ul class="list" style="margin-top:12px">${b.weights.slice(-6).reverse().map(w=>`<li><span class="grow">${fdate(w.date,{weekday:"short",day:"2-digit",month:"2-digit",year:"numeric"})}</span><span class="num">${nf(w.kg)} kg</span><button class="ghost icon" data-a="bw-del" data-d="${w.date}" aria-label="Eintrag vom ${fdate(w.date)} löschen">${icon("x")}</button></li>`).join("")}</ul>`:""}</div>`;
  const M=[["waist","Taille"],["chest","Brust"],["hip","Hüfte"],["arm","Oberarm"],["thigh","Oberschenkel"],["bf","Körperfett %"]];
  html+=`<div class="card">${cardHead("koerper","Umfänge (cm)","","violet")}<form data-f="measure-add" class="stack" style="gap:10px"><div class="fields" style="grid-template-columns:repeat(auto-fit,minmax(100px,1fr))">${M.map(([k,l])=>`<label class="f">${l}<input id="m-${k}" inputmode="decimal"></label>`).join("")}</div><button class="primary wide">Messung speichern</button></form>`;
  if(b.measures.length){const rows=b.measures.slice(-8).reverse();html+=`<div class="tbl-wrap" style="margin-top:12px"><table class="data"><thead><tr><th>Datum</th>${M.map(m=>`<th>${m[1].replace("Körperfett %","KFA")}</th>`).join("")}<th></th></tr></thead><tbody>${rows.map(r=>`<tr><td>${fdate(r.date)}</td>${M.map(([k])=>`<td>${r[k]!=null?nf(r[k]):"–"}</td>`).join("")}<td><button class="ghost icon" data-a="m-del" data-id="${r.id}" aria-label="Messung löschen">${icon("x")}</button></td></tr>`).join("")}</tbody></table></div>`;
    if(b.measures.length>1){const f=b.measures[0],l=b.measures[b.measures.length-1];const diffs=M.filter(([k])=>f[k]!=null&&l[k]!=null).map(([k,lab])=>`${lab}: ${l[k]-f[k]>0?"+":""}${nf(l[k]-f[k])}`);if(diffs.length)html+=`<p class="muted small">Seit ${fdate(f.date)}: ${esc(diffs.join(" · "))}</p>`}}
  return html+`</div></div>`;
}

function viewTools(){
  const pr=profile();
  return head("tools","Rechner","Tools")+`<div class="grid">
  <div class="card">${cardHead("zap","1RM-Rechner")}<p class="muted small" style="margin-top:-6px">Schätzt dein Maximalgewicht für eine Wiederholung (Epley-Formel).</p><div class="fields"><label class="f">Gewicht (kg)<input id="orm-w" inputmode="decimal" data-i="orm" value="80"></label><label class="f">Wiederholungen<input id="orm-r" inputmode="numeric" data-i="orm" value="5"></label></div><div id="orm-out" style="margin-top:14px">${ormOut(80,5)}</div></div>
  <div class="card">${cardHead("training","Scheibenrechner")}<p class="muted small" style="margin-top:-6px">Welche Scheiben kommen auf jede Seite?</p><div class="fields"><label class="f">Zielgewicht (kg)<input id="pl-t" inputmode="decimal" data-i="plates" value="100"></label><label class="f">Stange (kg)<select id="pl-b" data-i="plates"><option>20</option><option>15</option><option>10</option></select></label></div><div id="pl-out" style="margin-top:14px">${platesOut(100,20)}</div></div>
  <div class="card">${cardHead("timer","Pausentimer","","blue")}<p class="muted small" style="margin-top:-6px">Am Ende gibt's einen Ton und eine Vibration.</p><div class="row">${[60,90,120,180,240].map(s=>`<button class="sm" data-a="rest" data-s="${s}">${s<120?s+" s":s/60+" min"}</button>`).join("")}</div><label class="f" style="margin-top:14px">Standardpause im Training (Sekunden)<input id="p-rest" inputmode="numeric" data-c="prof" data-k="rest" value="${pr.rest||90}" style="max-width:140px"></label></div>
  <div class="card">${cardHead("target","Wiederholungen & Intensität","","green")}<div class="tbl-wrap"><table class="data"><thead><tr><th>Ziel</th><th>% vom 1RM</th><th>Wdh.</th></tr></thead><tbody><tr><td>Maximalkraft</td><td>85–100</td><td>1–5</td></tr><tr><td>Muskelaufbau</td><td>65–85</td><td>6–12</td></tr><tr><td>Kraftausdauer</td><td>50–65</td><td>15+</td></tr></tbody></table></div></div>
  <div class="card span">${cardHead("fortschritt","Calisthenics-Progressionen","","green")}<p class="muted small" style="margin-top:-6px">Von leicht nach schwer. Wechsle zur nächsten Stufe, wenn du 3 Sätze mit 12–15 sauberen Wiederholungen (oder 30–60 s Haltezeit) schaffst. Danach wird es mit Zusatzgewicht weiter schwerer.</p>
  <div class="prog-ladders">${PROGRESSIONS.map(([n,steps])=>`<div class="ladder"><b>${esc(n)}</b><ol>${steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div>`).join("")}</div></div>
  <div class="card">${cardHead("training","Kettlebell-Startgewichte","","blue")}<div class="tbl-wrap"><table class="data"><thead><tr><th>Übung</th><th>Einstieg</th><th>Fortgeschritten</th></tr></thead><tbody><tr><td>Swing</td><td>12–16 kg</td><td>24–32 kg</td></tr><tr><td>Goblet Squat</td><td>8–16 kg</td><td>20–28 kg</td></tr><tr><td>Turkish Get-up</td><td>6–8 kg</td><td>16–24 kg</td></tr><tr><td>Clean &amp; Press</td><td>6–12 kg</td><td>16–24 kg</td></tr></tbody></table></div><p class="muted small" style="margin:8px 0 0">Grobe Richtwerte. Saubere Technik geht vor Gewicht.</p></div>
  </div>`;
}
function ormOut(w,r){if(!w||!r||r>30)return`<div class="muted">Gib Gewicht und 1–30 Wiederholungen ein.</div>`;const one=e1rm(w,r);
  return`<div class="row" style="align-items:baseline;gap:8px"><span class="big">${nf(one,1)}</span><span class="muted">kg geschätztes 1RM</span></div><div class="tbl-wrap" style="margin-top:8px"><table class="data"><thead><tr><th>%</th><th>kg</th><th>≈ Wdh.</th></tr></thead><tbody>${[95,90,85,80,75,70,65,60].map(p=>`<tr><td>${p} %</td><td>${nf(Math.round(one*p/100/1.25)*1.25,2)}</td><td>${Math.max(1,Math.round((100/p-1)*30))}</td></tr>`).join("")}</tbody></table></div>`}
function platesOut(t,b){if(!t||t<b)return`<div class="muted">Das Zielgewicht muss mindestens so schwer wie die Stange sein.</div>`;
  let side=(t-b)/2;const out=[];for(const p of [25,20,15,10,5,2.5,1.25]){while(side>=p-1e-9){out.push(p);side-=p}}
  return`<div class="row">${out.length?out.map(p=>`<span class="pill accent" style="font-size:1rem;padding:8px 14px">${nf(p,2)}</span>`).join(""):`<span class="muted">Nur die Stange.</span>`}</div><p class="muted small" style="margin:8px 0 0">pro Seite${side>0.01?` · ${nf(side*2,2)} kg lassen sich nicht exakt stecken`:""}</p>`}

function installCard(){
  if(isStandalone())return"";
  if(installEvt)return`<div class="card">${cardHead("download","Als App installieren")}<p class="muted small" style="margin-top:-6px">Startet wie eine normale App vom Startbildschirm und funktioniert offline.</p><button class="primary wide" data-a="install">${icon("download")}Installieren</button></div>`;
  if(isIOS())return`<div class="card">${cardHead("download","Auf den Home-Bildschirm")}<p class="muted small" style="margin:0">In Safari unten auf <b>Teilen</b> tippen (Quadrat mit Pfeil) und <b>„Zum Home-Bildschirm“</b> wählen. Danach startet Repwerk wie eine App.</p></div>`;
  return"";
}
function viewProfile(){
  const p=profile(),t=targets(),th=settings.theme||"system";
  const f=(k,l,v,extra="")=>`<label class="f">${l}<input id="p-${k}" data-c="prof" data-k="${k}" value="${esc(v??"")}" ${extra}></label>`;
  return head("profil","Einstellungen","Profil &amp; Ziele")+`<div class="grid">
  <div class="card">${cardHead("profil","Über dich")}<div class="fields"><label class="f">Geschlecht<select id="p-sex" data-c="prof" data-k="sex"><option value="m" ${p.sex==="m"?"selected":""}>männlich</option><option value="w" ${p.sex==="w"?"selected":""}>weiblich</option></select></label>${f("age","Alter",p.age,'inputmode="numeric"')}${f("height","Größe (cm)",p.height,'inputmode="numeric"')}${currentWeight()==null?f("weight","Gewicht (kg)",p.weight,'inputmode="decimal"'):`<label class="f">Gewicht (kg)<input value="${nf(currentWeight())}" disabled title="Kommt aus deinem letzten Eintrag unter Körper"></label>`}</div>
  <label class="f" style="margin-top:10px">Aktivität<select id="p-activity" data-c="prof" data-k="activity">${ACTIVITY.map(([v,l])=>`<option value="${v}" ${+p.activity===v?"selected":""}>${l}</option>`).join("")}</select></label></div>
  <div class="card">${cardHead("target","Dein Ziel","","green")}<label class="f">Ziel<select id="p-goal" data-c="prof" data-k="goal"><option value="cut" ${p.goal==="cut"?"selected":""}>Abnehmen (−450 kcal)</option><option value="maintain" ${p.goal==="maintain"?"selected":""}>Gewicht halten</option><option value="bulk" ${p.goal==="bulk"?"selected":""}>Muskelaufbau (+300 kcal)</option></select></label><div class="fields" style="margin-top:10px">${f("goalWeight","Zielgewicht (kg)",p.goalWeight,'inputmode="decimal"')}${f("water","Wasser/Tag (ml)",p.water,'inputmode="numeric"')}${f("kcal","Eigenes kcal-Ziel",p.kcal,'inputmode="numeric" placeholder="automatisch"')}</div></div>
  <div class="card">${cardHead("zap","Dein Bedarf")}<div class="kpis"><div class="kpi"><span class="label">Grundumsatz</span><span class="mid">${nf(t.bmr,0)}</span><span class="muted small">kcal</span></div><div class="kpi"><span class="label">Gesamt</span><span class="mid">${nf(t.tdee,0)}</span><span class="muted small">kcal</span></div><div class="kpi"><span class="label">Tagesziel</span><span class="mid" style="color:var(--primary-text)">${nf(t.kcal,0)}</span><span class="muted small">kcal</span></div></div>
  <ul class="list" style="margin-top:12px"><li><span>Eiweiß</span><span class="num">${t.protein} g</span></li><li><span>Kohlenhydrate</span><span class="num">${t.carbs} g</span></li><li><span>Fett</span><span class="num">${t.fat} g</span></li></ul><p class="muted small" style="margin:8px 0 0">Berechnet nach Mifflin-St Jeor. Richtwerte: Wenn sich dein Gewicht nach 2–3 Wochen anders entwickelt als geplant, passe das Ziel an.</p></div>
  <div class="card">${cardHead("sun","Darstellung","","blue")}<div class="seg" role="group" aria-label="Farbschema">${[["system","Automatisch"],["light","Hell"],["dark","Dunkel"]].map(([k,l])=>`<button data-a="theme" data-t="${k}" aria-pressed="${th===k}">${l}</button>`).join("")}</div><p class="muted small" style="margin:10px 0 0">„Automatisch“ folgt der Einstellung deines Handys.</p></div>
  ${installCard()}
  <div class="card">${cardHead("download","Daten & Backup","","violet")}<p class="muted small" style="margin-top:-6px">Alles liegt nur auf diesem Gerät. Sichere ab und zu ein Backup, zum Beispiel bevor du das Handy wechselst.</p>
  <div class="row"><button class="primary" data-a="export">${icon("download")}Backup speichern</button><button data-a="import">${icon("upload")}Backup laden</button><input id="import-file" type="file" accept="application/json,.json" hidden></div>
  <div class="row" style="margin-top:12px"><button class="ghost sm" data-a="sample" ${hasData()?'data-confirm="Daten überschreiben?"':""}>Beispieldaten laden</button><button class="ghost danger sm" data-a="wipe" data-confirm="Wirklich alles löschen?">Alle Daten löschen</button></div></div>
  </div>`;
}

/* ---------- Render ---------- */
function render(){
  pendingRender=false;
  let r=location.hash.slice(1);r=ALIAS[r]||r;const prev=route;route=ROUTES.some(x=>x[0]===r)?r:"heute";
  $("#tabs").innerHTML=ROUTES.map(([k,l])=>`<a href="#${k}" ${k===route?'aria-current="page"':""}>${icon(k)}<span>${l}</span>${k==="training"&&active?'<span class="live" aria-label="Training läuft"></span>':""}</a>`).join("");
  const s=hasData()?stats():null;
  $("#brand-stat").innerHTML=s&&s.weekStreak?`<span class="pill accent" title="Wochen-Serie">${icon("flame")}${s.weekStreak}</span>`:"";
  const v={heute:viewHeute,training:viewTraining,plan:viewPlan,ernaehrung:viewFood,fortschritt:viewProgress,koerper:viewBody,tools:viewTools,profil:viewProfile}[route];
  const m=$("#main");const sy=scrollY;chartN=0;for(const k in CH)delete CH[k];m.innerHTML=v();
  if(prev!==route){m.classList.remove("enter");void m.offsetWidth;m.classList.add("enter");const a=document.querySelector('#tabs a[aria-current]');a&&a.scrollIntoView({inline:"nearest",block:"nearest"})}else scrollTo(0,sy);
  renderRest();
}
addEventListener("hashchange",()=>{render();scrollTo(0,0)});

/* ---------- Training ---------- */
function startSession(dayId){
  const d=plan().days.find(x=>x.id===dayId);
  active={start:Date.now(),dayId:d?d.id:null,dayName:d?d.name:"Freies Training",notes:"",exercises:(d?d.exercises:[]).filter(e=>e.name).map(e=>mkEx(e.name,e))};
  saveActive();buzz(20);location.hash="training";render();
}
function mkEx(name,e){
  const last=lastSets(name);const n=e?(+e.sets||3):(last?last.sets.length:3);const tr=e?firstNum(e.reps):(last?last.sets[0].r:null);
  const type=(e&&TYPES[e.type]&&e.type)||exType(name);const T=TYPES[type];
  return{name,type,target:e?`${e.sets}×${e.reps}${T.u}${wText(+e.weight,T)}`:"",sets:Array.from({length:n},(_,i)=>{const ls=last&&last.sets[Math.min(i,last.sets.length-1)];return{w:ls&&ls.w?String(ls.w):(e&&+e.weight?String(e.weight):""),r:"",tr,done:false}})};
}
function finishSession(){
  const a=active;const exs=a.exercises.map(e=>({name:e.name,type:e.type||exType(e.name),sets:e.sets.filter(s=>num(s.r)>0).map(s=>({w:num(s.w)||0,r:Math.round(num(s.r))}))})).filter(e=>e.sets.length);
  if(!exs.length){toast("Trag mindestens einen Satz mit Wiederholungen ein.");return}
  const date=iso(new Date(a.start));
  // Rekord: gleiche Messgröße wie im Fortschritt (kg bzw. Zusatz-kg, sonst Wdh./Sek.)
  const prs=[];for(const e of exs){const h=exHistory(e.name);if(!h.length)continue;const m=exMetric(h,e.type);const prev=Math.max(...h.map(m.val));
    const nowW=Math.max(...e.sets.map(s=>s.w)),nowR=Math.max(...e.sets.map(s=>s.r));
    if(m.kg&&nowW>prev)prs.push(`${e.name}: ${fmtVal(nowW,m)} ${m.unit}`);
    else if(!m.kg&&nowR>prev)prs.push(`${e.name}: ${nowR} ${m.unit}`);
    else if(!m.kg&&nowW>0&&(e.type==="bw"||e.type==="hold"))prs.push(`${e.name}: erstmals mit +${nf(nowW,2)} kg`)}
  const w={id:uid(),date,dayId:a.dayId,dayName:a.dayName,start:a.start,duration:Math.max(1,Math.round((Date.now()-a.start)/60000)),notes:a.notes||"",exercises:exs};
  update("w-"+date.slice(0,7),d=>{d.items.push(w)},false);
  active=null;saveActive();rest=null;buzz([30,60,30]);location.hash="heute";render();
  toast("Training gespeichert. Stark!");checkBadges(prs.map(p=>"Neuer Rekord · "+p));
}
function startRest(s){rest={end:Date.now()+s*1000,total:s};try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();audioCtx.resume&&audioCtx.resume()}catch(e){}renderRest()}
function renderRest(){
  const el=$("#restpill");if(!rest){el.hidden=true;return}
  const left=Math.ceil((rest.end-Date.now())/1000);
  if(left<=0){rest=null;el.hidden=true;beep();toast("Pause vorbei, nächster Satz!");return}
  if(el.hidden||!el.querySelector(".num")){el.innerHTML=`<span class="small">Pause</span><span class="num" id="rest-left" aria-live="off"></span><button data-a="rest-add">+30 s</button><button data-a="rest-stop">Stopp</button>`;el.hidden=false}
  el.querySelector("#rest-left").textContent=Math.floor(left/60)+":"+pad(left%60);
}
function beep(){buzz([200,100,200]);if(!audioCtx)return;try{[0,.25,.5].forEach(t=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=880;g.gain.setValueAtTime(.0001,audioCtx.currentTime+t);g.gain.exponentialRampToValueAtTime(.3,audioCtx.currentTime+t+.02);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+t+.18);o.connect(g).connect(audioCtx.destination);o.start(audioCtx.currentTime+t);o.stop(audioCtx.currentTime+t+.2)})}catch(e){}}
setInterval(()=>{if(rest)renderRest();const e=$("#elapsed");if(e)e.textContent=elapsed()},1000);

/* ---------- Beispieldaten ---------- */
function loadSample(){
  for(const k of Object.keys(docs))put(k,null);
  const today=iso();
  put("profile",{...defaults("profile"),sex:"m",age:29,height:182,weight:84,activity:1.55,goal:"cut",goalWeight:79,water:3000});
  const days=mkPlanDays(TEMPLATES.ppl);
  put("plan",{days,weekly:3,goals:{"Bankdrücken":80,"Kniebeuge":100,"Klimmzüge":12,"Schulterdrücken":45}});
  const months={};const ws=weekStart(today);let k=0;
  for(let wk=5;wk>=0;wk--){for(const d of days){const date=addDays(addDays(ws,-7*wk),(d.weekday+6)%7);if(date>=today)continue;if(wk===3&&d.name==="Pull")continue;k++;
    const prog=5-wk;const exs=d.exercises.map(e=>{const bw=!e.weight;const base=bw?firstNum(e.reps):e.weight;const w=bw?0:base+prog*2.5*(e.weight>=50?1:.5);const r=bw?Math.min(12,base+Math.floor(prog/1.5)):firstNum(e.reps);
      return{name:e.name,type:e.type,sets:Array.from({length:e.sets},(_,i)=>({w,r:Math.max(1,r-(i===e.sets-1?1:0))}))}});
    const m="w-"+date.slice(0,7);(months[m]=months[m]||{items:[]}).items.push({id:uid(),date,dayId:d.id,dayName:d.name,start:parseISO(date).getTime()+18*36e5,duration:55+((k*7)%20),notes:"",exercises:exs})}}
  for(const m in months)put(m,months[m]);
  const weights=[];for(let i=35;i>=0;i-=3)weights.push({date:addDays(today,-i),kg:Math.round((84-(35-i)*.075+((i*13)%5-2)*.12)*10)/10});
  put("body",{weights,measures:[{id:uid(),date:addDays(today,-35),waist:91,chest:104,hip:100,arm:36,thigh:59,bf:21},{id:uid(),date:addDays(today,-7),waist:88.5,chest:103,hip:98.5,arm:36.5,thigh:58.5,bf:19.5}]});
  const mk=(name,g,meal)=>{const f=findFood(name);const x=g/100;return{id:uid(),name,g,meal,kcal:Math.round(f[1]*x),p:+(f[2]*x).toFixed(1),c:+(f[3]*x).toFixed(1),f:+(f[4]*x).toFixed(1)}};
  for(let i=6;i>=0;i--){const d=addDays(today,-i);const items=[mk("Haferflocken",70,"Frühstück"),mk("Milch 1,5 %",250,"Frühstück"),mk("Banane",120,"Frühstück"),mk("Hähnchenbrust (roh)",180,"Mittagessen"),mk("Reis (gekocht)",220+(i%3)*40,"Mittagessen"),mk("Brokkoli",200,"Mittagessen"),mk("Skyr",250,"Snacks")];
    if(i>0)items.push(mk("Lachs",125,"Abendessen"),mk("Kartoffeln",300,"Abendessen"),mk(i%2?"Mandeln":"Dunkle Schokolade 70 %",30,"Snacks"));
    put("f-"+d,{items,water:i?2500+((i*250)%750):1250})}
  put("badges",{seen:badgeState().filter(b=>b.won).map(b=>b.id)});
  location.hash="heute";render();toast("Beispieldaten geladen. Unter Profil kannst du sie wieder löschen.");
}

/* ---------- Backup ---------- */
function exportBackup(){
  const data={};for(const k in docs)if(docs[k])data[k]=docs[k];
  const blob=new Blob([JSON.stringify({app:"repwerk",v:1,exported:new Date().toISOString(),data},null,1)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="repwerk-backup-"+iso()+".json";document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);toast("Backup gespeichert.");
}
function importBackup(file){
  const rd=new FileReader();rd.onload=()=>{let obj;try{obj=JSON.parse(rd.result)}catch(e){toast("Die Datei ist kein gültiges Backup.");return}
    if(!obj||!["repwerk","satzbuch"].includes(obj.app)||typeof obj.data!=="object"){toast("Diese Datei stammt nicht aus Repwerk.");return}
    for(const k of Object.keys(docs))put(k,null);
    for(const k in obj.data)if(/^(profile|plan|body|foods|badges|w-\d{4}-\d{2}|f-\d{4}-\d{2}-\d{2})$/.test(k))put(k,obj.data[k]);
    if(!docs.badges)put("badges",{seen:badgeState().filter(b=>b.won).map(b=>b.id)});
    render();toast("Backup geladen.")};
  rd.readAsText(file);
}

/* ---------- Ereignisse ---------- */
const actions={
  go:el=>{location.hash=el.dataset.to},
  start:el=>{if(active){toast("Es läuft schon ein Training. Beende oder verwirf es zuerst.");location.hash="training";return}startSession(el.dataset.day||null)},
  "set-done":el=>{syncSessionInputs();const ex=active.exercises[+el.dataset.ex];const s=ex.sets[+el.dataset.set];s.done=!s.done;
    if(s.done){if(s.r===""&&s.tr!=null)s.r=String(s.tr);if(s.w===""){const prev=ex.sets[+el.dataset.set-1];if(prev&&prev.w!=="")s.w=prev.w}buzz(25);startRest(profile().rest||90)}
    saveActive();render()},
  "set-add":el=>{syncSessionInputs();const ex=active.exercises[+el.dataset.ex];const l=ex.sets[ex.sets.length-1]||{w:"",r:"",tr:null};ex.sets.push({w:l.w,r:"",tr:l.tr??(num(l.r)||null),done:false});saveActive();render()},
  "set-del":el=>{syncSessionInputs();active.exercises[+el.dataset.ex].sets.pop();saveActive();render()},
  "ex-del":el=>{syncSessionInputs();active.exercises.splice(+el.dataset.ex,1);saveActive();render()},
  "session-finish":()=>{syncSessionInputs();finishSession()},
  "session-discard":()=>{active=null;saveActive();rest=null;render();toast("Training verworfen.")},
  rest:el=>startRest(+el.dataset.s),
  "rest-add":()=>{if(rest){rest.end+=30000;renderRest()}},
  "rest-stop":()=>{rest=null;renderRest()},
  "wk-del":el=>update(el.dataset.key,d=>{d.items=d.items.filter(x=>x.id!==el.dataset.id)}),
  tpl:el=>{const t=TEMPLATES[el.dataset.t];update("plan",p=>{p.days=mkPlanDays(t);p.weekly=t.days.length});toast("Vorlage übernommen. Passe die Gewichte an dein Niveau an.")},
  "day-add":()=>update("plan",p=>{p.days.push({id:uid(),name:"Trainingstag "+(p.days.length+1),weekday:null,exercises:[{id:uid(),name:"",sets:3,reps:"10",weight:""}]})}),
  "day-del":el=>update("plan",p=>{p.days=p.days.filter(d=>d.id!==el.dataset.day)}),
  "pex-add":el=>{update("plan",p=>{p.days.find(d=>d.id===el.dataset.day).exercises.push({id:uid(),name:"",sets:3,reps:"10",weight:""})});const ins=document.querySelectorAll(`[data-day="${el.dataset.day}"][data-k="name"][data-c="pex"]`);ins.length&&ins[ins.length-1].focus()},
  "pex-del":el=>update("plan",p=>{const d=p.days.find(d=>d.id===el.dataset.day);d.exercises=d.exercises.filter(e=>e.id!==el.dataset.ex)}),
  water:el=>{buzz(10);update("f-"+el.dataset.d,d=>{d.water=Math.max(0,(d.water||0)+(+el.dataset.ml))});checkBadges()},
  fday:el=>{const n=+el.dataset.n;foodDate=n===0?iso():addDays(foodDate,n);if(foodDate>iso())foodDate=iso();render()},
  "food-del":el=>update("f-"+foodDate,d=>{d.items=d.items.filter(i=>i.id!==el.dataset.id)}),
  "food-re":el=>{const r=recentFoods()[+el.dataset.i];if(!r)return;buzz(10);update("f-"+foodDate,d=>{d.items.push({...r,id:uid(),meal:foodDate===iso()?defaultMeal():r.meal})});toast(r.name+" hinzugefügt.");checkBadges()},
  "bw-del":el=>update("body",b=>{b.weights=b.weights.filter(w=>w.date!==el.dataset.d)}),
  "m-del":el=>update("body",b=>{b.measures=b.measures.filter(m=>m.id!==el.dataset.id)}),
  libcat:el=>{libCat=el.dataset.c2;document.querySelectorAll('[data-a="libcat"]').forEach(b=>{const on=b.dataset.c2===libCat;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});$("#lib-list").innerHTML=libList()},
  "lib-add":el=>{const n=el.dataset.n,ty=typeOf(n);let target=$("#lib-day")?.value||libDay;
    update("plan",p=>{let d=p.days.find(x=>x.id===target);if(!d){d={id:uid(),name:"Trainingstag "+(p.days.length+1),weekday:null,exercises:[]};p.days.push(d)}
      target=d.id;d.exercises.push({id:uid(),name:n,type:ty,sets:3,reps:ty==="hold"||ty==="wt"?"30":ty==="time"?"20":"10",weight:""})},false);
    libDay=target;buzz(10);toast(n+" zu „"+(plan().days.find(x=>x.id===target)?.name||"Plan")+"“ hinzugefügt.");render()},
  range:el=>{settings["range_"+el.dataset.key]=el.dataset.v;saveSettings();render()},
  "cel-close":()=>{$("#celebrate").hidden=true},
  "secret-apply":()=>{const t=secretTpl;if(!t)return;update("plan",p=>{p.days=mkPlanDays(t);p.weekly=t.days.length},false);$("#celebrate").hidden=true;secretTpl=null;location.hash="plan";render();buzz([30,60,30]);toast("„"+t.label+"“ ist jetzt dein Trainingsplan.")},
  sample:()=>loadSample(),
  wipe:()=>{for(const k of Object.keys(docs))put(k,null);active=null;saveActive();location.hash="heute";render();toast("Alle Daten gelöscht.")},
  export:()=>exportBackup(),
  import:()=>$("#import-file").click(),
  theme:el=>{settings.theme=el.dataset.t;saveSettings();applyTheme();render()},
  install:async()=>{if(!installEvt)return;installEvt.prompt();try{await installEvt.userChoice}catch(e){}installEvt=null;render()},
  "sw-update":()=>{if(swWaiting)swWaiting.postMessage("skipWaiting")}
};
function syncSessionInputs(){if(!active)return;document.querySelectorAll('[data-c="set"]').forEach(inp=>{const s=active.exercises[+inp.dataset.ex]?.sets[+inp.dataset.set];if(s)s[inp.dataset.k]=inp.value.trim()})}
function arm(el){el.dataset.armed="1";el._t=el.innerHTML;el.textContent=el.dataset.confirm;el.classList.add("armed");buzz(15);setTimeout(()=>{if(el.isConnected&&el.dataset.armed){delete el.dataset.armed;el.innerHTML=el._t;el.classList.remove("armed")}},3500)}
document.addEventListener("click",e=>{
  if(e.target.id==="celebrate"){e.target.hidden=true;return}
  const el=e.target.closest("[data-a]");if(!el)return;e.preventDefault();if(el.dataset.confirm&&!el.dataset.armed){arm(el);return}actions[el.dataset.a]?.(el,e)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#celebrate").hidden)$("#celebrate").hidden=true});

const changes={
  set:el=>{const s=active?.exercises[+el.dataset.ex]?.sets[+el.dataset.set];if(s){s[el.dataset.k]=el.value.trim();saveActive()}},
  notes:el=>{if(active){active.notes=el.value;saveActive()}},
  weekly:el=>update("plan",p=>{p.weekly=+el.value}),
  day:el=>update("plan",p=>{const d=p.days.find(x=>x.id===el.dataset.day);if(!d)return;d[el.dataset.k]=el.dataset.k==="weekday"?(el.value===""?null:+el.value):el.value.trim()},false),
  pex:el=>update("plan",p=>{const d=p.days.find(x=>x.id===el.dataset.day);const ex=d&&d.exercises.find(x=>x.id===el.dataset.ex);if(!ex)return;const k=el.dataset.k;
    if(k==="name"){const old=ex.name;ex.name=el.value.trim();const l=libOf(ex.name);if(l)ex.type=l[1];if(old&&p.goals&&p.goals[old]!=null&&!p.days.some(dd=>dd.exercises.some(e=>e!==ex&&e.name===old))){p.goals[ex.name]=p.goals[old];delete p.goals[old]}}
    else if(k==="type")ex.type=el.value;
    else if(k==="sets")ex.sets=Math.max(1,Math.round(num(el.value)||1));else if(k==="reps")ex.reps=el.value.trim()||"10";else ex.weight=num(el.value)??""},false),
  goal:el=>{update("plan",p=>{p.goals=p.goals||{};const v=num(el.value);if(v==null)delete p.goals[el.dataset.name];else p.goals[el.dataset.name]=v},false);checkBadges()},
  progex:el=>{progEx=el.value;render()},
  libday:el=>{libDay=el.value},
  prof:el=>update("profile",p=>{const k=el.dataset.k;if(k==="sex"||k==="goal")p[k]=el.value;else{const v=num(el.value);p[k]=(k==="kcal"||k==="goalWeight")?(v||null):(v??p[k])}},false)
};
document.addEventListener("change",e=>{
  if(e.target.id==="import-file"){const f=e.target.files&&e.target.files[0];if(f)importBackup(f);e.target.value="";return}
  const el=e.target.closest("[data-c]");if(!el)return;changes[el.dataset.c]?.(el,e);if(!["set","notes"].includes(el.dataset.c))requestRender()});
document.addEventListener("input",e=>{const el=e.target;
  if(el.dataset.i==="libq"){libQ=el.value;$("#lib-list").innerHTML=libList();return}
  if(el.dataset.i==="orm")$("#orm-out").innerHTML=ormOut(num($("#orm-w").value),Math.round(num($("#orm-r").value)||0));
  if(el.dataset.i==="plates")$("#pl-out").innerHTML=platesOut(num($("#pl-t").value),num($("#pl-b").value));
  if(el.dataset.i==="food"){const f=findFood($("#f-name").value);const hint=$("#f-hint");if(!f){hint.textContent="Unbekanntes Lebensmittel: trag die Nährwerte selbst ein.";return}
    if(el.id==="f-name"&&!$("#f-g").value)$("#f-g").value=f[5];const g=num($("#f-g").value)||100,x=g/100;
    $("#f-k").value=Math.round(f[1]*x);$("#f-p").value=+(f[2]*x).toFixed(1);$("#f-c").value=+(f[3]*x).toFixed(1);$("#f-f").value=+(f[4]*x).toFixed(1);hint.textContent=`${f[0]}: ${f[1]} kcal je 100 g`}
});
const forms={
  "weight-quick":()=>{const kg=num($("#wq").value);if(!kg||kg<20||kg>400){toast("Gib ein Gewicht zwischen 20 und 400 kg ein.");return}addWeight(iso(),kg)},
  "weight-add":()=>{const kg=num($("#bw-kg").value),d=$("#bw-d").value;if(!kg||!d){toast("Datum und Gewicht ausfüllen.");return}addWeight(d,kg)},
  "measure-add":()=>{const m={id:uid(),date:iso()};let any=false;for(const k of["waist","chest","hip","arm","thigh","bf"]){const v=num($("#m-"+k).value);if(v!=null){m[k]=v;any=true}}if(!any){toast("Trag mindestens einen Wert ein.");return}update("body",b=>{b.measures.push(m)});toast("Messung gespeichert.")},
  "ex-add":()=>{const n=$("#new-ex").value.trim();if(!n)return;syncSessionInputs();active.exercises.push(mkEx(n,null));saveActive();render()},
  "food-add":()=>{const name=$("#f-name").value.trim(),kcal=num($("#f-k").value);if(!name||kcal==null){toast("Name und Kalorien sind nötig.");return}
    const it={id:uid(),name,g:num($("#f-g").value),meal:$("#f-meal").value,kcal:Math.round(kcal),p:num($("#f-p").value)||0,c:num($("#f-c").value)||0,f:num($("#f-f").value)||0};
    if($("#f-save").checked&&!FOODS.some(f=>norm(f[0])===norm(name))){const g=it.g||100,x=100/g;update("foods",fd=>{fd.custom=fd.custom.filter(c=>norm(c.name)!==norm(name));fd.custom.unshift({name,kcal:Math.round(it.kcal*x),p:+(it.p*x).toFixed(1),c:+(it.c*x).toFixed(1),f:+(it.f*x).toFixed(1),por:g})},false)}
    buzz(10);update("f-"+foodDate,d=>{d.items.push(it)});toast(name+" eingetragen.");checkBadges()}
};
forms.secret=async()=>{
  const inp=$("#secret-code"),msg=$("#secret-msg"),btn=$("#secret-go");const code=inp.value.trim();if(!code)return;
  btn.disabled=true;msg.textContent="Prüfe …";
  try{secretTpl=await unlockSecret(code)}catch(e){secretTpl=null}
  btn.disabled=false;
  if(!secretTpl){msg.textContent="Falscher Code.";inp.value="";inp.focus();buzz([80,40,80]);return}
  const t=secretTpl,has=plan().days.length;
  $("#celebrate").innerHTML=`<div class="card"><div class="medal">${icon("star")}</div><h3 id="cel-title">${esc(t.label)}</h3><p class="muted" style="margin:0 0 6px">${esc(t.sub)}</p><p class="small" style="text-align:left;margin:12px 0">${esc(t.note)}</p><ul>${t.days.map(([n,wd,exs])=>`<li>${icon("calendar")}<span><b>${esc(n)}</b><br><span class="muted small">${WD_LONG[wd]} · ${exs.length} Übungen</span></span></li>`).join("")}</ul><button class="primary wide" data-a="secret-apply" ${has?'data-confirm="Aktuellen Plan ersetzen?"':""}>Als Trainingsplan übernehmen</button><button class="ghost wide" style="margin-top:8px" data-a="cel-close">Abbrechen</button></div>`;
};
function openSecret(){
  const el=$("#celebrate");
  el.innerHTML=`<div class="card"><div class="medal">${icon("lock")}</div><h3 id="cel-title">Geheime Vorlage</h3><p class="muted" style="margin:0 0 16px">Gib den Code ein.</p><form data-f="secret" class="stack" style="gap:10px" autocomplete="off"><input id="secret-code" type="password" inputmode="numeric" maxlength="12" aria-label="Code" style="text-align:center;font-size:1.4rem;letter-spacing:.4em"><p id="secret-msg" class="small" role="status" style="margin:0;min-height:1.2em;color:var(--danger)"></p><button id="secret-go" class="primary wide">Freischalten</button><button type="button" class="ghost wide" data-a="cel-close">Abbrechen</button></form></div>`;
  el.hidden=false;setTimeout(()=>$("#secret-code").focus(),50);
}
// 5× schnell aufs Logo tippen öffnet die Code-Abfrage
let logoTaps=[];
document.addEventListener("pointerdown",e=>{if(!e.target.closest(".brand h1")||!$("#celebrate").hidden)return;const now=Date.now();logoTaps=logoTaps.filter(t=>now-t<3000);logoTaps.push(now);if(logoTaps.length>=5){logoTaps=[];buzz(30);openSecret()}});
function addWeight(date,kg){update("body",b=>{b.weights=b.weights.filter(w=>w.date!==date);b.weights.push({date,kg});b.weights.sort((a,c)=>a.date<c.date?-1:1)});toast("Gewicht gespeichert.");checkBadges()}
document.addEventListener("submit",e=>{const f=e.target.closest("[data-f]");if(!f)return;e.preventDefault();forms[f.dataset.f]?.()});

/* ---------- App-Start ---------- */
addEventListener("beforeinstallprompt",e=>{e.preventDefault();installEvt=e;if(route==="profil")render()});
addEventListener("appinstalled",()=>{installEvt=null;toast("Repwerk ist installiert.")});
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",applyTheme);
if("serviceWorker" in navigator&&location.protocol!=="file:"){
  navigator.serviceWorker.register("sw.js").then(reg=>{
    const track=w=>{if(!w)return;w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller){swWaiting=w;render()}})};
    if(reg.waiting&&navigator.serviceWorker.controller){swWaiting=reg.waiting}
    reg.addEventListener("updatefound",()=>track(reg.installing));
  }).catch(()=>{});
  let reloaded=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!reloaded&&swWaiting){reloaded=true;location.reload()}});
}
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
applyTheme();loadAll();if(hasData()&&!docs.badges)put("badges",{seen:badgeState().filter(b=>b.won).map(b=>b.id)});render();keepAwake();
