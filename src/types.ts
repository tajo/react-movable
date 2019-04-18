interface IVoiceover {
  item: (position: number) => string;
  lifted: (position: number) => string;
  dropped: (from: number, to: number) => string;
  moved: (position: number, up: boolean) => string;
  canceled: (position: number) => string;
}

export interface IItemProps {
  key?: number;
  tabIndex?: number;
  'aria-roledescription'?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onWheel?: (e: React.WheelEvent) => void;
  style?: React.CSSProperties;
  ref?: React.RefObject<any>;
}

export interface IProps<Value> {
  beforeDrag?: (params: { elements: Element[]; index: number }) => void;
  renderItem: (params: {
    value: Value;
    props: IItemProps;
    index?: number;
    isDragged: boolean;
    isSelected: boolean;
  }) => React.ReactNode;
  renderList: (props: {
    children: React.ReactNode;
    isDragged: boolean;
    props: {
      ref: React.RefObject<any>;
    };
  }) => React.ReactNode;
  values: Value[];
  onChange: (meta: { oldIndex: number; newIndex: number }) => void;
  transitionDuration: number;
  lockVertically: boolean;
  voiceover: IVoiceover;
}

export type TEvent = React.MouseEvent | React.TouchEvent | React.KeyboardEvent;
