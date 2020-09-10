type TagListState = {
  tagList: { id: number; tagName: string }[];
  findedTagName: string | undefined;
}

type DataSourceItem = { type: string; tagName: string[]; date: string; amount: string; notes: string }