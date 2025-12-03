import type { Schema, Struct } from '@strapi/strapi';

export interface HomePageItemBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_item_benefit_items';
  info: {
    displayName: 'Benefit Item';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.Required;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
  };
}

export interface HomePageItemCollection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_item_collections';
  info: {
    displayName: 'Collection';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageItemFeaturedCategoryItem
  extends Struct.ComponentSchema {
  collectionName: 'components_home_page_item_featured_category_items';
  info: {
    displayName: 'Featured Category Item';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomePageItemSubHeroCategory extends Struct.ComponentSchema {
  collectionName: 'components_home_page_item_sub_hero_categories';
  info: {
    displayName: 'Sub Hero Category';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface HomePageBenefitSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_benefit_sections';
  info: {
    displayName: 'Benefit Section';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'shared.cta-button', false> &
      Schema.Attribute.Required;
    items: Schema.Attribute.Component<'home-page-item.benefit-item', true> &
      Schema.Attribute.Required;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageBestSellerSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_best_seller_sections';
  info: {
    displayName: 'Best Seller Section';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageBundleSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_bundle_sections';
  info: {
    displayName: 'Bundle Section';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageCollectionSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_collection_sections';
  info: {
    displayName: 'Collection Section';
  };
  attributes: {
    collections: Schema.Attribute.Component<'home-page-item.collection', true> &
      Schema.Attribute.Required;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_faq_sections';
  info: {
    displayName: 'FAQ Section';
  };
  attributes: {
    questions: Schema.Attribute.Component<'shared.accordion', true> &
      Schema.Attribute.Required;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageFeaturedCategorySection
  extends Struct.ComponentSchema {
  collectionName: 'components_home_page_featured_category_sections';
  info: {
    displayName: 'Featured Category Section';
  };
  attributes: {
    categories: Schema.Attribute.Component<
      'home-page-item.featured-category-item',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface HomePageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    background: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    runningText: Schema.Attribute.Text;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageLatestTrendSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_latest_trend_sections';
  info: {
    displayName: 'Latest Trend Section';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'shared.cta-button', false>;
    leftImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    rightImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePagePhilosophySection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_philosophy_sections';
  info: {
    displayName: 'Philosophy Section';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomePageRecommendationSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_recommendation_sections';
  info: {
    displayName: 'Recommendation Section';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageReviewSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_review_sections';
  info: {
    displayName: 'Review Section';
  };
  attributes: {
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageSubHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_sub_hero_sections';
  info: {
    displayName: 'Sub Hero Section';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    items: Schema.Attribute.Component<
      'home-page-item.sub-hero-category',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface HomePageTrendingProductSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_trending_product_sections';
  info: {
    displayName: 'Trending Product Section';
    icon: 'check';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface HomePageTrendingStyleSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_trending_style_sections';
  info: {
    displayName: 'Trending Style Section';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'shared.cta-button', false> &
      Schema.Attribute.Required;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    section: Schema.Attribute.Component<'shared.base-section', false> &
      Schema.Attribute.Required;
  };
}

export interface OrderOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_order_order_items';
  info: {
    displayName: 'Order Item';
  };
  attributes: {
    count: Schema.Attribute.Integer;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
  };
}

export interface SharedAccordion extends Struct.ComponentSchema {
  collectionName: 'components_shared_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBaseSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_base_sections';
  info: {
    displayName: 'Base Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    displayName: 'CTA Button';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    navigationGroups: Schema.Attribute.Component<
      'shared.navigation-group',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
    runningText: Schema.Attribute.Component<'shared.running-text', false>;
    socialMedia: Schema.Attribute.Component<'shared.social-media', true>;
  };
}

export interface SharedNavbar extends Struct.ComponentSchema {
  collectionName: 'components_shared_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    navigations: Schema.Attribute.Component<'shared.navigation', true> &
      Schema.Attribute.Required;
  };
}

export interface SharedNavigation extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigations';
  info: {
    displayName: 'Navigation';
    icon: 'bold';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavigationGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_groups';
  info: {
    displayName: 'Navigation Group';
  };
  attributes: {
    navigations: Schema.Attribute.Component<'shared.navigation', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedRunningText extends Struct.ComponentSchema {
  collectionName: 'components_shared_running_texts';
  info: {
    displayName: 'Running Text';
  };
  attributes: {
    firstText: Schema.Attribute.Text & Schema.Attribute.Required;
    secondText: Schema.Attribute.Text;
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
      'home-page-item.benefit-item': HomePageItemBenefitItem;
      'home-page-item.collection': HomePageItemCollection;
      'home-page-item.featured-category-item': HomePageItemFeaturedCategoryItem;
      'home-page-item.sub-hero-category': HomePageItemSubHeroCategory;
      'home-page.benefit-section': HomePageBenefitSection;
      'home-page.best-seller-section': HomePageBestSellerSection;
      'home-page.bundle-section': HomePageBundleSection;
      'home-page.collection-section': HomePageCollectionSection;
      'home-page.faq-section': HomePageFaqSection;
      'home-page.featured-category-section': HomePageFeaturedCategorySection;
      'home-page.hero-section': HomePageHeroSection;
      'home-page.latest-trend-section': HomePageLatestTrendSection;
      'home-page.philosophy-section': HomePagePhilosophySection;
      'home-page.recommendation-section': HomePageRecommendationSection;
      'home-page.review-section': HomePageReviewSection;
      'home-page.sub-hero-section': HomePageSubHeroSection;
      'home-page.trending-product-section': HomePageTrendingProductSection;
      'home-page.trending-style-section': HomePageTrendingStyleSection;
      'order.order-item': OrderOrderItem;
      'shared.accordion': SharedAccordion;
      'shared.base-section': SharedBaseSection;
      'shared.cta-button': SharedCtaButton;
      'shared.footer': SharedFooter;
      'shared.navbar': SharedNavbar;
      'shared.navigation': SharedNavigation;
      'shared.navigation-group': SharedNavigationGroup;
      'shared.running-text': SharedRunningText;
      'shared.social-media': SharedSocialMedia;
    }
  }
}
