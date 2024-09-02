declare global {
    const selectedPacks: Record<string, CategoryMetadata[]>
    const selectedPacksShow: Record<string, CategoryMetadata[]>

    /** Reference to a list of each applied change on every pack */
    const selector: HTMLDivElement

    const version: string

    const categories: Category[]

    // interface declared inside 'global' namespace
    // to avoid tsc to generate `export {}` at 'main.js' result file
    export interface CategoryMetadata {
        readonly id:   string;
        readonly name: string;
    }
}

export interface Warning {
    color: string
    text: string
}

export interface BasePack {
    name: string
    display: string
    description: string
    incompatible: string[]
}

export interface ComplexPack extends BasePack {
    priority?: number
    experiment?: boolean
    previewExtension?: string
}

export interface MostComplexPack extends ComplexCategory {
    video?: string
}

export interface BaseCategory {
    category: string
    packs: BasePack[]
}

export interface ComplexCategory extends BaseCategory {
    category: string
    packs: ComplexPack[]
    warning?: Warning
    categories?: BaseCategory[]
}

export interface Category {
    category: string
    packs: MostComplexPack[]
    categories?: Category[]
    warning?: Warning
}

export {} // module treating by tsc