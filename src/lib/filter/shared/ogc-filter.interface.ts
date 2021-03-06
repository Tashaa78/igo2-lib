
export interface OgcFilter extends ol.format.filter.Filter {}

export interface WFSWriteGetFeatureOptions extends olx.format.WFSWriteGetFeatureOptions {}


export type AnyBaseOgcFilterOptions =
  OgcFilterCondionsArrayOptions |OgcFilterSpatialOptions | OgcFilterDuringOptions |
  OgcFilterIsBetweenOptions | OgcFilterEqualToOptions | OgcFilterGreaterLessOptions |
  OgcFilterIsLikeOptions | OgcFilterIsNullOptions;

export type IgoOgcFilterObject = IgoLogicalArrayOptions | AnyBaseOgcFilterOptions;



export interface IgoLogicalArrayOptions {
  logical: string,
  filters: IgoLogicalArrayOptions[] | AnyBaseOgcFilterOptions
}

export interface OgcFilterCondionsArrayOptions {
  conditions: OgcFilter[]
}

export interface OgcFilterSpatialOptions {
  geometryName: string;
  geometry?: ol.geom.Geometry;
  extent?: ol.Extent;
  srsName?: string;
}
export interface OgcFilterAttributeOptions {
  propertyName: string;
}


export interface OgcFilterDuringOptions extends OgcFilterAttributeOptions {
  begin: string;
  end: string;
}


export interface OgcFilterIsBetweenOptions extends OgcFilterAttributeOptions {
  lowerBoundary: number;
  upperBoundary: number;
}


export interface OgcFilterEqualToOptions extends OgcFilterAttributeOptions {
  expression: string | number;
  matchCase: boolean;
}


export interface OgcFilterGreaterLessOptions extends OgcFilterAttributeOptions {
  expression: number;
}


export interface OgcFilterIsLikeOptions extends OgcFilterAttributeOptions {
  pattern: string;
  wildCard?: string;
  singleChar?: string;
  escapeChar?: string;
  matchCase: boolean;
}


export interface OgcFilterIsNullOptions extends OgcFilterAttributeOptions {}

