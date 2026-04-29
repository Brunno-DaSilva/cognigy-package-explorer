export type NodeType =
  | "start"
  | "end"
  | "say"
  | "code"
  | "httpRequest"
  | "executeFlow"
  | "addToContext"
  | "completeGoal"
  | "emailNotification"
  | "if"
  | "switch"
  | "case"
  | "default"
  | "else"
  | "then"
  | "sleep"
  | "goTo"
  | "once"
  | "afterwards"
  | "onFirstExecution"
  | "setSessionConfig"
  | "placeholder"
  | string;

export interface CognigyFlow {
  _id: string;
  referenceId: string;
  name: string;
  description: string;
}

export interface CognigyNode {
  _id: string;
  referenceId: string;
  type: NodeType;
  label: string;
  comment: string;
  commentColor: string;
  analyticsLabel: string | null;
  isEntryPoint: boolean;
  isDisabled: boolean;
  flowId: string;
  flowName: string;
  chartId: string;
  rawConfig: Record<string, unknown>;
  textContent: string;
  contextVariables: string[];
  inputVariables: string[];
}

export interface CognigyPackageMeta {
  id: string;
  name: string;
  extractedAt: string;
  cognigyVersion: string;
}

export interface ParsedPackage extends CognigyPackageMeta {
  flows: CognigyFlow[];
  nodes: CognigyNode[];
  crossReferenceIndex: CrossReferenceIndex;
}

export interface CrossReferenceIndex {
  variableToNodes: Record<string, string[]>;
  flowToExecutors: Record<string, string[]>;
}

export interface SavedSearch {
  id: string;
  label: string;
  query: string;
  filters: SearchFilters;
  created_at: string;
}

export interface SearchFilters {
  nodeTypes: string[];
  flowIds: string[];
  showDisabled: boolean;
  entryPointOnly: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark";
  last_package_id: string | null;
  last_search_query: string | null;
}

export interface CognigyConfig {
  base_url: string;
  org_name: string | null;
}
