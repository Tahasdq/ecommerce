export type id  = String | number

export interface itemTypes {
    name:string,
    trigger:Boolean,
    links ?: string[],
    href : string
}

export interface SelectedSize {
    id?:string | number
    sizeName?:string 
}
export interface SelectedColor {
    id?:string | number
    colorName?:string 
}