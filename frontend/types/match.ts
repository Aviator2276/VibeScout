export interface Team {
  number: number;
  name: string;
}

export interface Competition {
  name: string;
  code: string;
}

export interface Match {
  blue_team_1: Team;
  blue_team_2: Team;
  blue_team_3: Team;
  red_team_1: Team;
  red_team_2: Team;
  red_team_3: Team;
  competition: Competition;
  match_number: number;
  total_points: number;
  total_blue_fuels: number;
  total_red_fuels: number;
  blue_1_auto_fuel: number;
  blue_2_auto_fuel: number;
  blue_3_auto_fuel: number;
  red_1_auto_fuel: number;
  red_2_auto_fuel: number;
  red_3_auto_fuel: number;
  blue_1_teleop_fuel: number;
  blue_2_teleop_fuel: number;
  blue_3_teleop_fuel: number;
  red_1_teleop_fuel: number;
  red_2_teleop_fuel: number;
  red_3_teleop_fuel: number;
  blue_1_fuel_scored: number;
  blue_2_fuel_scored: number;
  blue_3_fuel_scored: number;
  red_1_fuel_scored: number;
  red_2_fuel_scored: number;
  red_3_fuel_scored: number;
  calculated_points: number;
}
