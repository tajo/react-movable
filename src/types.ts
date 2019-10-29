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
  beforeDrag?: (params: { elements: Element[]; index: number; targetRect: ClientRect }) => void;
  onMove?: (params: { clientX: number; clientY: number }) => void;
  afterDrag?: (params: { elements: Element[]; index: number; targetRect: ClientRect }) => void;
  renderItem: (params: {
    value: Value;
    props: IItemProps;
    index?: number;
    isDragged: boolean;
    isSelected: boolean;
    isOutOfBounds: boolean;
  }) => React.ReactNode;
  renderList: (props: {
    children: React.ReactNode;
    isDragged: boolean;
    props: {
      ref: React.RefObject<any>;
    };
  }) => React.ReactNode;
  values: Value[];
  onChange: (meta: {
    oldIndex: number;
    newIndex: number;
    targetRect: ClientRect;
  }) => void;
  transitionDuration: number;
  removableByMove: boolean;
  lockVertically: boolean;
  voiceover: IVoiceover;
}

export type TEvent = React.MouseEvent | React.TouchEvent | React.KeyboardEvent;
