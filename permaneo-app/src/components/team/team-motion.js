export const TEAM_POSITIONS = 5;
export const POSITION_ANGLE = 360 / TEAM_POSITIONS;
export const BOOK_OPEN_MS = 650;
export const PAGE_HALF_MS = 300;
export const memberIndex = (position) => ((Math.round(position) % TEAM_POSITIONS) + TEAM_POSITIONS) % TEAM_POSITIONS;
export const nearestPosition = (position, index) => Math.round(position) + ((index - memberIndex(position) + 7) % TEAM_POSITIONS - 2);
export const snapPosition = (position, velocity) => Math.round(position + Math.max(-0.65, Math.min(0.65, velocity * 140)));
export const wheelIntent = (dx, dy, shift) => shift || Math.abs(dx) > Math.abs(dy) * 1.2;
