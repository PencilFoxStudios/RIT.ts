/**
 * Represents data associated with a term at RIT
 * @param currentTerm - The ID of the current RIT term
 * @param description - The description of the term
 * @param start_date - The date that the term starts
 * @param end_date - The date that the term ends
 */
export interface APICurrentTerm {
    currentTerm: string,
    description: string,
    start_date: string,
    end_date: string
}