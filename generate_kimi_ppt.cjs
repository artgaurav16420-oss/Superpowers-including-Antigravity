const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Professor Gaurav';
pres.title = 'Fundamentals of Ornamental Horticulture & Landscaping';

// Define Master Slide
pres.defineSlideMaster({
  title: 'MASTER_SLIDE',
  background: { color: '1e2761' },
  objects: [
    { rect: { x: 0, y: 5.3, w: '100%', h: 0.325, fill: { color: '141413' } } },
    { text: { text: 'MEGA-SKILLS: THE OS FOR AI AGENTS', options: { x: 0.5, y: 5.3, w: 5, h: 0.325, color: 'faf9f5', fontSize: 10, valign: 'middle' } } },
    { text: { text: 'BSc Agriculture Series', options: { x: 5, y: 5.3, w: 4.5, h: 0.325, color: 'faf9f5', fontSize: 10, align: 'right', valign: 'middle' } } }
  ]
});

// --- Slide 1: Title Slide ---
let slide1 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide1.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:'100%', h:'100%', fill:{ color:'1e2761' } });
slide1.addImage({ path: "https://images.unsplash.com/photo-1558905619-171426efb452?auto=format&fit=crop&q=80&w=1000", x:0, y:0, w:10, h:5.625, sizing:{type:'cover'}, transparency: 60 });

slide1.addText("Fundamentals of Ornamental Horticulture & Landscaping", {
    x: 0.5, y: 1.5, w: 9, h: 1.2, fontSize: 44, color: "FFFFFF", bold: true, align: "center", fontFace: "Georgia"
});
slide1.addText("सजावटी बागवानी और लैंडस्केपिंग के मूल सिद्धांत", {
    x: 0.5, y: 2.7, w: 9, h: 0.6, fontSize: 32, color: "CADCFC", align: "center"
});
slide1.addText([
    { text: "For BSc Agriculture Students", options: { breakLine: true } },
    { text: "Taught by Professor Gaurav" }
], {
    x: 0.5, y: 4.0, w: 9, h: 0.8, fontSize: 24, color: "FFFFFF", align: "center"
});
slide1.addNotes("Introduction to the core concepts of ornamental horticulture and landscaping designed for agriculture students.");

// --- Slide 2: What are Ornamental Crops? ---
let slide2 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide2.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:'100%', h:1, fill:{ color:'1e2761' } });
slide2.addText("What are Ornamental Crops? / सजावटी फसलें क्या हैं?", {
    x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center"
});

