type IconName =
  | "refresh"
  | "home"
  | "plus"
  | "search"
  | "map"
  | "bell"
  | "list"
  | "coffee";

type StaticRoutes =
  | "/"
  | "/storybook/refresh"
  | "/storybook/authentication"
  | "/storybook/(ministack)"
  | "/storybook/google_map"
  | "/storybook/push_notification"
  | "/storybook/fetchTest"
  | "/storybook/list"
  | "/storybook/(thermal_data)"
  | "/storybook/(sunlight_exposure)"
  | "/storybook/(hvac_performance)";

export interface ClickableLinkProps {
  href: StaticRoutes;
  iconName: IconName;
  text: string;
  onPress?: () => void;
}

type buttonIcons = "info" | "analytics" | "assignment" | "event";

export interface buttonComponentProps {
  value?: string;
  iconName?: buttonIcons;
  information?: string;
}

export interface Reading {
  Timestamp: string;
  Location: string;
  [key: string]: string | number;
}

export type NavigationParamList = {
  navigate(arg0: string, arg1: { context: string | undefined }): void;
  Home: undefined;
  Details: { id: string };
  Modal: undefined;
  NotFound: undefined;
  Pages: { context: string };
  context?: string;
  detail_id?: string;
};

export type ChartDataset = {
  data: number[];
  color: () => string;
  strokeWidth: number;
};

export interface AreaCode {
  areaCode: string;
  dates: string[];
}

export interface Location {
  areaCode: string;
  dates: string[];
}
