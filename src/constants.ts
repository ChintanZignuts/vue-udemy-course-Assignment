export const Periods = ['Today', 'This Week', 'This Month'] as const
export type Period = (typeof Periods)[number]
