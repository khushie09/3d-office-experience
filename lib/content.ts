export type PlanVariant = 'lobby' | 'open' | 'private' | 'meeting' | 'conference' | 'lounge' | 'amenity';

export interface Space {
  id: string;
  title: string;
  eyebrow: string;
  body: string;
  features: string[];
  scene: number;
  plan: PlanVariant;
}

export const SPACES: Space[] = [
  {
    id: 'reception',
    title: 'Reception and lobby',
    eyebrow: 'Arrival',
    body: 'The lobby is the first room you enter from the street. A single oak desk sits on the axis of the entrance, so the corridor and the daylight from the façade are visible at once.',
    features: ['Desk on the entrance axis', 'Daylight from the full glass façade', 'Guest seating beside the entrance'],
    scene: 3,
    plan: 'lobby',
  },
  {
    id: 'open-workspace',
    title: 'Open workspace',
    eyebrow: 'Work',
    body: 'Long workstations run parallel to the façade, so every desk keeps a line of sight to the glass. Rows stay open to share light and to let people see across the floor.',
    features: ['Rows aligned to the façade grid', 'Desk placement planned around daylight', 'Monitor and standing-desk specification [to be confirmed]'],
    scene: 4,
    plan: 'open',
  },
  {
    id: 'private-offices',
    title: 'Private offices',
    eyebrow: 'Focus',
    body: 'Enclosed rooms for focused work and confidential conversations. Glazed upper panels keep natural light moving into the corridor.',
    features: ['Glazed upper panels', 'Acoustic door and sealed partition [to be confirmed]', 'Operable window [to be confirmed]'],
    scene: 6,
    plan: 'private',
  },
  {
    id: 'meeting-rooms',
    title: 'Meeting rooms',
    eyebrow: 'Discussion',
    body: 'Small glass-walled rooms set between the workspace and the corridor. Transparency keeps each room oriented to the building, while the walls keep discussions contained.',
    features: ['Glass walls in dark steel frames', 'Wall-mounted display', 'Table for six'],
    scene: 5,
    plan: 'meeting',
  },
  {
    id: 'conference-room',
    title: 'Conference room',
    eyebrow: 'Presentation',
    body: 'A larger room for presentations and client reviews, with a long table and a screen wall. It sits beside the meeting rooms at the same structural grid.',
    features: ['Table for ten', 'Screen wall', 'Acoustic ceiling [to be confirmed]'],
    scene: 5,
    plan: 'conference',
  },
  {
    id: 'lounge',
    title: 'Lounge and collaboration',
    eyebrow: 'Pause',
    body: 'A low, quiet area at the rear of the plan with sofas, a rug and warm timber. It is designed for informal meetings and for slowing down between tasks.',
    features: ['Timber wall and wool upholstery', 'Soft light from ceiling lamps', 'Collaboration tables [to be confirmed]'],
    scene: 7,
    plan: 'lounge',
  },
  {
    id: 'amenities',
    title: 'Amenities',
    eyebrow: 'Everyday',
    body: 'Shared facilities that support the working day: a café counter, quiet phone booths and bicycle storage. The final programme depends on the design brief.',
    features: ['Café counter [to be confirmed]', 'Phone booths', 'Bicycle storage [to be confirmed]'],
    scene: 8,
    plan: 'amenity',
  },
];

export const AMENITIES = [
  'Café counter [to be confirmed]',
  'Phone booths for private calls',
  'Bicycle storage [to be confirmed]',
  'Lounge seating and timber joinery',
  'Shared meeting rooms',
  'Daylit break areas [to be confirmed]',
];
