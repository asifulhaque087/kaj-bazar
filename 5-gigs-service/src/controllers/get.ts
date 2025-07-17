import { getUserSelectedGigCategory } from '@gig/redis/gig.cache';
import { getGigById, getSellerGigs, getSellerPausedGigs } from '@gig/services/gig.service';
import { getMoreGigsLikeThis, getTopRatedGigsByCategory, gigsSearchByCategory } from '@gig/services/search.service';
import { ISellerGig, ISearchResult } from '@fvoid/shared-lib';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// interface ISearchResultNew extends ISearchResult {
//   hits: any;
// }

// interface ISearchResult {
//   total: number;
//   hits: any;
// }

const gigById = async (req: Request, res: Response): Promise<void> => {
  console.log('hello from gig service');

  res.status(StatusCodes.OK).json({ message: 'Get gig by id' });

  return;

  const gig: ISellerGig | null = await getGigById(req.params.gigId);
  res.status(StatusCodes.OK).json({ message: 'Get gig by id', gig });
};

const sellerGigs = async (req: Request, res: Response): Promise<void> => {
  const gigs: ISellerGig[] = await getSellerGigs(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller gigs', gigs });
};

const sellerInactiveGigs = async (req: Request, res: Response): Promise<void> => {
  const gigs: ISellerGig[] = await getSellerPausedGigs(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller gigs', gigs });
};

const topRatedGigsByCategory = async (req: Request, res: Response): Promise<void> => {
  const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
  const gigs: ISearchResult = await getTopRatedGigsByCategory(`${category}`);

  let resultHits: ISellerGig[] = gigs.hits;

  res.status(StatusCodes.OK).json({ message: 'Search top gigs results', total: gigs.total, gigs: resultHits });
};

const gigsByCategory = async (req: Request, res: Response): Promise<void> => {
  const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
  const gigs: ISearchResult = await gigsSearchByCategory(`${category}`);

  let resultHits: ISellerGig[] = gigs.hits;

  res.status(StatusCodes.OK).json({ message: 'Search gigs category results', total: gigs.total, gigs: resultHits });
};

const moreLikeThis = async (req: Request, res: Response): Promise<void> => {
  const gigs: ISearchResult = await getMoreGigsLikeThis(req.params.gigId);

  let resultHits: ISellerGig[] = gigs.hits;

  res.status(StatusCodes.OK).json({ message: 'More gigs like this result', total: gigs.total, gigs: resultHits });
};

export { gigById, sellerGigs, sellerInactiveGigs, topRatedGigsByCategory, gigsByCategory, moreLikeThis };
