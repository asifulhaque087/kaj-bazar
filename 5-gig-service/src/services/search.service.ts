import { GigModel } from '@gig/models/gig.schema';

import { IPaginateProps, ISearchResult } from '@fvoid/shared-lib';

// Search gigs by sellerId and active status
const gigsSearchBySellerId = async (searchQuery: string, active: boolean): Promise<ISearchResult> => {
  // const gigs = await GigModel.find({
  //   sellerId: new RegExp(searchQuery, 'i'),
  //   active
  // }).lean();

  const gigs = await GigModel.find({
    sellerId: new RegExp(searchQuery, 'i'),
    active
  });

  const total = await GigModel.countDocuments({
    sellerId: new RegExp(searchQuery, 'i'),
    active
  });

  return {
    total,
    hits: gigs
  };
};

// General gig search with optional filters
const gigsSearch = async (
  searchQuery: string,
  paginate: IPaginateProps,
  deliveryTime?: string,
  min?: number,
  max?: number
): Promise<ISearchResult> => {
  const { from, size, type } = paginate;

  const query: any = {
    active: true,
    $or: [
      { username: new RegExp(searchQuery, 'i') },
      { title: new RegExp(searchQuery, 'i') },
      { description: new RegExp(searchQuery, 'i') },
      { basicDescription: new RegExp(searchQuery, 'i') },
      { basicTitle: new RegExp(searchQuery, 'i') },
      { categories: new RegExp(searchQuery, 'i') },
      { subCategories: new RegExp(searchQuery, 'i') },
      { tags: new RegExp(searchQuery, 'i') }
    ]
  };

  if (typeof deliveryTime === 'string' && deliveryTime.trim() !== '') {
    query.expectedDelivery = new RegExp(deliveryTime, 'i');
  }

  if (!isNaN(min!) && !isNaN(max!)) {
    query.price = { $gte: min, $lte: max };
  }

  const sortDirection = type === 'forward' ? 1 : -1;

  // const gigs = await GigModel.find(query).sort({ sortId: sortDirection, _id: sortDirection }).skip(Number(from)).limit(size).lean();

  const gigs = await GigModel.find(query).sort({ sortId: sortDirection, _id: sortDirection }).skip(Number(from)).limit(size);
  const total = await GigModel.countDocuments(query);

  return {
    total,
    hits: gigs
  };
};

// Search gigs by category name
const gigsSearchByCategory = async (searchQuery: string): Promise<ISearchResult> => {
  const query = {
    active: true,
    categories: new RegExp(searchQuery, 'i')
  };

  // const gigs = await GigModel.find(query).limit(10).lean();
  const gigs = await GigModel.find(query).limit(10);
  const total = await GigModel.countDocuments(query);

  return {
    total,
    hits: gigs
  };
};

// Get similar gigs based on a given gig
const getMoreGigsLikeThis = async (gigId: string): Promise<ISearchResult> => {
  // const baseGig = await GigModel.findById(gigId).lean();
  const baseGig = await GigModel.findById(gigId);
  if (!baseGig) return { total: 0, hits: [] };

  const query = {
    _id: { $ne: gigId },
    active: true,
    $or: [{ categories: { $in: baseGig.categories } }, { subCategories: { $in: baseGig.subCategories } }, { tags: { $in: baseGig.tags } }]
  };

  // const gigs = await GigModel.find(query).limit(5).lean();
  const gigs = await GigModel.find(query).limit(5);
  const total = await GigModel.countDocuments(query);

  return {
    total,
    hits: gigs
  };
};

// Get top-rated gigs in a category (ratingSum / ratingsCount === 5)
const getTopRatedGigsByCategory = async (searchQuery: string): Promise<ISearchResult> => {
  const query = {
    categories: new RegExp(searchQuery, 'i'),
    active: true,
    ratingSum: { $gt: 0 },
    ratingsCount: { $gt: 0 }
  };

  const gigs = await GigModel.aggregate([
    { $match: query },
    {
      $addFields: {
        ratingAvg: { $divide: ['$ratingSum', '$ratingsCount'] }
      }
    },
    { $match: { ratingAvg: 5 } },
    { $limit: 10 }
  ]);

  return {
    total: gigs.length,
    hits: gigs
  };
};

export { gigsSearchBySellerId, gigsSearch, gigsSearchByCategory, getMoreGigsLikeThis, getTopRatedGigsByCategory };
