import { DRIZZLE, throwGrpcError, tryit } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from 'apps/gig/drizzle/drizzle';
import { GigsTable } from 'apps/gig/src/schemas';
import { and, ilike, or, count, gte, lte, eq } from 'drizzle-orm';

@Injectable()
export class GigService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async search(data: any) {
    let { minPrice, maxPrice, deliveryTime, category, searchKey, page, limit } =
      data;

    const conditions: any[] = [];

    // Convert string query params to numbers where expected
    const parsedMinPrice =
      typeof minPrice === 'string' ? parseInt(minPrice) : undefined;
    const parsedMaxPrice =
      typeof maxPrice === 'string' ? parseInt(maxPrice) : undefined;

    // Pagination parameters
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : 1;
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : 10;
    const offset = (parsedPage - 1) * parsedLimit;

    if (parsedMinPrice !== undefined && !isNaN(parsedMinPrice)) {
      conditions.push(gte(GigsTable.price, parsedMinPrice));
    }

    if (parsedMaxPrice !== undefined && !isNaN(parsedMaxPrice)) {
      conditions.push(lte(GigsTable.price, parsedMaxPrice));
    }

    if (typeof deliveryTime === 'string' && deliveryTime.length > 0) {
      conditions.push(eq(GigsTable.expectedDelivery, deliveryTime as string));
    }

    if (typeof category === 'string' && category.length > 0) {
      conditions.push(eq(GigsTable.category, category));
    }

    if (typeof searchKey === 'string' && searchKey.length > 0) {
      conditions.push(
        or(
          ilike(GigsTable.category, `%${searchKey}%`),
          ilike(GigsTable.title, `%${searchKey}%`),
          ilike(GigsTable.description, `%${searchKey}%`),
        ),
      );
    }

    // Define the 'where' clause once
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // 1. Get total count of matching gigs (applying the same 'where' clause)
    const [totalCountResult] = await this.db
      .select({ count: count(GigsTable.id) })
      .from(GigsTable)
      .where(whereClause); // Apply the 'where' clause here

    const totalCount = totalCountResult?.count || 0;

    // 2. Get paginated gigs (applying the same 'where' clause, then limit and offset)
    const gigs = await this.db
      .select()
      .from(GigsTable)
      .where(whereClause) // Apply the 'where' clause here
      .limit(parsedLimit)
      .offset(offset)
      // It's good practice to add an orderBy clause for consistent pagination
      // If no natural order, order by primary key (e.g., id)
      .orderBy(GigsTable.id);

    return {
      data: gigs,
      totalCount: Number(totalCount), // Ensure totalCount is a number
      currentPage: parsedPage,
      limit: parsedLimit,
    };
  }
  async findById(data: any) {
    const [gig, gigErr] = await tryit(
      this.db.query.GigsTable.findFirst({
        where: eq(GigsTable.id, data.id),
      }),
    );

    if (gigErr) return throwGrpcError('INTERNAL', gigErr.message);
    if (!gig) return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return gig;
  }
  async sellerGigs(data: any) {
    const filters = [eq(GigsTable.sellerId, data.sellerId)];

    if (data.activeGigs)
      filters.push(eq(GigsTable.active, data.activeGigs === 'true'));

    const conditions = and(...filters);

    const [gigs, gigsErr] = await tryit(
      this.db.query.GigsTable.findMany({
        where: conditions,
      }),
    );

    if (gigsErr) return throwGrpcError('INTERNAL', gigsErr.message);
    if (!gigs.length) return throwGrpcError('NOT_FOUND', 'No Gigs Available');

    return gigs;
  }
  async create(formData: any) {
    const [newGig, newGigErr] = await tryit(
      this.db.insert(GigsTable).values(formData).returning(),
    );

    if (newGigErr) return throwGrpcError('INTERNAL', newGigErr.message);

    return newGig;
  }
  async update(data: any) {
    const [newGig, newGigErr] = await tryit(
      this.db
        .update(GigsTable)
        .set(data)
        .where(eq(GigsTable.id, data.id))
        .returning(),
    );

    if (newGigErr) return throwGrpcError('INTERNAL', newGigErr.message);

    return newGig;
  }
  async seedGigs(data: any) {
    const { count = '10' } = data;

    const total = parseInt(count);

    // todo: we publish an event here

    // new GetSellersPublisher(mqWrapper.channel).publish({
    //   count: total,
    // });

    return { message: 'Gigs created successfully' };
  }
}
