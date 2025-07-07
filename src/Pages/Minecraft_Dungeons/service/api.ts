
import type { Hero, Artifact } from '../types';

const HEROES_KEY = 'mc_dungeons_heroes';
const ARTIFACTS_KEY = 'mc_dungeons_artifacts';

const ARTIFICIAL_DELAY = 500;

// --- Seeding Initial Data ---

const initialHeroes: Hero[] = [
  { id: '1', name: 'Valorie', level: 55, power: 108, skin: 'Default Valorie' },
  { id: '2', name: 'Hex', level: 48, power: 95, skin: 'Arch-Illager Acolyte' },
  { id: '3', name: 'Yumi', level: 62, power: 112, skin: 'Renegade Armor' },
];

const initialArtifacts: Artifact[] = [
  { id: 'a1', name: 'Boots of Swiftness', description: 'Grants a short speed boost.', cooldown: 5, heroId: '1' },
  { id: 'a2', name: 'Death Cap Mushroom', description: 'Greatly increases attack speed.', cooldown: 12, heroId: '1' },
  { id: 'a3', name: 'Corrupted Seeds', description: 'Summons 3 corrupted vines to fight for you.', cooldown: 20, heroId: '2' },
  { id: 'a4', name: 'Light Feather', description: 'Lets you tumble through the air, pushing mobs away.', cooldown: 3, heroId: null },
];

const seedData = () => {
  if (!localStorage.getItem(HEROES_KEY)) {
    localStorage.setItem(HEROES_KEY, JSON.stringify(initialHeroes));
  }
  if (!localStorage.getItem(ARTIFACTS_KEY)) {
    localStorage.setItem(ARTIFACTS_KEY, JSON.stringify(initialArtifacts));
  }
};

seedData();

// --- Generic API Helpers ---

const getItems = <T,>(key: string): T[] => {
  try {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return [];
  }
};

const saveItems = <T,>(key:string, items: T[]): void => {
  localStorage.setItem(key, JSON.stringify(items));
};


// --- Heroes API ---

export const heroApi = {
  async getAll(): Promise<Hero[]> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    return getItems<Hero>(HEROES_KEY);
  },
  async create(heroData: Omit<Hero, 'id'>): Promise<Hero> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    const heroes = getItems<Hero>(HEROES_KEY);
    const newHero: Hero = { id: new Date().toISOString(), ...heroData };
    saveItems<Hero>(HEROES_KEY, [...heroes, newHero]);
    return newHero;
  },
  async update(id: string, heroUpdate: Partial<Omit<Hero, 'id'>>): Promise<Hero> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    const heroes = getItems<Hero>(HEROES_KEY);
    let updatedHero: Hero | undefined;
    const updatedHeroes = heroes.map(h => {
      if (h.id === id) {
        updatedHero = { ...h, ...heroUpdate };
        return updatedHero;
      }
      return h;
    });
    if (!updatedHero) throw new Error('Hero not found');
    saveItems<Hero>(HEROES_KEY, updatedHeroes);
    return updatedHero;
  },
  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    let heroes = getItems<Hero>(HEROES_KEY);
    heroes = heroes.filter(h => h.id !== id);
    saveItems<Hero>(HEROES_KEY, heroes);
    // Also unassign artifacts from the deleted hero
    let artifacts = getItems<Artifact>(ARTIFACTS_KEY);
    artifacts = artifacts.map(a => a.heroId === id ? { ...a, heroId: null } : a);
    saveItems<Artifact>(ARTIFACTS_KEY, artifacts);
  }
};


// --- Artifacts API ---

export const artifactApi = {
  async getAll(): Promise<Artifact[]> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    return getItems<Artifact>(ARTIFACTS_KEY);
  },
  async create(artifactData: Omit<Artifact, 'id'>): Promise<Artifact> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    const artifacts = getItems<Artifact>(ARTIFACTS_KEY);
    const newArtifact: Artifact = { id: new Date().toISOString(), ...artifactData };
    saveItems<Artifact>(ARTIFACTS_KEY, [...artifacts, newArtifact]);
    return newArtifact;
  },
  async update(id: string, artifactUpdate: Partial<Omit<Artifact, 'id'>>): Promise<Artifact> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    const artifacts = getItems<Artifact>(ARTIFACTS_KEY);
    let updatedArtifact: Artifact | undefined;
    const updatedArtifacts = artifacts.map(a => {
      if (a.id === id) {
        updatedArtifact = { ...a, ...artifactUpdate };
        return updatedArtifact;
      }
      return a;
    });
    if (!updatedArtifact) throw new Error('Artifact not found');
    saveItems<Artifact>(ARTIFACTS_KEY, updatedArtifacts);
    return updatedArtifact;
  },
  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    let artifacts = getItems<Artifact>(ARTIFACTS_KEY);
    artifacts = artifacts.filter(a => a.id !== id);
    saveItems<Artifact>(ARTIFACTS_KEY, artifacts);
  }
};
