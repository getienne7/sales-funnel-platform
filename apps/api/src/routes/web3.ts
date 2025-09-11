import { FastifyPluginAsync } from 'fastify';
const web3Routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/networks', async () => {
    return { networks: ['ethereum', 'polygon', 'bsc'] };
  });
};
export default web3Routes;
