import { client } from '@gig/redis/redis.connection';

const getUserSelectedGigCategory = async (key: string): Promise<string> => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
    const response: string = (await client.GET(key)) as string;
    return response;
  } catch (error) {
    console.log('error', 'GigService GigCache getUserSelectedGigCategory() method error:', error);
    return '';
  }
};

export { getUserSelectedGigCategory };
