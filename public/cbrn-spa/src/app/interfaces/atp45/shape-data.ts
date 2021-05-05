export interface Shape {
    lon: number[],
    lat: number[],
    type: string,
    label: string
    coords?: number[][],
    text?: string
}

export interface Wind {
    v: number,
    speed: number
    u: number,
}

export interface ShapeData {
    shapes: Shape[],
    wind: Wind,
    date: string,
    time: string,
    step: string
}