import { GameResource } from '../../interfaces/game';
import { GameTeamBoxScoreResource } from '../../interfaces/gameTeamBoxScore';
import { PlayerStatisticsResource, TeamStatisticsResource } from '../../interfaces/stats';
import { TeamStatuses } from '../../interfaces/team';
import { TeamQuarterScoreStatsResource } from '../../interfaces/teamQuarterScoreStatsResource';

const mapStats = (stats: TeamStatisticsResource | PlayerStatisticsResource) => {
  return {
    ...stats,
    freeThrowPointsWithAttempts: `${stats.freeThrowPoints}/${stats.freeThrowPointsAttempts}`,
    twoPointsWithAttempts: `${stats.twoPoints}/${stats.twoPointsAttempts}`,
    threePointsWithAttempts: `${stats.threePoints}/${stats.threePointsAttempts}`,
  };
};

const mapBoxscore = (boxscore: GameTeamBoxScoreResource, status: TeamStatuses) => {
  return {
    ...boxscore[status],
    playerStats: boxscore[status].playerStats.map(item => ({
      ...item,
      stats: mapStats(item.stats),
    })),
  };
};

const mapQuarterScores = (
  quarterScores: TeamQuarterScoreStatsResource,
  status: TeamStatuses,
  oppositeStatus: TeamStatuses,
) => {
  return {
    ...quarterScores[status],
    byQuarter: quarterScores[status].byQuarter.map((quarter, index) => ({
      ...quarter,
      isHighLighted: quarter.score > quarterScores[oppositeStatus].byQuarter[index].score,
    })),
    total: {
      score: quarterScores[status].total,
      isHighLighted: quarterScores[status].total > quarterScores[oppositeStatus].total,
    },
  };
};

export const mapGameDetails = (
  data: Omit<GameResource, 'gameChat' | 'predictions' | 'canUserInteractWithGamePredictions' | 'reaction'>,
) => {
  return {
    ...data,
    boxscore: data.boxscore
      ? {
          ...data.boxscore,
          home: mapBoxscore(data.boxscore, TeamStatuses.Home),
          away: mapBoxscore(data.boxscore, TeamStatuses.Away),
        }
      : null,
    statistics: data.statistics
      ? {
          ...data.statistics,
          comparison: {
            ...data.statistics.comparison,
            home: {
              ...data.statistics.comparison.home,
              stats: mapStats(data.statistics.comparison.home.stats),
            },
            away: {
              ...data.statistics.comparison.away,
              stats: mapStats(data.statistics.comparison.away.stats),
            },
          },
          quarterScores: {
            ...data.statistics.quarterScores,
            home: mapQuarterScores(data.statistics.quarterScores, TeamStatuses.Home, TeamStatuses.Away),
            away: mapQuarterScores(data.statistics.quarterScores, TeamStatuses.Away, TeamStatuses.Home),
          },
        }
      : null,
  };
};
