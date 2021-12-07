export interface SyntaxNode {
  type: string;
  start: number;
  end: number;
  text: string;
  children: SyntaxNode[];
}
