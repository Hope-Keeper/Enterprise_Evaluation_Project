export interface FamilyType {
    jobFamilyId: string;
    jobFamilyName: string;
    dimensionCount: number;
    meritCount: number;
    questionCount: number;
    jobFamilyIsActive: boolean;
}
export interface DimensionType {
    dimensionTitle: string;
    dimensionId: string;
    questionCount?: string;
    dimensionIsActive: boolean;
    meritCount: number;
    merits: MeritType[];
}

export interface MeritType {
    meritId: string;
    meritTitle: string;
    meritIsActive: boolean;
    questionCount: number;
    meritDimensionId: string;
    meritCreatedAt: string;
    questions: QuestionType[];
}
export interface QuestionType {
    questionContent: string;
    questionId: string;
    questionIsActive: boolean;
    questionMeritId: string;
    questionCreatedAt: string;
}
export interface DimensionSummeryType {
    dimensionId: string;
    dimensionTitle: string;
    meritCount: number;
    questionCount: number;
    dimensionIsActive: boolean;
    dimensionJobFamilyId?: string;
    dimensionJobFamilyTitle?: string;
}
export interface MeritSummeryType {
    meritId: string;
    meritTitle: string;
    questionCount: number;
    meritIsActive: boolean;
}

export interface QuestionSummeryType {
    questionId: string;
    questionContent: string;
    questionIsActive: boolean;
}
