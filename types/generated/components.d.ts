import type { Schema, Struct } from '@strapi/strapi';

export interface HomePageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    section: Schema.Attribute.Component<'shared.section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageRecomendationSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_recomendation_sections';
  info: {
    displayName: 'Recomendation Section';
    icon: 'bold';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    section: Schema.Attribute.Component<'shared.section', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    socialMedia: Schema.Attribute.Component<'shared.social-media', true>;
  };
}

export interface SharedSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_medias';
  info: {
    displayName: 'Social Media';
  };
  attributes: {
    media: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'Telegram', 'X', 'Linkedin', 'YouTube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home-page.hero-section': HomePageHeroSection;
      'home-page.recomendation-section': HomePageRecomendationSection;
      'shared.footer': SharedFooter;
      'shared.section': SharedSection;
      'shared.social-media': SharedSocialMedia;
    }
  }
}
