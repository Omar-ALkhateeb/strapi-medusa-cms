import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCategoryList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_category_lists';
  info: {
    displayName: 'CategoryList';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCollectionBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_collection_banners';
  info: {
    displayName: 'CollectionBanner';
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    collection: Schema.Attribute.Relation<
      'oneToOne',
      'api::collection.collection'
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCollectionStandard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_collection_standards';
  info: {
    displayName: 'CollectionStandard';
  };
  attributes: {
    collection: Schema.Attribute.Relation<
      'oneToOne',
      'api::collection.collection'
    >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.category-list': BlocksCategoryList;
      'blocks.collection-banner': BlocksCollectionBanner;
      'blocks.collection-standard': BlocksCollectionStandard;
    }
  }
}
