const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Professor Gaurav';
pres.title = 'Fundamentals of Ornamental Horticulture & Landscaping';

// --- Global Theme Constants ---
const COLORS = {
    bg: "F8F6F2",
    text_dark: "1A1A1A",
    text_muted: "4A5D52",
    accent: "D97757",
    hindi: "A97D50",
    white: "FFFFFF",
    shadow: "000000"
};

const FONTS = {
    header: "Georgia",
    body: "Arial"
};

// --- Helper: Add Card ---
function addCard(slide, opts) {
    // Drop Shadow (Simulated via multiple slightly offset rectangles or native shadow)
    slide.addShape(pres.shapes.RECTANGLE, {
        x: opts.x, y: opts.y, w: opts.w, h: opts.h,
        fill: { color: COLORS.white },
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 5, offset: 3, angle: 135 },
        line: { color: 'E8E6DC', width: 1 }
    });

    // Header Bar
    slide.addShape(pres.shapes.RECTANGLE, {
        x: opts.x, y: opts.y, w: opts.w, h: 0.08,
        fill: { color: opts.accent || COLORS.accent }
    });
}

// --- Slide 1: Title Slide (Elite Cover) ---
let s1 = pres.addSlide();
s1.background = { color: COLORS.bg };
s1.addImage({ 
    path: "https://images.unsplash.com/photo-1558905619-171426efb452?auto=format&fit=crop&q=80&w=1000", 
    x: 0, y: 0, w: 10, h: 5.625, sizing: { type: 'cover' }, transparency: 70 
});

// Centered Content Block
s1.addShape(pres.shapes.RECTANGLE, { x: 1, y: 1.5, w: 8, h: 2.5, fill: { color: COLORS.white, transparency: 10 }, shadow: { type: 'outer', opacity: 0.1 } });

s1.addText("FUNDAMENTALS OF ORNAMENTAL\nHORTICULTURE & LANDSCAPING", {
    x: 1, y: 1.7, w: 8, h: 1.2, fontSize: 40, color: COLORS.text_muted, bold: true, align: "center", fontFace: FONTS.header, charSpacing: 1
});
s1.addText("सजावटी बागवानी और लैंडस्केपिंग के मूल सिद्धांत", {
    x: 1, y: 2.8, w: 8, h: 0.6, fontSize: 28, color: COLORS.hindi, align: "center"
});
s1.addText("BSc Agriculture Series | Professor Gaurav", {
    x: 1, y: 3.5, w: 8, h: 0.4, fontSize: 16, color: COLORS.text_dark, align: "center", italic: true
});

// --- Slide 2: Ornamental Crops ---
let s2 = pres.addSlide();
s2.background = { color: COLORS.bg };
s2.addText("01. ORNAMENTAL CROPS / सजावटी फसलें", { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, color: COLORS.text_muted, bold: true, fontFace: FONTS.header });

addCard(s2, { x: 0.5, y: 1.2, w: 5.5, h: 3.8 });
s2.addText([
    { text: "Definition\n", options: { bold: true, fontSize: 24, color: COLORS.text_muted } },
    { text: "Grown primarily for aesthetic beauty and decorative purposes in landscapes.\n", options: { fontSize: 20, color: COLORS.text_dark } },
    { text: "मुख्य रूप से सुंदरता और सजावटी उद्देश्यों के लिए उगाए जाने वाले पौधे।", options: { fontSize: 18, color: COLORS.hindi } }
], { x: 0.8, y: 1.4, w: 5, h: 1.8 });

s2.addText([
    { text: "Scope & Importance\n", options: { bold: true, fontSize: 20, color: COLORS.accent } },
    { text: "• Used in cut/loose flower industry\n• Enhances property value\n• Reduces environmental pollution", options: { fontSize: 16, bullet: true, color: COLORS.text_dark } }
], { x: 0.8, y: 3.2, w: 5, h: 1.5 });

