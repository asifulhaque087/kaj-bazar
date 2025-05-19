// import { elasticSearchClient, getDocumentById } from '@auth/elasticsearch';
// import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
// import { IHitsTotal, IPaginateProps, ISellerGig , ISearchResult} from '@fvoid/shared-lib';


// services/gigService.ts
// import { SellerGigModel } from '../models/SellerGigModel';
// import { HydratedDocument } from 'mongoose';

// export async function gigById(gigId: string): Promise<ISellerGig | null> {
//   const gig = await SellerGigModel.findById(gigId).lean(); // or remove .lean() for full Mongoose doc
//   return gig;
// }

// export async function gigsSearch(
//   searchQuery: string,
//   paginate: IPaginateProps,
//   deliveryTime?: string,
//   min?: number,
//   max?: number
// ): Promise<ISearchResult> {
//   const { from, size, type } = paginate;

//   const query: any = {
//     active: true,
//     $or: [
//       { username: new RegExp(searchQuery, 'i') },
//       { title: new RegExp(searchQuery, 'i') },
//       { description: new RegExp(searchQuery, 'i') },
//       { basicDescription: new RegExp(searchQuery, 'i') },
//       { basicTitle: new RegExp(searchQuery, 'i') },
//       { categories: new RegExp(searchQuery, 'i') },
//       { subCategories: new RegExp(searchQuery, 'i') },
//       { tags: new RegExp(searchQuery, 'i') }
//     ]
//   };

//   if (deliveryTime !== 'undefined') {
//     query.expectedDelivery = new RegExp(deliveryTime, 'i');
//   }

//   if (!isNaN(min!) && !isNaN(max!)) {
//     query.price = { $gte: min, $lte: max };
//   }

//   const sortDirection = type === 'forward' ? 1 : -1;

//   const gigs = await SellerGigModel.find(query)
//     .sort({ sortId: sortDirection, _id: sortDirection }) // _id for tie-breaker
//     .skip(Number(from))
//     .limit(size)
//     .lean(); // returns ISellerGig[]

//   const total = await SellerGigModel.countDocuments(query);

//   return {
//     total,
//     hits: gigs
//   };
// }









// interface ISearchResult {
//   total: number;
//   hits: any;
// }

// interface IQueryList {
//   query_string?: any;
//   range?: any;
//   term?: any;
// }

// export async function gigById(index: string, gigId: string): Promise<ISellerGig> {
//   const gig: ISellerGig = await getDocumentById(index, gigId);
//   return gig;
// }

// export async function gigsSearch(
//   searchQuery: string,
//   paginate: IPaginateProps,
//   deliveryTime?: string,
//   min?: number,
//   max?: number
// ): Promise<ISearchResult> {
//   const { from, size, type } = paginate;
//   const queryList: IQueryList[] = [
//     {
//       query_string: {
//         fields: ['username', 'title', 'description', 'basicDescription', 'basicTitle', 'categories', 'subCategories', 'tags'],
//         query: `*${searchQuery}*`
//       }
//     },
//     {
//       term: {
//         active: true
//       }
//     }
//   ];

//   if (deliveryTime !== 'undefined') {
//     queryList.push({
//       query_string: {
//         fields: ['expectedDelivery'],
//         query: `*${deliveryTime}*`
//       }
//     });
//   }

//   if (!isNaN(parseInt(`${min}`)) && !isNaN(parseInt(`${max}`))) {
//     queryList.push({
//       range: {
//         price: {
//           gte: min,
//           lte: max
//         }
//       }
//     });
//   }
//   const result: SearchResponse = await elasticSearchClient.search({
//     index: 'gigs',
//     size,
//     query: {
//       bool: {
//         must: [...queryList]
//       }
//     },
//     sort: [
//       {
//         sortId: type === 'forward' ? 'asc' : 'desc'
//       }
//     ],
//     ...(from !== '0' && { search_after: [from] })
//   });
//   const total: IHitsTotal = result.hits.total as IHitsTotal;
//   return {
//     total: total.value,
//     hits: result.hits.hits
//   };
// }
