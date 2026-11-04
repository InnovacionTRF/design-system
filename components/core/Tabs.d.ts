/**
 * Underline tab bar with an animated orange indicator.
 */
export interface TabItem { id: string; label: string; }

export interface TabsProps {
  /** Tab definitions. */
  items: TabItem[];
  /** Selected tab id (controlled). */
  value: string;
  /** Called with the next tab id. */
  onChange?: (id: string) => void;
  style?: object;
}

export function Tabs(props: TabsProps): JSX.Element;
