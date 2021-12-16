import { IList } from '../../interface/list-interface';

export interface IListState {
  lists: IList[];
}

export const initialState: IListState = {
  lists : []
};
