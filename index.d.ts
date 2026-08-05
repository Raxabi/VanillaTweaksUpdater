declare global {
    const selectedPacks: Record<string, CategoryMetadata[]>;
    const selectedPacksShow: Record<string, CategoryMetadata[]>;

    /** Reference to the right sidebar list of applied packs */
    const selector: HTMLDivElement;

    /** Current Minecraft version selected in the UI */
    const version: string;

    const categories: Category[];

    export interface CategoryMetadata {
        readonly id: string;
        readonly name: string;
    }
}

export interface Warning {
    color: string;
    text: string;
}

/** Unified Pack interface handling all possible Vanilla Tweaks pack properties */
export interface Pack {
    name: string;
    display: string;
    description: string;
    incompatible: string[];
    priority?: number;
    experiment?: boolean;
    previewExtension?: string;
    video?: string;
}

/** Unified Category interface handling nested subcategories and packs */
export interface Category {
    category: string;
    packs: Pack[];
    categories?: Category[]; // For nested subcategories
    warning?: Warning;
}

export {} // Ensures tsc treats this as a module without polluting global scope