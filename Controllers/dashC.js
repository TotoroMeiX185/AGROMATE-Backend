// controllers/adminStatsController.js
import Farmer from '../Models/Farmer.js';
import Crop from '../Models/Crop.js';
import Finance from '../Models/Finance.js';

export const getRegisteredFarmersCount = async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments({ status: 'approved' });
    res.status(200).json({ totalFarmers });
  } catch (error) {
    console.error('Error getting registered farmers count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTotalLandArea = async (req, res) => {
  try {
    const result = await Crop.aggregate([
      //{ $match: { isApproved: {type : Boolean , default: false} } },
      { $group: { _id: null, totalLandUsed: { $sum: "$totalLandUsed" } } }
    ]);

    const totalLandUsed = result.length > 0 ? result[0].totalLandUsed : 0;
    res.status(200).json({ totalLandArea: totalLandUsed});
  } catch (error) {
    console.error("Error fetching total land area:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubsidyStats = async (req, res) => {
  try {
    
    const totalFarmers = await Farmer.distinct('farmerId').countDocuments();
    
    const moneyAgg = await Finance.aggregate([
      { $group: { 
        _id: null, 
        totalMoney: { $sum: '$moneySubsidies' }
      } }
    ]);

    const totalMoney = moneyAgg[0]?.totalMoney || 0;

    const ferAgg = await Finance.aggregate([
      { $group: { 
        _id: null, 
        totalFertilizer: { $sum: '$fertilizerSubsidies'
         }}}]);
    
 const totalFertilizer = ferAgg[0]?.totalFertilizer || 0;

    res.json({
      totalFarmers,
      money: totalMoney,
      fertilizer: totalFertilizer
    });
  } catch (error) {
    console.error('Error getting subsidy stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCultivatedCropsStats = async (req, res) => {
  try {
    // Aggregate number of farmers cultivating each crop
    const crops = await Crop.aggregate([
      {
        $group: {
          _id: '$cropName',
          count: { $addToSet: '$farmerId' }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: { $size: '$count' }
        }
      }
    ]);

    res.json({ crops });
  } catch (error) {
    console.error('Error getting cultivated crops stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};