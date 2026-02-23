// Simple Vercel Serverless Function for tariff lookup

const TARIFFS = [
  {
    tariff_id: "TARIFF_BASIC",
    name: "Basic Saver",
    daily_charge: 0.52,
    monthly_charge: 15.99,
  },
  {
    tariff_id: "TARIFF_FLEX",
    name: "Flexible Plus",
    daily_charge: 0.68,
    monthly_charge: 21.49,
  },
];

/**
 * GET /api/tariffs
 *
 * Query parameters:
 * - ids (optional): comma-separated list of tariff_ids
 *   e.g. /api/tariffs?ids=TARIFF_BASIC,TARIFF_FLEX
 *
 * Behavior:
 * - If ids is provided: returns matching tariffs and any missing ids
 * - If ids is omitted: returns all available tariffs
 */
export default function handler(req, res) {
  // Allow only GET
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { ids } = req.query;

  // If no ids provided, return all tariffs
  if (!ids) {
    return res.status(200).json({
      tariffs: TARIFFS,
      missing_ids: [],
    });
  }

  // Support both comma-separated string and repeated query params
  const requestedIds = Array.isArray(ids)
    ? ids.flatMap((id) => id.split(","))
    : String(ids).split(",");

  const normalizedIds = requestedIds
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

  const found = [];
  const missing = [];

  const indexById = new Map(TARIFFS.map((t) => [t.tariff_id, t]));

  for (const id of normalizedIds) {
    const tariff = indexById.get(id);
    if (tariff) {
      // Avoid duplicates if same id requested multiple times
      if (!found.some((t) => t.tariff_id === id)) {
        found.push(tariff);
      }
    } else if (!missing.includes(id)) {
      missing.push(id);
    }
  }

  return res.status(200).json({
    tariffs: found,
    missing_ids: missing,
  });
}

