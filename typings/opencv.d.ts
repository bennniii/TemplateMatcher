// Type definitions for @u4/opencv4nodejs
// Used for building without a direct dependency on OpenCV

declare module '@u4/opencv4nodejs' {
  export class Point2 {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }

  export class Rect {
    constructor(x: number, y: number, width: number, height: number);
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export class Mat {
    constructor(data: Buffer, rows: number, cols: number, type: number);
    rows: number;
    cols: number;
    empty: boolean;
    channels: number;
    getData(): Buffer;
    matchTemplateAsync(template: Mat, method: number): Promise<Mat>;
    minMaxLocAsync(): Promise<{ minVal: number; maxVal: number; minLoc: Point2; maxLoc: Point2 }>;
    cvtColorAsync(code: number): Promise<Mat>;
    getRegion(rect: Rect): Mat;
    resizeAsync(rows: number, cols: number, fx: number, fy: number, interpolation: number): Promise<Mat>;
  }

  export const CV_8UC3: number;
  export const CV_8UC4: number;
  export const COLOR_RGBA2BGR: number;
  export const COLOR_BGRA2BGR: number;
  export const COLOR_RGB2BGR: number;
  export const TM_SQDIFF_NORMED: number;
  export const INTER_AREA: number;

  export function imreadAsync(filePath: string, flags: number): Promise<Mat>;
  export const IMREAD_UNCHANGED: number;
}