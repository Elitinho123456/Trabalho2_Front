export interface Hero {
  id: string;
  name: string;
  level: number;
  power: number;
  skin: string;
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  heroId: string | null; // Foreign key simulation
}
