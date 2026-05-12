import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const geocodeAddress = async (address: string) => {
  try {
    const encoded = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: { "User-Agent": "ExtremeSchoolApp/1.0" },
    });
    const data = await response.json();
    if (!data.length) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
};

const geocodeWithFallback = async (
  address: string,
  fallback: { lat: number; lng: number },
) => {
  const result = await geocodeAddress(address);
  if (result) return result;
  console.warn(
    `⚠️  Geocoding misslyckades för: "${address}" — använder fallback`,
  );
  return fallback;
};

async function main() {
  await prisma.availableTime.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.school.deleteMany({});

  console.log("Gamla data rensad. Påbörjar seeding...");

  // ── PORTUGAL: Ericeira ──
  const c1 = await geocodeWithFallback(
    "Rua dos Surfistas 12, Ericeira, Portugal",
    { lat: 38.9627, lng: -9.4179 },
  );
  await sleep(1100);
  const schoolPortugal1 = await prisma.school.create({
    data: {
      name: "Blue Water Surf Academy",
      country: "Portugal",
      city: "Ericeira",
      address: "Rua dos Surfistas 12",
      lat: c1.lat,
      lng: c1.lng,
    },
  });

  const cL1 = await geocodeWithFallback("Foz do Lizandro, Ericeira, Portugal", {
    lat: 38.9743,
    lng: -9.4198,
  });
  await sleep(1100);
  const cL2 = await geocodeWithFallback("Ribeira d'Ilhas, Ericeira, Portugal", {
    lat: 38.9887,
    lng: -9.4199,
  });
  await sleep(1100);

  const p1L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolPortugal1.id,
      sportType: "surf",
      lessonType: "group",
      level: "beginner",
      description:
        "Learn the fundamentals of surfing in a safe group environment. We cover water safety, paddling technique, and catching your first green waves.",
      durationHours: 3.0,
      priceEuro: 55.0,
      location: "Foz do Lizandro",
      equipmentIncluded: true,
      lat: cL1.lat,
      lng: cL1.lng,
    },
  });

  const p1L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolPortugal1.id,
      sportType: "surf",
      lessonType: "private",
      level: "advanced",
      description:
        "1-on-1 coaching focused on generating speed, clean bottom turns, and reading reef breaks. Includes video analysis.",
      durationHours: 2.0,
      priceEuro: 110.0,
      location: "Ribeira d'Ilhas",
      equipmentIncluded: false,
      lat: cL2.lat,
      lng: cL2.lng,
    },
  });

  // ── PORTUGAL: Peniche ──
  const c2 = await geocodeWithFallback("Avenida do Mar 8, Peniche, Portugal", {
    lat: 39.3558,
    lng: -9.3807,
  });
  await sleep(1100);
  const schoolPortugal2 = await prisma.school.create({
    data: {
      name: "Atlantic Kite & Wind School",
      country: "Portugal",
      city: "Peniche",
      address: "Avenida do Mar 8",
      lat: c2.lat,
      lng: c2.lng,
    },
  });

  const cL3 = await geocodeWithFallback("Baleal Beach, Peniche, Portugal", {
    lat: 39.3771,
    lng: -9.3488,
  });
  await sleep(1100);
  const cL4 = await geocodeWithFallback("Lagoa de Óbidos, Peniche, Portugal", {
    lat: 39.4022,
    lng: -9.2311,
  });
  await sleep(1100);

  const p2L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolPortugal2.id,
      sportType: "kitesurf",
      lessonType: "group",
      level: "beginner",
      description:
        "Master kite control on the beach and body dragging through the water. Perfect Atlantic winds make Peniche ideal for learning.",
      durationHours: 4.0,
      priceEuro: 120.0,
      location: "Baleal Beach",
      equipmentIncluded: true,
      lat: cL3.lat,
      lng: cL3.lng,
    },
  });

  const p2L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolPortugal2.id,
      sportType: "windsurf",
      lessonType: "group",
      level: "intermediate",
      description:
        "Improve your planing technique and harness use in consistent Atlantic winds. Suitable for those with basic windsurf skills.",
      durationHours: 3.0,
      priceEuro: 85.0,
      location: "Lagoa de Óbidos",
      equipmentIncluded: true,
      lat: cL4.lat,
      lng: cL4.lng,
    },
  });

  // ── SPANIEN: Fuerteventura ──
  const c3 = await geocodeWithFallback(
    "Calle del Mar 45, Corralejo, Fuerteventura, Spain",
    { lat: 28.7285, lng: -13.8671 },
  );
  await sleep(1100);
  const schoolSpain1 = await prisma.school.create({
    data: {
      name: "Fuerte Wind & Kite Club",
      country: "Spain",
      city: "Corralejo",
      address: "Calle del Mar 45",
      lat: c3.lat,
      lng: c3.lng,
    },
  });

  const cL5 = await geocodeWithFallback(
    "Flag Beach, Corralejo, Fuerteventura, Spain",
    { lat: 28.7458, lng: -13.8638 },
  );
  await sleep(1100);
  const cL6 = await geocodeWithFallback(
    "Playa de Sotavento, Fuerteventura, Spain",
    { lat: 28.1744, lng: -14.2197 },
  );
  await sleep(1100);

  const s1L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolSpain1.id,
      sportType: "kitesurf",
      lessonType: "group",
      level: "beginner",
      description:
        "Adrenaline-packed introduction to kitesurfing on one of Europe's best kite beaches. Consistent trade winds guarantee progress.",
      durationHours: 4.0,
      priceEuro: 130.0,
      location: "Flag Beach",
      equipmentIncluded: true,
      lat: cL5.lat,
      lng: cL5.lng,
    },
  });

  const s1L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolSpain1.id,
      sportType: "windsurf",
      lessonType: "private",
      level: "advanced",
      description:
        "Advanced windsurf coaching on Sotavento's world-class conditions. Work on freestyle tricks and speed techniques with a certified instructor.",
      durationHours: 2.0,
      priceEuro: 140.0,
      location: "Playa de Sotavento",
      equipmentIncluded: false,
      lat: cL6.lat,
      lng: cL6.lng,
    },
  });

  // ── SPANIEN: Barcelona ──
  const c4 = await geocodeWithFallback("Passeig Marítim 22, Barcelona, Spain", {
    lat: 41.3792,
    lng: 2.1925,
  });
  await sleep(1100);
  const schoolSpain2 = await prisma.school.create({
    data: {
      name: "Barcelona Wake & Surf",
      country: "Spain",
      city: "Barcelona",
      address: "Passeig Marítim 22",
      lat: c4.lat,
      lng: c4.lng,
    },
  });

  const cL7 = await geocodeWithFallback("Barceloneta Beach, Barcelona, Spain", {
    lat: 41.3763,
    lng: 2.1924,
  });
  await sleep(1100);
  const cL8 = await geocodeWithFallback("Badalona Marina, Barcelona, Spain", {
    lat: 41.4469,
    lng: 2.2474,
  });
  await sleep(1100);

  const s2L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolSpain2.id,
      sportType: "surf",
      lessonType: "group",
      level: "beginner",
      description:
        "Learn to surf in the Mediterranean sun with Barcelona's skyline as your backdrop. Small groups ensure personal attention.",
      durationHours: 2.5,
      priceEuro: 65.0,
      location: "Barceloneta Beach",
      equipmentIncluded: true,
      lat: cL7.lat,
      lng: cL7.lng,
    },
  });

  const s2L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolSpain2.id,
      sportType: "wakeboard",
      lessonType: "private",
      level: "beginner",
      description:
        "First time on a wakeboard? Our instructors will have you riding and carving within one session behind our boat in calm marina waters.",
      durationHours: 1.5,
      priceEuro: 95.0,
      location: "Badalona Marina",
      equipmentIncluded: true,
      lat: cL8.lat,
      lng: cL8.lng,
    },
  });

  // ── FRANKRIKE: Biarritz ──
  const c5 = await geocodeWithFallback(
    "Avenue de la Plage 5, Biarritz, France",
    { lat: 43.4832, lng: -1.5586 },
  );
  await sleep(1100);
  const schoolFrance1 = await prisma.school.create({
    data: {
      name: "Côte Basque Surf School",
      country: "France",
      city: "Biarritz",
      address: "Avenue de la Plage 5",
      lat: c5.lat,
      lng: c5.lng,
    },
  });

  const cL9 = await geocodeWithFallback("Grande Plage, Biarritz, France", {
    lat: 43.4833,
    lng: -1.5591,
  });
  await sleep(1100);
  const cL10 = await geocodeWithFallback(
    "Plage de la Côte des Basques, Biarritz, France",
    { lat: 43.4748, lng: -1.5637 },
  );
  await sleep(1100);

  const f1L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolFrance1.id,
      sportType: "surf",
      lessonType: "group",
      level: "intermediate",
      description:
        "Take your surfing further on the legendary Basque coast. Learn to read powerful Atlantic swells and surf with confidence on overhead waves.",
      durationHours: 3.0,
      priceEuro: 75.0,
      location: "Grande Plage",
      equipmentIncluded: true,
      lat: cL9.lat,
      lng: cL9.lng,
    },
  });

  const f1L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolFrance1.id,
      sportType: "surf",
      lessonType: "private",
      level: "beginner",
      description:
        "Private surf lesson on the famous Côte des Basques beach, birthplace of European surfing. Your instructor adapts entirely to your pace.",
      durationHours: 2.0,
      priceEuro: 90.0,
      location: "Plage de la Côte des Basques",
      equipmentIncluded: true,
      lat: cL10.lat,
      lng: cL10.lng,
    },
  });

  // ── FRANKRIKE: Chamonix ──
  const c6 = await geocodeWithFallback(
    "Rue du Mont-Blanc 3, Chamonix, France",
    { lat: 45.9237, lng: 6.8694 },
  );
  await sleep(1100);
  const schoolFrance2 = await prisma.school.create({
    data: {
      name: "Mont Blanc Snow Academy",
      country: "France",
      city: "Chamonix",
      address: "Rue du Mont-Blanc 3",
      lat: c6.lat,
      lng: c6.lng,
    },
  });

  const cL11 = await geocodeWithFallback(
    "Les Grands Montets, Chamonix, France",
    { lat: 45.9931, lng: 6.9175 },
  );
  await sleep(1100);
  const cL12 = await geocodeWithFallback("Brévent, Chamonix, France", {
    lat: 45.9344,
    lng: 6.8427,
  });
  await sleep(1100);

  const f2L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolFrance2.id,
      sportType: "snowboard",
      lessonType: "group",
      level: "beginner",
      description:
        "Your first turns on snow in the shadow of Mont Blanc. Learn balance, basic turns and stopping safely on gentle slopes.",
      durationHours: 3.0,
      priceEuro: 85.0,
      location: "Les Grands Montets",
      equipmentIncluded: true,
      lat: cL11.lat,
      lng: cL11.lng,
    },
  });

  const f2L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolFrance2.id,
      sportType: "snowboard",
      lessonType: "private",
      level: "advanced",
      description:
        "Advanced freeride coaching on Chamonix's legendary off-piste terrain. Powder technique, avalanche awareness and line selection.",
      durationHours: 4.0,
      priceEuro: 220.0,
      location: "Brévent",
      equipmentIncluded: false,
      lat: cL12.lat,
      lng: cL12.lng,
    },
  });

  // ── SVERIGE: Lomma ──
  const c7 = await geocodeWithFallback("Strandvägen 3, Lomma, Sweden", {
    lat: 55.6715,
    lng: 13.0593,
  });
  await sleep(1100);
  const schoolSweden1 = await prisma.school.create({
    data: {
      name: "Cold Water Surf & Kite",
      country: "Sweden",
      city: "Lomma",
      address: "Strandvägen 3",
      lat: c7.lat,
      lng: c7.lng,
    },
  });

  const cL13 = await geocodeWithFallback("Lomma Beach, Lomma, Sweden", {
    lat: 55.6702,
    lng: 13.0521,
  });
  await sleep(1100);

  const sw1L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolSweden1.id,
      sportType: "windsurf",
      lessonType: "group",
      level: "intermediate",
      description:
        "Perfect your stance and learn to plane in the harness on Öresund's reliable winds. For those who can already sail upwind.",
      durationHours: 2.5,
      priceEuro: 75.0,
      location: "Lomma Beach",
      equipmentIncluded: true,
      lat: cL13.lat,
      lng: cL13.lng,
    },
  });

  const sw1L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolSweden1.id,
      sportType: "kitesurf",
      lessonType: "group",
      level: "beginner",
      description:
        "Learn kitesurfing on the flat waters of Öresund. Ideal for beginners – safe, shallow and with consistent side-shore winds.",
      durationHours: 4.0,
      priceEuro: 110.0,
      location: "Lomma Beach",
      equipmentIncluded: true,
      lat: cL13.lat,
      lng: cL13.lng,
    },
  });

  // ── SVERIGE: Åre ──
  const c8 = await geocodeWithFallback("Byvägen 12, Åre, Sweden", {
    lat: 63.3988,
    lng: 13.0815,
  });
  await sleep(1100);
  const schoolSweden2 = await prisma.school.create({
    data: {
      name: "Åre Freeride Academy",
      country: "Sweden",
      city: "Åre",
      address: "Byvägen 12",
      lat: c8.lat,
      lng: c8.lng,
    },
  });

  const cL14 = await geocodeWithFallback("Åreskutan, Åre, Sweden", {
    lat: 63.4014,
    lng: 13.0792,
  });
  await sleep(1100);

  const sw2L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolSweden2.id,
      sportType: "snowboard",
      lessonType: "group",
      level: "beginner",
      description:
        "Start your snowboard journey in Scandinavia's premier mountain resort. Fun, safe and with certified instructors who speak both Swedish and English.",
      durationHours: 3.0,
      priceEuro: 95.0,
      location: "Åreskutan",
      equipmentIncluded: true,
      lat: cL14.lat,
      lng: cL14.lng,
    },
  });

  const sw2L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolSweden2.id,
      sportType: "snowboard",
      lessonType: "private",
      level: "intermediate",
      description:
        "Unlock the whole mountain with a private guide. Work on carving technique, jumps in the terrain park and off-piste intro.",
      durationHours: 2.0,
      priceEuro: 130.0,
      location: "Åreskutan",
      equipmentIncluded: false,
      lat: cL14.lat,
      lng: cL14.lng,
    },
  });

  // ── SVERIGE: Stockholm ──
  const c9 = await geocodeWithFallback("Strandvägen 1, Stockholm, Sweden", {
    lat: 59.3327,
    lng: 18.0853,
  });
  await sleep(1100);
  const schoolSweden3 = await prisma.school.create({
    data: {
      name: "Stockholm Wake Park",
      country: "Sweden",
      city: "Stockholm",
      address: "Strandvägen 1",
      lat: c9.lat,
      lng: c9.lng,
    },
  });

  const cL15 = await geocodeWithFallback(
    "Djurgårdsbrunnsviken, Stockholm, Sweden",
    { lat: 59.3458, lng: 18.1087 },
  );
  await sleep(1100);

  const sw3L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolSweden3.id,
      sportType: "wakeboard",
      lessonType: "group",
      level: "beginner",
      description:
        "Try wakeboarding in Stockholm's beautiful archipelago setting. Our cable park is perfect for first-timers – no boat needed.",
      durationHours: 2.0,
      priceEuro: 70.0,
      location: "Djurgårdsbrunnsviken",
      equipmentIncluded: true,
      lat: cL15.lat,
      lng: cL15.lng,
    },
  });

  const sw3L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolSweden3.id,
      sportType: "wakeboard",
      lessonType: "private",
      level: "advanced",
      description:
        "Advanced wakeboard coaching with a pro rider. Work on inverts, grabs and rail tricks at our fully equipped cable park.",
      durationHours: 1.5,
      priceEuro: 110.0,
      location: "Djurgårdsbrunnsviken",
      equipmentIncluded: false,
      lat: cL15.lat,
      lng: cL15.lng,
    },
  });

  // ── FRANKRIKE: Fontainebleau ──
  const c10 = await geocodeWithFallback(
    "Route des Gorges 7, Fontainebleau, France",
    { lat: 48.4044, lng: 2.6773 },
  );
  await sleep(1100);
  const schoolFrance3 = await prisma.school.create({
    data: {
      name: "Fontainebleau Climbing School",
      country: "France",
      city: "Fontainebleau",
      address: "Route des Gorges 7",
      lat: c10.lat,
      lng: c10.lng,
    },
  });

  const cL16 = await geocodeWithFallback("Forêt de Fontainebleau, France", {
    lat: 48.4044,
    lng: 2.6773,
  });
  await sleep(1100);

  const f3L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolFrance3.id,
      sportType: "climbing",
      lessonType: "group",
      level: "beginner",
      description:
        "Introduction to bouldering in the world-famous Fontainebleau forest. Learn movement techniques on low sandstone boulders with no ropes needed.",
      durationHours: 3.0,
      priceEuro: 60.0,
      location: "Forêt de Fontainebleau",
      equipmentIncluded: true,
      lat: cL16.lat,
      lng: cL16.lng,
    },
  });

  const f3L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolFrance3.id,
      sportType: "climbing",
      lessonType: "private",
      level: "intermediate",
      description:
        "Private bouldering session with a certified guide. Focus on technique, footwork and reading problems on Fontainebleau's iconic sandstone.",
      durationHours: 2.5,
      priceEuro: 95.0,
      location: "Forêt de Fontainebleau",
      equipmentIncluded: true,
      lat: cL16.lat,
      lng: cL16.lng,
    },
  });

  // ── SPANIEN: Siurana ──
  const c11 = await geocodeWithFallback("Siurana, Tarragona, Spain", {
    lat: 41.2575,
    lng: 0.9254,
  });
  await sleep(1100);
  const schoolSpain3 = await prisma.school.create({
    data: {
      name: "Siurana Rock & Climb",
      country: "Spain",
      city: "Siurana",
      address: "Carrer de la Roca 1",
      lat: c11.lat,
      lng: c11.lng,
    },
  });

  const cL17 = await geocodeWithFallback(
    "Siurana climbing area, Tarragona, Spain",
    { lat: 41.2575, lng: 0.9254 },
  );
  await sleep(1100);

  const s3L1 = await prisma.lesson.create({
    data: {
      schoolId: schoolSpain3.id,
      sportType: "climbing",
      lessonType: "group",
      level: "intermediate",
      description:
        "Sport climbing on Siurana's world-class limestone. Improve your technique on routes graded 6a–7a with stunning views over the Priorat valley.",
      durationHours: 4.0,
      priceEuro: 80.0,
      location: "Siurana climbing area",
      equipmentIncluded: true,
      lat: cL17.lat,
      lng: cL17.lng,
    },
  });

  const s3L2 = await prisma.lesson.create({
    data: {
      schoolId: schoolSpain3.id,
      sportType: "climbing",
      lessonType: "private",
      level: "advanced",
      description:
        "Private coaching on Siurana's hardest lines. Work on project climbing, redpointing strategy and mental performance with an experienced coach.",
      durationHours: 3.0,
      priceEuro: 150.0,
      location: "Siurana climbing area",
      equipmentIncluded: false,
      lat: cL17.lat,
      lng: cL17.lng,
    },
  });

  // ── LEDIGA TIDER ── (oförändrad)
  await prisma.availableTime.createMany({
    data: [
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-04T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-04T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-04T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-05T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-05T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-05T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-06T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L1.id,
        startTime: new Date("2026-11-06T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L2.id,
        startTime: new Date("2026-11-05T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L2.id,
        startTime: new Date("2026-11-05T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L2.id,
        startTime: new Date("2026-11-06T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L2.id,
        startTime: new Date("2026-11-06T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p1L2.id,
        startTime: new Date("2026-11-07T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L1.id,
        startTime: new Date("2026-11-06T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L1.id,
        startTime: new Date("2026-11-06T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L1.id,
        startTime: new Date("2026-11-07T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L1.id,
        startTime: new Date("2026-11-07T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L1.id,
        startTime: new Date("2026-11-08T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L2.id,
        startTime: new Date("2026-11-08T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L2.id,
        startTime: new Date("2026-11-08T12:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L2.id,
        startTime: new Date("2026-11-09T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: p2L2.id,
        startTime: new Date("2026-11-09T12:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L1.id,
        startTime: new Date("2026-11-04T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L1.id,
        startTime: new Date("2026-11-04T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L1.id,
        startTime: new Date("2026-11-05T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L1.id,
        startTime: new Date("2026-11-05T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L1.id,
        startTime: new Date("2026-11-06T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L2.id,
        startTime: new Date("2026-11-06T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L2.id,
        startTime: new Date("2026-11-06T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L2.id,
        startTime: new Date("2026-11-07T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s1L2.id,
        startTime: new Date("2026-11-07T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L1.id,
        startTime: new Date("2026-11-04T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L1.id,
        startTime: new Date("2026-11-04T12:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L1.id,
        startTime: new Date("2026-11-04T15:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L1.id,
        startTime: new Date("2026-11-05T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L1.id,
        startTime: new Date("2026-11-05T12:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L2.id,
        startTime: new Date("2026-11-05T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L2.id,
        startTime: new Date("2026-11-05T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L2.id,
        startTime: new Date("2026-11-05T16:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L2.id,
        startTime: new Date("2026-11-06T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s2L2.id,
        startTime: new Date("2026-11-06T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L1.id,
        startTime: new Date("2026-11-09T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L1.id,
        startTime: new Date("2026-11-09T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L1.id,
        startTime: new Date("2026-11-10T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L1.id,
        startTime: new Date("2026-11-10T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L2.id,
        startTime: new Date("2026-11-10T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L2.id,
        startTime: new Date("2026-11-10T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L2.id,
        startTime: new Date("2026-11-11T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: s3L2.id,
        startTime: new Date("2026-11-11T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L1.id,
        startTime: new Date("2026-11-04T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L1.id,
        startTime: new Date("2026-11-04T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L1.id,
        startTime: new Date("2026-11-04T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L1.id,
        startTime: new Date("2026-11-05T07:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L1.id,
        startTime: new Date("2026-11-05T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L2.id,
        startTime: new Date("2026-11-06T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L2.id,
        startTime: new Date("2026-11-06T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L2.id,
        startTime: new Date("2026-11-07T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f1L2.id,
        startTime: new Date("2026-11-07T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L1.id,
        startTime: new Date("2026-12-01T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L1.id,
        startTime: new Date("2026-12-01T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L1.id,
        startTime: new Date("2026-12-02T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L1.id,
        startTime: new Date("2026-12-02T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L1.id,
        startTime: new Date("2026-12-03T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L2.id,
        startTime: new Date("2026-12-03T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L2.id,
        startTime: new Date("2026-12-03T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L2.id,
        startTime: new Date("2026-12-04T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f2L2.id,
        startTime: new Date("2026-12-04T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L1.id,
        startTime: new Date("2026-11-07T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L1.id,
        startTime: new Date("2026-11-07T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L1.id,
        startTime: new Date("2026-11-07T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L1.id,
        startTime: new Date("2026-11-08T08:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L1.id,
        startTime: new Date("2026-11-08T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L2.id,
        startTime: new Date("2026-11-08T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L2.id,
        startTime: new Date("2026-11-09T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: f3L2.id,
        startTime: new Date("2026-11-09T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L1.id,
        startTime: new Date("2026-11-07T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L1.id,
        startTime: new Date("2026-11-07T12:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L1.id,
        startTime: new Date("2026-11-07T15:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L1.id,
        startTime: new Date("2026-11-08T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L1.id,
        startTime: new Date("2026-11-08T12:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L2.id,
        startTime: new Date("2026-11-09T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L2.id,
        startTime: new Date("2026-11-09T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L2.id,
        startTime: new Date("2026-11-10T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw1L2.id,
        startTime: new Date("2026-11-10T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L1.id,
        startTime: new Date("2026-12-05T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L1.id,
        startTime: new Date("2026-12-05T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L1.id,
        startTime: new Date("2026-12-06T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L1.id,
        startTime: new Date("2026-12-06T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L1.id,
        startTime: new Date("2026-12-07T09:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L2.id,
        startTime: new Date("2026-12-06T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L2.id,
        startTime: new Date("2026-12-06T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L2.id,
        startTime: new Date("2026-12-07T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw2L2.id,
        startTime: new Date("2026-12-07T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L1.id,
        startTime: new Date("2026-11-10T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L1.id,
        startTime: new Date("2026-11-10T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L1.id,
        startTime: new Date("2026-11-10T16:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L1.id,
        startTime: new Date("2026-11-11T10:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L1.id,
        startTime: new Date("2026-11-11T13:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L2.id,
        startTime: new Date("2026-11-11T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L2.id,
        startTime: new Date("2026-11-11T14:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L2.id,
        startTime: new Date("2026-11-12T11:00:00Z"),
        isBooked: false,
      },
      {
        lessonId: sw3L2.id,
        startTime: new Date("2026-11-12T14:00:00Z"),
        isBooked: false,
      },
    ],
  });

  console.log(
    "✓ Database seeded with 11 schools, 22 lessons and multiple time slots per day!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
