export function getOfferDetailPipeline(favoriteOffers: string[] | undefined) {
  return [
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'authorId',
      },
    },
    {
      $unwind: {
        path: '$authorId',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'offerId',
        as: 'comments',
      },
    },
    {
      $addFields: {
        rating: {
          $round:[{
            $divide: [
              {
                $reduce: {
                  input: '$comments',
                  initialValue: 0,
                  in: { $add: ['$$value', '$$this.rating'] },
                },
              },
              {
                $cond: {
                  if: { $ne: [{ $size: '$comments' }, 0] },
                  then: { $size: '$comments' },
                  else: 1,
                },
              },
            ],
          }, 1]},
        commentsCount: { $size: '$comments' },
        id: { $toString: '$_id' },
        isFavorite: {
          $cond: {
            if: { $in: [{$toString: '$_id'}, favoriteOffers ?? []] },
            then: true,
            else: false,
          },
        },
      },
    },
    { $unset: 'comments' },
  ];
}
