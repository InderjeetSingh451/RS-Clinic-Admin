import Medicine from "../models/medicineModel.js";

const searchMedicine = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.json({
        success: true,
        medicines: [],
      });
    }

    const medicines = await Medicine.find({
      name: {
        $regex: "^" + q,
        $options: "i",
      },
    })
      .limit(8)
      .select("name");

    res.json({
      success: true,
      medicines,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { searchMedicine };
