// Type definitions for @nut-tree/nut-js
// Used for building without a direct dependency on nut.js

declare module '@nut-tree/nut-js' {
  export class Region {
    constructor(left: number, top: number, width: number, height: number);
    left: number;
    top: number;
    width: number;
    height: number;
    center(): { x: number, y: number };
  }

  export class MatchResult {
    constructor(confidence: number, location: Region);
    confidence: number;
    location: Region;
  }

  export class Image {
    constructor(
      width: number,
      height: number,
      data: Buffer | Uint8Array,
      channels: number,
      id?: string,
      byteSize?: number,
      rowStride?: number
    );
    id: string;
    width: number;
    height: number;
    data: Buffer | Uint8Array;
    channels: number;
    pixelDensity: {
      scaleX: number;
      scaleY: number;
    };
    colorMode: ColorMode;
    hasAlphaChannel: boolean;
  }

  export enum ColorMode {
    RGB = 0,
    BGR = 1
  }

  export class MatchRequest<T, D> {
    constructor(haystack: T, needle: T, confidence: number, searchRegion?: Region, providerData?: D);
    haystack: T;
    needle: T;
    confidence: number;
    searchRegion?: Region;
    providerData?: D;
  }

  export interface ImageFinderInterface {
    findMatches<D>(matchRequest: MatchRequest<Image, D>): Promise<MatchResult[]>;
    findMatch<D>(matchRequest: MatchRequest<Image, D>): Promise<MatchResult>;
  }

  export interface ImageReader {
    load(path: string): Promise<Image>;
  }

  export const providerRegistry: {
    registerImageFinder(finder: ImageFinderInterface): void;
  };
}