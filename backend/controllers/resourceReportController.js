import asyncHandler from "express-async-handler";

import ResourceReport from "../models/resourceReportModel.js";
import User from "../models/userModel.js";
import Resource from "../models/resourceModel.js";

const reportResource = asyncHandler(async (req, res) => {
  const { resourceId, reason, comments } = req.body;

  const resource = await Resource.findById(resourceId);
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  if (req.user._id.toString() === resourceId) {
    res.status(403);
    throw new Error("Can't report your own collection.");
  }

  const report = new ResourceReport({
    resource: resourceId,
    user: req.user._id,
    reason,
    comments,
  });

  await report.save();

  resource.reports.push(report._id);
  await resource.save();

  req.user.reports.push(report._id);
  await req.user.save();

  res.status(201).json({ message: "Resource reported successfully" });
});

const getReports = asyncHandler(async (req, res) => {
  const reports = await ResourceReport.find({})
    .populate("resource")
    .populate("user");
  res.json(reports);
});

const updateResourceStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const report = await ResourceReport.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  report.status = status;
  await report.save();

  res.json({ message: "Report status updated successfully" });
});

export { reportResource, getReports, updateResourceStatus };
