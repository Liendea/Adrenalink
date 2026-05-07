type Coordinates = {
  lat: number;
  lng: number;
};

export const geocodeAddress = async (
  address: string,
): Promise<Coordinates | null> => {
  try {
    const encoded = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        // Nominatim kräver en User-Agent
        "User-Agent": "ExtremeSchoolApp/1.0",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
};
