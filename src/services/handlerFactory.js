import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/classes/apiError.js";
import { ApiFeatures } from "../utils/classes/apiFeatures.js";

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document found with id ${id}`, 404));
    }

    // to trigger 'remove' events in mongooose middleware
    await document.remove();
    res.status(204).send();
  });

const getOne = (Model, populationOption) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // 1 ) Build Query
    let query = Model.findById(id);
    if (populationOption) {
      query = query.populate(populationOption);
    }
    // 2 ) excute query
    const document = await query;
    if (!document) {
      return next(new ApiError(`No document found with id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`No document found with id ${req.params.id}`, 404)
      );
    }
    // trigger 'save' events in models files
    document.save();
    res.status(200).json({ data: document });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });

const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCount)
      .filter()
      .search()
      .selectFields()
      .sort();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

export { createOne, deleteOne, getOne, updateOne, getAll };
