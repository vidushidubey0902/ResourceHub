const calculateAverageRating = (ratings) => {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  return total / ratings.length;
};

const calculateRatingBreakdown = (ratings) => {
  const breakdown = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  ratings.forEach((r) => {
    breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
  });

  return breakdown;
};

export { calculateAverageRating, calculateRatingBreakdown };
