import { gigsSearch } from '@gig/services/search.service';
import { IPaginateProps, ISellerGig } from '@fvoid/shared-lib';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sortBy } from 'lodash';
import { GigModel } from '@gig/models/gig.schema';

async function getGigById(gigId: string): Promise<ISellerGig | null> {
  const gig = await GigModel.findById(gigId).lean(); // or remove .lean() for full Mongoose doc
  return gig;
}

async function singleGigById(req: Request, res: Response): Promise<void> {
  const gig = await getGigById(req.params.gigId);
  res.status(StatusCodes.OK).json({ message: 'Signle gig result', gig });
}

const gigs = async (req: Request, res: Response): Promise<void> => {
  const { from, size, type } = req.params;

  const paginate: IPaginateProps = {
    from,
    size: parseInt(`${size}`, 10),
    type
  };

  const gigsResult = await gigsSearch(
    `${req.query.query}`,
    paginate,
    req.query.delivery_time as string,
    parseInt(`${req.query.minprice}`, 10),
    parseInt(`${req.query.maxprice}`, 10)
  );

  let resultHits: ISellerGig[] = gigsResult.hits;

  if (type === 'backward') {
    resultHits = sortBy(resultHits, ['sortId']);
  }

  res.status(StatusCodes.OK).json({
    message: 'Search gigs results',
    total: gigsResult.total,
    gigs: resultHits
  });
};

export { gigs, singleGigById };
