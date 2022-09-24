export type Show = {
   id: number;
   name: string;
   summary: string;
   language: string;
   genres: string[];
   schedule: {
      time: string;
      days: string[];
   };
   image: {
      medium: string;
      original: string;
   };
   isHidden?: boolean;
   _embedded?: {
      episodes?: Episode[];
      seasons?: Season[];
   }
}

export type ShowWithSeasons = Show & {
   _embedded: {
      seasons: Season[]
   }
}

export type Season = {
   id: number;
   number: number;
   episodeOrder: number;
}

export type Episode = {
   id: number;
   name: string;
   number: number;
   season: number;
   summary: string;
   image?: {
      medium: string;
      original: string;
   };
}