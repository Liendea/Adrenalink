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

async function main() {
  await prisma.availableTime.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.school.deleteMany({});

  console.log("Gamla data rensad. Påbörjar seeding...");

  // ── PORTUGAL: Ericeira ──
  const c1 = await geocodeAddress("Rua dos Surfistas 12, Ericeira, Portugal");
  await sleep(1100);
  const schoolPortugal1 = await prisma.school.create({
    data: {
      name: "Blue Water Surf Academy",
      country: "Portugal",
      city: "Ericeira",
      address: "Rua dos Surfistas 12",
      lat: c1?.lat ?? null,
      lng: c1?.lng ?? null,
    },
  });

  const cL1 = await geocodeAddress("Foz do Lizandro, Ericeira, Portugal");
  await sleep(1100);
  const cL2 = await geocodeAddress("Ribeira d'Ilhas, Ericeira, Portugal");
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
      lat: cL1?.lat ?? null,
      lng: cL1?.lng ?? null,
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
      lat: cL2?.lat ?? null,
      lng: cL2?.lng ?? null,
    },
  });

  // ── PORTUGAL: Peniche ──
  const c2 = await geocodeAddress("Avenida do Mar 8, Peniche, Portugal");
  await sleep(1100);
  const schoolPortugal2 = await prisma.school.create({
    data: {
      name: "Atlantic Kite & Wind School",
      country: "Portugal",
      city: "Peniche",
      address: "Avenida do Mar 8",
      lat: c2?.lat ?? null,
      lng: c2?.lng ?? null,
    },
  });

  const cL3 = await geocodeAddress("Baleal Beach, Peniche, Portugal");
  await sleep(1100);
  const cL4 = await geocodeAddress("Lagoa de Óbidos, Peniche, Portugal");
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
      lat: cL3?.lat ?? null,
      lng: cL3?.lng ?? null,
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
      lat: cL4?.lat ?? null,
      lng: cL4?.lng ?? null,
    },
  });

  // ── SPANIEN: Fuerteventura ──
  const c3 = await geocodeAddress(
    "Calle del Mar 45, Corralejo, Fuerteventura, Spain",
  );
  await sleep(1100);
  const schoolSpain1 = await prisma.school.create({
    data: {
      name: "Fuerte Wind & Kite Club",
      country: "Spain",
      city: "Corralejo",
      address: "Calle del Mar 45",
      lat: c3?.lat ?? null,
      lng: c3?.lng ?? null,
    },
  });

  const cL5 = await geocodeAddress(
    "Flag Beach, Corralejo, Fuerteventura, Spain",
  );
  await sleep(1100);
  const cL6 = await geocodeAddress("Playa de Sotavento, Fuerteventura, Spain");
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
      lat: cL5?.lat ?? null,
      lng: cL5?.lng ?? null,
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
      lat: cL6?.lat ?? null,
      lng: cL6?.lng ?? null,
    },
  });

  // ── SPANIEN: Barcelona ──
  const c4 = await geocodeAddress("Passeig Marítim 22, Barcelona, Spain");
  await sleep(1100);
  const schoolSpain2 = await prisma.school.create({
    data: {
      name: "Barcelona Wake & Surf",
      country: "Spain",
      city: "Barcelona",
      address: "Passeig Marítim 22",
      lat: c4?.lat ?? null,
      lng: c4?.lng ?? null,
    },
  });

  const cL7 = await geocodeAddress("Barceloneta Beach, Barcelona, Spain");
  await sleep(1100);
  const cL8 = await geocodeAddress("Badalona Marina, Barcelona, Spain");
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
      lat: cL7?.lat ?? null,
      lng: cL7?.lng ?? null,
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
      lat: cL8?.lat ?? null,
      lng: cL8?.lng ?? null,
    },
  });

  // ── FRANKRIKE: Biarritz ──
  const c5 = await geocodeAddress("Avenue de la Plage 5, Biarritz, France");
  await sleep(1100);
  const schoolFrance1 = await prisma.school.create({
    data: {
      name: "Côte Basque Surf School",
      country: "France",
      city: "Biarritz",
      address: "Avenue de la Plage 5",
      lat: c5?.lat ?? null,
      lng: c5?.lng ?? null,
    },
  });

  const cL9 = await geocodeAddress("Grande Plage, Biarritz, France");
  await sleep(1100);
  const cL10 = await geocodeAddress(
    "Plage de la Côte des Basques, Biarritz, France",
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
      lat: cL9?.lat ?? null,
      lng: cL9?.lng ?? null,
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
      lat: cL10?.lat ?? null,
      lng: cL10?.lng ?? null,
    },
  });

  // ── FRANKRIKE: Chamonix ──
  const c6 = await geocodeAddress("Rue du Mont-Blanc 3, Chamonix, France");
  await sleep(1100);
  const schoolFrance2 = await prisma.school.create({
    data: {
      name: "Mont Blanc Snow Academy",
      country: "France",
      city: "Chamonix",
      address: "Rue du Mont-Blanc 3",
      lat: c6?.lat ?? null,
      lng: c6?.lng ?? null,
    },
  });

  const cL11 = await geocodeAddress("Les Grands Montets, Chamonix, France");
  await sleep(1100);
  const cL12 = await geocodeAddress("Brévent, Chamonix, France");
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
      lat: cL11?.lat ?? null,
      lng: cL11?.lng ?? null,
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
      lat: cL12?.lat ?? null,
      lng: cL12?.lng ?? null,
    },
  });

  // ── SVERIGE: Lomma ──
  const c7 = await geocodeAddress("Strandvägen 3, Lomma, Sweden");
  await sleep(1100);
  const schoolSweden1 = await prisma.school.create({
    data: {
      name: "Cold Water Surf & Kite",
      country: "Sweden",
      city: "Lomma",
      address: "Strandvägen 3",
      lat: c7?.lat ?? null,
      lng: c7?.lng ?? null,
    },
  });

  const cL13 = await geocodeAddress("Lomma Beach, Lomma, Sweden");
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
      lat: cL13?.lat ?? null,
      lng: cL13?.lng ?? null,
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
      lat: cL13?.lat ?? null,
      lng: cL13?.lng ?? null,
    },
  });

  // ── SVERIGE: Åre ──
  const c8 = await geocodeAddress("Byvägen 12, Åre, Sweden");
  await sleep(1100);
  const schoolSweden2 = await prisma.school.create({
    data: {
      name: "Åre Freeride Academy",
      country: "Sweden",
      city: "Åre",
      address: "Byvägen 12",
      lat: c8?.lat ?? null,
      lng: c8?.lng ?? null,
    },
  });

  const cL14 = await geocodeAddress("Åreskutan, Åre, Sweden");
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
      lat: cL14?.lat ?? null,
      lng: cL14?.lng ?? null,
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
      lat: cL14?.lat ?? null,
      lng: cL14?.lng ?? null,
    },
  });

  // ── SVERIGE: Stockholm ──
  const c9 = await geocodeAddress("Strandvägen 1, Stockholm, Sweden");
  await sleep(1100);
  const schoolSweden3 = await prisma.school.create({
    data: {
      name: "Stockholm Wake Park",
      country: "Sweden",
      city: "Stockholm",
      address: "Strandvägen 1",
      lat: c9?.lat ?? null,
      lng: c9?.lng ?? null,
    },
  });

  const cL15 = await geocodeAddress("Djurgårdsbrunnsviken, Stockholm, Sweden");
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
      lat: cL15?.lat ?? null,
      lng: cL15?.lng ?? null,
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
      lat: cL15?.lat ?? null,
      lng: cL15?.lng ?? null,
    },
  });

  // ── FRANKRIKE: Fontainebleau ──
  const c10 = await geocodeAddress("Route des Gorges 7, Fontainebleau, France");
  await sleep(1100);
  const schoolFrance3 = await prisma.school.create({
    data: {
      name: "Fontainebleau Climbing School",
      country: "France",
      city: "Fontainebleau",
      address: "Route des Gorges 7",
      lat: c10?.lat ?? null,
      lng: c10?.lng ?? null,
    },
  });

  const cL16 = await geocodeAddress("Forêt de Fontainebleau, France");
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
      lat: cL16?.lat ?? null,
      lng: cL16?.lng ?? null,
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
      lat: cL16?.lat ?? null,
      lng: cL16?.lng ?? null,
    },
  });

  // ── SPANIEN: Siurana ──
  const c11 = await geocodeAddress("Siurana, Tarragona, Spain");
  await sleep(1100);
  const schoolSpain3 = await prisma.school.create({
    data: {
      name: "Siurana Rock & Climb",
      country: "Spain",
      city: "Siurana",
      address: "Carrer de la Roca 1",
      lat: c11?.lat ?? null,
      lng: c11?.lng ?? null,
    },
  });

  const cL17 = await geocodeAddress("Siurana climbing area, Tarragona, Spain");
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
      lat: cL17?.lat ?? null,
      lng: cL17?.lng ?? null,
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
      lat: cL17?.lat ?? null,
      lng: cL17?.lng ?? null,
    },
  });

  // ── LEDIGA TIDER ──
  await prisma.availableTime.createMany({
    data: [
      // Portugal 1 – surf beginner
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
      // Portugal 1 – surf advanced
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
      // Portugal 2 – kitesurf beginner
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
      // Portugal 2 – windsurf intermediate
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
      // Spanien 1 – kitesurf beginner
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
      // Spanien 1 – windsurf advanced
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
      // Spanien 2 – surf beginner
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
      // Spanien 2 – wakeboard beginner
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
      // Spanien 3 – climbing intermediate
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
      // Spanien 3 – climbing advanced
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
      // Frankrike 1 – surf intermediate
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
      // Frankrike 1 – surf private beginner
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
      // Frankrike 2 – snowboard beginner
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
      // Frankrike 2 – snowboard advanced
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
      // Frankrike 3 – climbing beginner
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
      // Frankrike 3 – climbing intermediate
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
      // Sverige 1 – windsurf intermediate
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
      // Sverige 1 – kitesurf beginner
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
      // Sverige 2 – snowboard beginner
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
      // Sverige 2 – snowboard intermediate
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
      // Sverige 3 – wakeboard beginner
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
      // Sverige 3 – wakeboard advanced
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
