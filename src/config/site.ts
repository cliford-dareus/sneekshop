import { ProductCategories } from "./products";

export type SiteConfig = typeof siteConfig;

interface navItemProp {
  title: string;
  href?: string;
  desciption?: string;
}

export interface NavItem extends navItemProp {
  items?: NavItem[];
}

export type MainNavItem = NavItem;

export const siteConfig = {
  title: "sneekshop",
  description: "",
  mainNav: [
    {
      title: "shop",
      items: [
        {
          title: "Products",
          href: "/products",
          desciption: "",
          items: [],
        },
        {
          title: "Collections",
          href: "/collections",
          desciption: "",
          items: [],
        },
        {
          title: "Sales",
          href: "/slales",
          desciption: "",
          items: [],
        },
      ],
    },
    ...ProductCategories.map((category) => ({
      title: category.category,
      items: [
        {
          title: "All",
          href: `/categories/${category.category.toLowerCase()}`,
          description: `All ${category.category}.`,
          items: [],
        },
        ...category.subCategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categories/${category.category.toLowerCase()}/${
            subcategory.slug
          }`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainNavItem[],
};
