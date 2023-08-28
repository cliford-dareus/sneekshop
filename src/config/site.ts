export type SiteConfig = typeof siteConfig;

interface navItemProp {
  title: string;
  href?: string;
  desciption?: string;
}

interface NavItem extends navItemProp {
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
          title: "Clothing",
          href: "/clothing",
          desciption: "",
          items: [],
        },
        {
          title: "accessories",
          href: "/accessories",
          desciption: "",
          items: [],
        },
        {
          title: "sneakers",
          href: "/sneakers",
          desciption: "",
          items: [],
        },
      ],
    },
    {
      title: "clothings",
      items: [
        {
          title: "Top",
          href: "/clothing",
          desciption: "",
          items: [],
        },
        {
          title: "Bottom",
          href: "/clothing",
          desciption: "",
          items: [],
        },
        {
          title: "Jeans",
          href: "/clothing",
          desciption: "",
          items: [],
        },
      ],
    },
    {
      title: "shoes",
      items: [
        {
          title: "Clothing",
          href: "/clothing",
          desciption: "",
          items: [],
        },
      ],
    },
    {
      title: "accessories",
      items: [
        {
          title: "Clothing",
          href: "/clothing",
          desciption: "",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
};
