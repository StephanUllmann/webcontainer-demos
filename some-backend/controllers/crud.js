const createOne = (Model) => async (req, res) => {
  const data = await Model.create(req.body);
  res.status(201).json({ data });
};

const getAll = (Model) => async (_req, res) => {
  const data = await Model.find();
  res.json({ data });
};

const getOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findById(id);
  if (!data) throw new Error(`${Model.modelName} not found`, { cause: 404 });
  res.json({ data });
};

const updateOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!data) throw new Error(`${Model.modelName} not found`, { cause: 404 });

  res.json({ data });
};

const deleteOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findByIdAndDelete(id);
  if (!data) throw new Error(`${Model.modelName} not found`, { cause: 404 });

  res.json({ data });
};

export { createOne, getAll, getOne, updateOne, deleteOne };