slide2.addImage({ path: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800", x: 0.5, y: 1.2, w: 4.5, h: 3.8, rounding: true });

slide2.addText([
    { text: "Definition / परिभाषा", options: { bold: true, color: "D97757", fontSize: 24, breakLine: true } },
    { text: "Grown for aesthetic beauty and environmental enhancement.", options: { breakLine: true, fontSize: 20 } },
    { text: "सुंदरता और पर्यावरण के लिए उगाए गए पौधे।", options: { breakLine: true, fontSize: 20, color: "6a9bcc" } },
    { text: "\nScope / क्षेत्र", options: { bold: true, color: "D97757", fontSize: 24, breakLine: true } },
    { text: "• Floriculture industry (cut/loose flowers)", options: { bullet: true, breakLine: true, fontSize: 18 } },
    { text: "• Enhances property value", options: { bullet: true, breakLine: true, fontSize: 18 } },
    { text: "• Reduces pollution", options: { bullet: true, fontSize: 18 } }
], { x: 5.2, y: 1.2, w: 4.3, h: 3.8, valign: 'top' });

slide2.addNotes("Emphasize that ornamental crops are not just about beauty—they have significant economic value in the floriculture industry.");

// --- Slide 3: MAPs ---
let slide3 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide3.addText("Medicinal and Aromatic Plants (MAPs)", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

slide3.addText([
    { text: "Medicinal / औषधीय:", options: { bold: true, color: "D97757", breakLine: true } },
    { text: "Therapeutic healing compounds.", options: { breakLine: true } },
    { text: "Aromatic / सुगंधित:", options: { bold: true, color: "D97757", breakLine: true, paraSpaceBefore: 10 } },
    { text: "Essential oils for perfumes." }
], { x: 0.5, y: 1.2, w: 4, h: 2.5, fontSize: 24, color: "CADCFC" });

slide3.addImage({ path: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000", x: 4.8, y: 1.2, w: 4.7, h: 3.8, shadow: { type: 'outer', opacity: 0.2 } });

slide3.addText("Examples: Aloe Vera, Tulsi, Neem, Lavender, Mint", { x: 0.5, y: 4, w: 4, h: 1, fontSize: 18, color: "FFFFFF", italic: true });

slide3.addNotes("Highlight the dual benefits of MAPs—therapeutic value and economic potential through export markets.");

// --- Slide 4: Landscaping ---
let slide4 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide4.addText("Landscaping - Definition and Scope", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

slide4.addImage({ path: "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?auto=format&fit=crop&q=80&w=1000", x: 0.5, y: 1.2, w: 9, h: 3, sizing: { type: 'cover' } });

slide4.addText([
    { text: "Art & Science of designing land to be aesthetically pleasing and functional.", options: { align: 'center', breakLine: true } },
    { text: "भूमि को सुंदर और उपयोगी बनाने की कला और विज्ञान।", options: { align: 'center', color: "6a9bcc" } }
], { x: 0.5, y: 4.3, w: 9, h: 1, fontSize: 24, color: "FFFFFF" });

slide4.addNotes("Explain that landscaping combines both artistic vision and scientific knowledge of plants, soil, and climate.");

// --- Slide 5: Principles ---
let slide5 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide5.addText("Principles of Landscaping / लैंडस्केपिंग के सिद्धांत", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

let principlesTable = [
    [{ text: "Principle", options: { bold: true, fill: { color: 'D97757' }, color: 'FFFFFF' } }, { text: "Meaning (English & Hindi)", options: { bold: true, fill: { color: 'D97757' }, color: 'FFFFFF' } }],
    ["Balance / संतुलन", "Equal visual weight on both sides (दोनों ओर समान भार)"],
    ["Proportion / अनुपात", "Correct sizing relative to surroundings (सही आकार)"],
    ["Rhythm / लय", "Repetition to create movement (पुनरावृत्ति)"],
    ["Focal Point / मुख्य बिंदु", "A feature that draws the eye (ध्यान आकर्षित करना)"],
    ["Harmony / सामंजस्य", "Blending parts together uniformly (एक साथ मिलना)"]
];
slide5.addTable(principlesTable, { x: 0.5, y: 1.2, w: 9, h: 3.8, fontSize: 18, border: { pt: 1, color: 'CADCFC' }, fill: { color: '1e2761' }, color: 'FFFFFF' });

slide5.addNotes("These five principles work together to create visually appealing landscapes.");

// --- Slide 6: Uses ---
let slide6 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide6.addText("Uses of Trees, Shrubs & Climbers", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

slide6.addImage({ path: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=800", x: 5, y: 1.2, w: 4.5, h: 3.8 });

slide6.addText([
    { text: "• Providing Shade (छाया)", options: { bullet: true, breakLine: true } },
    { text: "• Physical Boundaries (सीमाएँ)", options: { bullet: true, breakLine: true } },
    { text: "• Soil Erosion Control (मृदा संरक्षण)", options: { bullet: true, breakLine: true } },
    { text: "• Blocking Unwanted Views (स्क्रीनिंग)", options: { bullet: true, breakLine: true } },
    { text: "• Aesthetic Beauty (सुंदरता)", options: { bullet: true } }
], { x: 0.5, y: 1.2, w: 4.3, h: 3.8, fontSize: 26, color: "FFFFFF", valign: 'middle' });

slide6.addNotes("Explain how different plant types serve different functional purposes in landscape design.");

// --- Slide 7: Examples Trees ---
let slide7 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide7.addText("Examples of Trees / पेड़ों के उदाहरण", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

slide7.addText([
    { text: "Flowering / फूलों वाले:", options: { bold: true, color: "D97757", breakLine: true } },
    { text: "Gulmohar (गुलमोहर), Amaltas (अमलतास), Kachnar (कचनार)", options: { breakLine: true } },
    { text: "Foliage / पत्तियों वाले:", options: { bold: true, color: "6a9bcc", breakLine: true, paraSpaceBefore: 15 } },
    { text: "False Ashoka (अशोक), Banyan (बरगद), Rubber Tree (रबर)" }
], { x: 0.5, y: 1.2, w: 9, h: 3.8, fontSize: 24, color: "FFFFFF", align: 'center', valign: 'middle' });

slide7.addNotes("Identify common Indian trees categorized by their flowers or their architectural foliage.");

// --- Slide 8: Examples Shrubs ---
let slide8 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide8.addText("Examples of Shrubs / झाड़ियों के उदाहरण", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

slide8.addText([
    { text: "Flowering / फूलों वाली:", options: { bold: true, color: "D97757", breakLine: true } },
    { text: "Hibiscus (गुड़हल), Chandni (चांदनी), Bougainvillea", options: { breakLine: true } },
    { text: "Foliage / पत्तियों वाली:", options: { bold: true, color: "6a9bcc", breakLine: true, paraSpaceBefore: 15 } },
    { text: "Croton (क्रोटन), Coleus (कोलियस), Aralia (अरालिया)" }
], { x: 0.5, y: 1.2, w: 9, h: 3.8, fontSize: 24, color: "FFFFFF", align: 'center', valign: 'middle' });

slide8.addNotes("Shrubs are versatile plants that can be used for hedges, borders, or as standalone features.");

// --- Slide 9: Examples Climbers ---
let slide9 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide9.addText("Examples of Climbers / लताओं के उदाहरण", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 36, color: "FFFFFF", bold: true, align: "center" });

slide9.addText([
    { text: "Flowering / फूलों वाली:", options: { bold: true, color: "D97757", breakLine: true } },
    { text: "Rangoon Creeper (मधुमालती), Passion Flower", options: { breakLine: true } },
    { text: "Foliage / पत्तियों वाली:", options: { bold: true, color: "6a9bcc", breakLine: true, paraSpaceBefore: 15 } },
    { text: "Money Plant (मनी प्लांट), English Ivy (इंग्लिश आइवी)" }
], { x: 0.5, y: 1.2, w: 9, h: 3.8, fontSize: 24, color: "FFFFFF", align: 'center', valign: 'middle' });

slide9.addNotes("Climbers maximize vertical space and add dimension to landscapes.");

// --- Slide 10: Conclusion ---
let slide10 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
slide10.addImage({ path: "https://images.pexels.com/photos/4009659/pexels-photo-4009659.jpeg?auto=compress&cs=tinysrgb&w=800", x:0, y:0, w:10, h:5.625, sizing:{type:'cover'}, transparency: 70 });
slide10.addText("Conclusion / निष्कर्ष", { x: 0.5, y: 1.5, w: 9, h: 0.8, fontSize: 44, color: "FFFFFF", bold: true, align: "center" });
slide10.addText("Ornamental horticulture is vital for sustainability, human well-being, and commercial agriculture.", { x: 1, y: 2.5, w: 8, h: 1, fontSize: 28, color: "CADCFC", align: "center" });
slide10.addText("Questions & Answers (प्रश्न और उत्तर)", { x: 0.5, y: 4, w: 9, h: 0.8, fontSize: 32, color: "FFFFFF", align: "center", bold: true });

pres.writeFile({ fileName: "Kimi_Style_Agriculture_Presentation.pptx" }).then(fileName => {
    console.log(`Successfully created: ${fileName}`);
});
