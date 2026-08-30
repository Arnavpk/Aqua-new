import { surat } from './surat';
import { indore } from './indore';
import { ahmedabad } from './ahmedabad';

const LOCATIONS = { surat, indore, ahmedabad };
export const DEFAULT_LOCATION = 'surat';
export function getLocation(slug) { return LOCATIONS[slug] ?? null; }
export function getAllLocations() { return Object.values(LOCATIONS); }
export function getAllLocationSlugs() { return Object.keys(LOCATIONS); }
export function isValidLocation(slug) { return slug in LOCATIONS; }