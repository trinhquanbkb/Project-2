const { Categories } = require("../models");

//CRUD category
const getAllCategory = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    //get category with parent_id is null
    const parentCate = [];
    categories.forEach((item) => {
      if (item.parent_id == null) {
        const childrent = [];
        parentCate.push({ ...item.dataValues, childrent });
      }
    });
    //function get childrent category
    const getChildrentCate = (cate) => {
      parentCate.forEach((item) => {
        //push children if children lv1
        if (cate.parent_id != null && cate.parent_id == item.id) {
          const childrent = [];
          item.childrent.push({ ...cate, childrent });
        }
        //push children if children lv2
        else if (cate.parent_id != null && cate.parent_id !== item.id) {
          item.childrent.forEach((cate2) => {
            if (cate2.id == cate.parent_id) {
              cate2.childrent.push(cate);
            }
          });
        }
      });
    };
    categories.forEach((item) => {
      if (item.dataValues.parent_id != null) {
        getChildrentCate(item.dataValues);
      }
    });
    if (categories) {
      res.status(200).send(parentCate);
    } else {
      throw new Error("Cannot get all category");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCategory = async (req, res) => {
  const { parent_id, name_category } = req.body;
  try {
    const newCategory = await Categories.create({
      parent_id,
      name_category,
    });
    if (newCategory) {
      res.status(201).send(newCategory);
    } else {
      throw new Error("Cannot create new category");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateCategory = async (req, res) => {
  const { parent_id, name_category } = req.body;
  const { id } = req.query;
  try {
    const category = await Categories.update(
      {
        parent_id,
        name_category,
      },
      {
        where: {
          id,
        },
      }
    );
    if (category) {
      res.status(201).send(`Success update category id = ${id}`);
    } else {
      throw new Error("Cannot update category");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.query;
  try {
    const category = await Categories.destroy({
      where: {
        id,
      },
    });
    if (category) {
      res.status(200).send(`Success delete category id = ${id}`);
    } else {
      throw new Error("Cannot delete category");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
