import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface Data {
  id: string;
  area_id: string;
  priority: number;
  timestamp: Date;
  temperature: Float;
  air_flow: Float;
  co2: Float;
  solved: boolean;
}