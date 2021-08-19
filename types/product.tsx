/* eslint-disable camelcase */
export interface PackageDimensions {
    height: number;
    length: number;
    weight: number;
    width: number;
}
export interface ProductInstance {
    name: string;
    description?: string;
    images?: string[];
    package_dimensions?: PackageDimensions;
    metadata?: { [field: string]: string };
    shippable?: boolean;
    statement_descriptor?: string,
    tax_code?: string,
    unit_label?: string,
    url?: string;
}

export interface Product {
    _id: string;
    name: string;
    active: boolean;
    description?: string;
    images: string[];
    package_dimensions?: PackageDimensions;
    metadata?: { [field: string]: string };
    shippable?: boolean;
    statement_descriptor?: string,
    tax_code?: string,
    unit_label?: string,
    url?: string;
    updated: number;
    created: number; // unix_time
  }
