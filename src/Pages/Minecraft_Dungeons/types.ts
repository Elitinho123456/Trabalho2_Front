export interface Item{
  id: number;
  nome: string;
  poder: number;
  raridade: 'Comum' | 'Raro' | 'Único';
  categoria_id: number;
}

export interface Categoria{
  id: number;
  nome: string; 
}
export interface ReportItem extends Omit<Item, 'categoria_id'>{
  nome_categoria: string;
}