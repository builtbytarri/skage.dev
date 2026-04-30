export const NIGERIAN_STATES: { state: string; capital: string }[] = [
  { state: 'Abia', capital: 'Umuahia' },
  { state: 'Adamawa', capital: 'Yola' },
  { state: 'Akwa Ibom', capital: 'Uyo' },
  { state: 'Anambra', capital: 'Awka' },
  { state: 'Bauchi', capital: 'Bauchi' },
  { state: 'Bayelsa', capital: 'Yenagoa' },
  { state: 'Benue', capital: 'Makurdi' },
  { state: 'Borno', capital: 'Maiduguri' },
  { state: 'Cross River', capital: 'Calabar' },
  { state: 'Delta', capital: 'Asaba' },
  { state: 'Ebonyi', capital: 'Abakaliki' },
  { state: 'Edo', capital: 'Benin City' },
  { state: 'Ekiti', capital: 'Ado Ekiti' },
  { state: 'Enugu', capital: 'Enugu' },
  { state: 'FCT', capital: 'Abuja' },
  { state: 'Gombe', capital: 'Gombe' },
  { state: 'Imo', capital: 'Owerri' },
  { state: 'Jigawa', capital: 'Dutse' },
  { state: 'Kaduna', capital: 'Kaduna' },
  { state: 'Kano', capital: 'Kano' },
  { state: 'Katsina', capital: 'Katsina' },
  { state: 'Kebbi', capital: 'Birnin Kebbi' },
  { state: 'Kogi', capital: 'Lokoja' },
  { state: 'Kwara', capital: 'Ilorin' },
  { state: 'Lagos', capital: 'Ikeja' },
  { state: 'Nasarawa', capital: 'Lafia' },
  { state: 'Niger', capital: 'Minna' },
  { state: 'Ogun', capital: 'Abeokuta' },
  { state: 'Ondo', capital: 'Akure' },
  { state: 'Osun', capital: 'Osogbo' },
  { state: 'Oyo', capital: 'Ibadan' },
  { state: 'Plateau', capital: 'Jos' },
  { state: 'Rivers', capital: 'Port Harcourt' },
  { state: 'Sokoto', capital: 'Sokoto' },
  { state: 'Taraba', capital: 'Jalingo' },
  { state: 'Yobe', capital: 'Damaturu' },
  { state: 'Zamfara', capital: 'Gusau' },
]

// Dropdown options: state names + Abuja alias for FCT
export const STATE_OPTIONS = NIGERIAN_STATES.map((s) =>
  s.state === 'FCT' ? 'Abuja (FCT)' : s.state
)

// Normalise any free-text entry (old data) to its canonical state name.
// Matches against state names, capitals, and common aliases — case/whitespace insensitive.
const lookup: Record<string, string> = {}
NIGERIAN_STATES.forEach(({ state, capital }) => {
  const canonical = state === 'FCT' ? 'Abuja (FCT)' : state
  lookup[state.toLowerCase().trim()] = canonical
  lookup[capital.toLowerCase().trim()] = canonical
})
// Extra aliases
lookup['abuja'] = 'Abuja (FCT)'
lookup['fct'] = 'Abuja (FCT)'
lookup['benin'] = 'Edo'          // people often say "Benin" for Benin City
lookup['ph'] = 'Rivers'          // Port Harcourt shorthand
lookup['port harcourt'] = 'Rivers'
lookup['ado ekiti'] = 'Ekiti'
lookup['ikeja'] = 'Lagos'

export function normalizeState(raw: string): string {
  const key = raw.toLowerCase().trim()
  return lookup[key] ?? raw.trim()
}
