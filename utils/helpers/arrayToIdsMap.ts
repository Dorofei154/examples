import { AnyObject } from '../../interfaces/anyObject';

export const arrayToIdsMap: (data: Array<any>, idParamName?: string) => { ids: string[]; items: AnyObject } = (
  data,
  idParamName = 'id',
) => {
  return data.reduce(
    (acc, item) => {
      return { ...acc, ids: [...acc.ids, item[idParamName]], items: { ...acc.items, [item[idParamName]]: item } };
    },
    { ids: [], items: {} },
  );
};
