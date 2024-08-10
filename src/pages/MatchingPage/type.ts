export interface Team {
    id: number;
    teamName: string;
    logo: string;
    date: string;
    time: string;
    ballparkName: string;
    
    maxParticipants: number;  // 최대 참가자 수
}

export interface MatchingContentProps {
    teams: Team[];  // teams.json 대신 API로부터 받은 팀 배열 타입
    limit?: number;  // 표시할 팀의 최대 개수
}

export interface Option {
    value: string;
    label: string;
    color?: string;  // 선택 사항: 필터에서 사용되는 색상 (선택 사항)
}

export interface OptionsData {
    teamOptions: Option[];  // 팀 필터 옵션
    stadiumOptions: Option[];  // 경기장 필터 옵션
}