import teams  from "../../assets/teams.json";
export interface Team {
    id: number;
    name: string;
    logo: string;
    date: string;
    time: string;
    location: string;
    color: string;
}

export interface MatchingContentProps {
    teams: typeof teams;
    limit?: number;
}

export interface Option {
    value: string;
    label: string;
}

export interface OptionsData {
    teamOptions: Option[];
    stadiumOptions: Option[];
}