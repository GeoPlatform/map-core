/**
 * Fetches style information from GeoPlatform UAL
 * @param  id - identifier of layer to resolve style for
 */
declare function featureStyleResolver(id: string): Promise<any>;
export default featureStyleResolver;
