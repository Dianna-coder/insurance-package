export interface ICalculateRiskScore {
  calculateVeryLowRiskScore(score: number): number;
  calculateLowRiskScore(score: number): number;
  calculateHighRiskScore(score: number): number;
  calculateIneligibleRiskScore(): number;
}