s2.addImage({ path: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800", x: 6.2, y: 1.2, w: 3.3, h: 3.8, rounding: true });

// --- Slide 3: MAPs ---
let s3 = pres.addSlide();
s3.background = { color: COLORS.bg };
s3.addText("02. MEDICINAL & AROMATIC PLANTS", { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, color: COLORS.text_muted, bold: true, fontFace: FONTS.header });

// Two Vertical Cards
addCard(s3, { x: 0.5, y: 1.2, w: 4.3, h: 1.8 }); // Medicinal
s3.addText("🧪 Medicinal Plants (औषधीय पौधे)", { x: 0.7, y: 1.3, w: 4, h: 0.4, bold: true, fontSize: 18, color: COLORS.text_muted });
s3.addText("Used for therapeutic or healing purposes.\n(बीमारियों को ठीक करने वाले रासायनिक तत्व)", { x: 0.7, y: 1.7, w: 4, h: 1, fontSize: 14 });

addCard(s3, { x: 0.5, y: 3.2, w: 4.3, h: 1.8 }); // Aromatic
s3.addText("🌸 Aromatic Plants (सुगंधित पौधे)", { x: 0.7, y: 3.3, w: 4, h: 0.4, bold: true, fontSize: 18, color: COLORS.text_muted });
s3.addText("Essential oils with strong fragrances.\n(आवश्यक तेल और तेज सुगंध वाले पौधे)", { x: 0.7, y: 3.7, w: 4, h: 1, fontSize: 14 });

s3.addImage({ path: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000", x: 5.2, y: 1.2, w: 4.3, h: 3.8, rounding: true });

// --- Slide 4: Landscaping ---
let s4 = pres.addSlide();
s4.background = { color: COLORS.bg };
s4.addText("03. LANDSCAPING DEFINITION / परिभाषा", { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, color: COLORS.text_muted, bold: true, fontFace: FONTS.header });

s4.addImage({ path: "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?auto=format&fit=crop&q=80&w=1600", x: 0, y: 1.2, w: 10, h: 2, sizing: { type: 'cover' } });

addCard(s4, { x: 1, y: 3.5, w: 8, h: 1.5 });
s4.addText([
    { text: "The Art & Science of designing land for aesthetic and functional use.\n", options: { align: 'center', bold: true, fontSize: 22 } },
    { text: "भूमि को सुंदर और उपयोगी बनाने के लिए उसे डिजाइन करने और प्रबंधित करने की कला और विज्ञान।", options: { align: 'center', color: COLORS.hindi, fontSize: 18 } }
], { x: 1.2, y: 3.7, w: 7.6, h: 1 });

// --- Slide 5: Principles (The "Kimi" Matrix) ---
let s5 = pres.addSlide();
s5.background = { color: COLORS.bg };
s5.addText("DESIGN PRINCIPLES / लैंडस्केपिंग के सिद्धांत", { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, color: COLORS.text_muted, bold: true, fontFace: FONTS.header });

const principles = [
    { en: "Balance", hi: "संतुलन", desc: "Equal visual weight on both sides." },
    { en: "Proportion", hi: "अनुपात", desc: "Correct sizing relative to plants." },
    { en: "Rhythm", hi: "लय", desc: "Repetition to create movement." },
    { en: "Focal Point", hi: "मुख्य बिंदु", desc: "Feature that draws the eye." },
    { en: "Harmony", hi: "सामंजस्य", desc: "Blending parts uniformly." }
];

principles.forEach((p, i) => {
    let x = 0.5 + (i % 3) * 3.1;
    let y = i < 3 ? 1.2 : 3.4;
    addCard(s5, { x: x, y: y, w: 2.8, h: 1.8, accent: i % 2 === 0 ? COLORS.accent : COLORS.text_muted });
    s5.addText(p.en, { x: x + 0.2, y: y + 0.2, fontSize: 18, bold: true, color: COLORS.text_dark });
    s5.addText(p.hi, { x: x + 0.2, y: y + 0.5, fontSize: 14, color: COLORS.hindi });
    s5.addText(p.desc, { x: x + 0.2, y: y + 0.9, w: 2.4, fontSize: 12 });
});

// --- Slide 6-9: Categorized Tables ---
function addCategorizedSlide(title, col1, col2, img) {
    let s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText(title, { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, color: COLORS.text_muted, bold: true, fontFace: FONTS.header });
    
    addCard(s, { x: 0.5, y: 1.2, w: 5.5, h: 3.8 });
    s.addTable([
        [{ text: col1.title, options: { bold: true, color: COLORS.white, fill: { color: COLORS.accent } } }, { text: col2.title, options: { bold: true, color: COLORS.white, fill: { color: COLORS.text_muted } } }],
        ...col1.items.map((item, i) => [item, col2.items[i] || ""])
    ], { x: 0.7, y: 1.4, w: 5.1, h: 3.4, fontSize: 16, border: { pt: 1, color: 'E8E6DC' } });

    s.addImage({ path: img, x: 6.2, y: 1.2, w: 3.3, h: 3.8, rounding: true });
}

addCategorizedSlide("04. EXAMPLES OF TREES / पेड़", 
    { title: "Flowering / फूलों वाले", items: ["Gulmohar (गुलमोहर)", "Amaltas (अमलतास)", "Kachnar (कचनार)", "Pride of India"] },
    { title: "Foliage / पत्तियों वाले", items: ["False Ashoka (अशोक)", "Banyan (बरगद)", "Rubber Tree", "Silver Oak"] },
    "https://images.unsplash.com/photo-1558905619-171426efb452?auto=format&fit=crop&q=80&w=800"
);

addCategorizedSlide("05. EXAMPLES OF SHRUBS / झाड़ियाँ", 
    { title: "Flowering / फूलों वाली", items: ["Hibiscus (गुड़हल)", "Chandni (चांदनी)", "Bougainvillea", "Oleander"] },
    { title: "Foliage / पत्तियों वाली", items: ["Croton (क्रोटन)", "Coleus (कोलियस)", "Copperleaf", "Aralia"] },
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800"
);

// --- Slide 10: Conclusion ---
let s10 = pres.addSlide();
s10.background = { color: "1E2761" }; // Dark Finale
s10.addText("CONCLUSION / निष्कर्ष", { x: 0.5, y: 1.5, w: 9, h: 1, fontSize: 48, color: COLORS.white, bold: true, align: "center", fontFace: FONTS.header });
s10.addText("Vital for environmental sustainability and human well-being.", { x: 0.5, y: 2.5, w: 9, h: 0.8, fontSize: 24, color: "CADCFC", align: "center" });
s10.addText("प्रश्न और उत्तर / Q&A", { x: 0.5, y: 4.5, w: 9, h: 0.5, fontSize: 20, color: COLORS.accent, align: "center", bold: true });

pres.writeFile({ fileName: "Mega_Agriculture_Beast_v4.pptx" }).then(fileName => {
    console.log(`Successfully created: ${fileName}`);
});
