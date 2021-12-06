/**
 * Shared types that can be reused by Loki and other data sources
 */

import { DataSourceApi, SelectableValue } from '@grafana/data';
import { ComponentType } from 'react';

export interface QueryBuilderLabelFilter {
  label: string;
  op: string;
  value: string;
}

export interface QueryBuilderOperation {
  id: string;
  params: QueryBuilderOperationParamValue[];
}

export interface QueryWithOperations {
  operations: QueryBuilderOperation[];
}

export interface QueryBuilderOperationDef<T = any> {
  id: string;
  displayName?: string;
  params: QueryBuilderOperationParamDef[];
  defaultParams: QueryBuilderOperationParamValue[];
  category: string;
  renderer: QueryBuilderOperationRenderer;
  addHandler: (operation: QueryBuilderOperationDef, query: T) => T;
}

export type QueryBuilderOperationRenderer = (
  model: QueryBuilderOperation,
  def: QueryBuilderOperationDef,
  innerExpr: string
) => string;

export type QueryBuilderOperationParamValue = string | number;

export interface QueryBuilderOperationParamDef {
  name: string;
  type: string;
  options?: string[] | number[] | Array<SelectableValue<string>>;
  restParam?: boolean;
  optional?: boolean;
  editor?: ComponentType<QueryBuilderOperationParamEditorProps>;
}

export interface QueryBuilderOperationParamOptionLoadContext<TContextQuery = any, TDataSource = any> {
  loadQuery?: string;
  contextQuery: TContextQuery;
  datasource: TDataSource;
  operation: QueryBuilderOperation;
}

export interface QueryBuilderOperationParamEditorProps {
  value?: QueryBuilderOperationParamValue;
  paramDef: QueryBuilderOperationParamDef;
  index: number;
  operation: QueryBuilderOperation;
  query: any;
  datasource: DataSourceApi;
  onChange: (index: number, value: QueryBuilderOperationParamValue) => void;
  onRemove: (index: number) => void;
}

export enum QueryEditorMode {
  Builder,
  Code,
}

export interface VisualQueryModeller {
  getOperationsForCategory(category: string): QueryBuilderOperationDef[];
  getCategories(): string[];
  getOperationDef(id: string): QueryBuilderOperationDef;
}
