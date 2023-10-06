import { Collection } from '@prisma/client';

type Props = {
    pageCount: number;
    collection: Collection[]
}

const CollectionItems = ({ collection, pageCount }: Props) => {
    console.log(collection)
  return (
    <div>collectionItems</div>
  )
}

export default CollectionItems