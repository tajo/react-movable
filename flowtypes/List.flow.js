export interface IVoiceover {
  item: (position: number) => string;
  lifted: (position: number) => string;
  dropped: (from: number, to: number) => string;
  moved: (position: number, up: boolean) => string;
  canceled: (position: number) => string;
}
declare interface IItemProps {
  key?: number;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onWheel?: (e: React.WheelEvent) => void;
  style?: React.CSSProperties;
  ref?: React.RefObject<any>;
}
declare interface IListProps<Value> {
  renderItem: (params: {
    value: Value,
    props: IItemProps,
    index?: number,
    isDragged: boolean,
    isSelected: boolean
  }) => React.ReactNode;
  renderList: (props: {
    children: any,
    isDragged: boolean,
    props: {
      ref: React.RefObject<any>
    }
  }) => React.ReactNode;
  values: Value[];
  onChange: (meta: {
    oldIndex: number,
    newIndex: number
  }) => void;
  transitionDuration: number;
  lockVertically: boolean;
  voiceover: IVoiceover;
}
declare type TEvent = React.MouseEvent | React.TouchEvent | React.KeyboardEvent;
declare module.exports: typeof List;
