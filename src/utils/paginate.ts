export const paginate = (data:any, page:any, limit:any) => {
  const { count: totalItems, rows: items } = data;
  if (!page && !limit) {
    return { totalItems, items };
  } 
  const currentPage = page ? +page : 0;
  const nextPage = (totalItems / limit) > page ? (+page + 1) : null;
  const previousPage = page <= 1 ? null : page - 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, items, totalPages, currentPage, nextPage, previousPage };
};
