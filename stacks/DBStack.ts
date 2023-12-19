import { StackContext, Table } from 'sst/constructs';

export default function DB({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, 'DEV_REVIEWS', {
    fields: {
      _pk: 'string',
      _sk: 'string',
    },
    primaryIndex: { partitionKey: '_pk', sortKey: '_sk' },
  });

  return { table };
}
