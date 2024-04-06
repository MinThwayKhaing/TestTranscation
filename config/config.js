module.exports = {
  pointAllocationRule: {
    amountThreshold: parseInt(process.env.amountThreshold),
    pointsPerDollar: parseInt(process.env.pointsPerDollar),
  },
};
