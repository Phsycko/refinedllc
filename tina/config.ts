import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "company",
        label: "Company Information",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Company Name",
            required: true,
          },
          {
            type: "string",
            name: "slogan",
            label: "Slogan",
            required: true,
          },
          {
            type: "number",
            name: "founded",
            label: "Founded Year",
          },
          {
            type: "string",
            name: "description",
            label: "Description (Spanish)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "mission",
            label: "Mission",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Information",
            fields: [
              {
                type: "string",
                name: "phone",
                label: "Phone",
              },
              {
                type: "string",
                name: "email",
                label: "Email",
              },
              {
                type: "string",
                name: "address",
                label: "Address",
              },
              {
                type: "string",
                name: "hours",
                label: "Business Hours",
              },
            ],
          },
          {
            type: "object",
            name: "social",
            label: "Social Media",
            fields: [
              {
                type: "string",
                name: "facebook",
                label: "Facebook URL",
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL",
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL",
              },
              {
                type: "string",
                name: "twitter",
                label: "Twitter URL",
              },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Statistics",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "value",
                label: "Value",
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
              },
            ],
          },
          {
            type: "object",
            name: "values",
            label: "Company Values",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "number",
            name: "id",
            label: "ID",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title (Spanish)",
            required: true,
          },
          {
            type: "string",
            name: "title_en",
            label: "Title (English)",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category (Spanish)",
          },
          {
            type: "string",
            name: "category_en",
            label: "Category (English)",
          },
          {
            type: "string",
            name: "location",
            label: "Location (Spanish)",
          },
          {
            type: "string",
            name: "location_en",
            label: "Location (English)",
          },
          {
            type: "number",
            name: "year",
            label: "Year",
          },
          {
            type: "string",
            name: "area",
            label: "Area",
          },
          {
            type: "string",
            name: "description",
            label: "Short Description (Spanish)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "description_en",
            label: "Short Description (English)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "fullDescription",
            label: "Full Description (Spanish)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project",
          },
          {
            type: "image",
            name: "mainImage",
            label: "Main Image",
          },
          {
            type: "image",
            name: "beforeImages",
            label: "Before Images",
            list: true,
          },
          {
            type: "image",
            name: "gallery",
            label: "Gallery Images",
            list: true,
          },
          {
            type: "string",
            name: "services",
            label: "Services",
            list: true,
          },
          {
            type: "string",
            name: "highlights",
            label: "Highlights (Spanish)",
            list: true,
          },
          {
            type: "string",
            name: "highlights_en",
            label: "Highlights (English)",
            list: true,
          },
        ],
      },
      {
        name: "services",
        label: "Services",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "number",
            name: "id",
            label: "ID",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title (Spanish)",
            required: true,
          },
          {
            type: "string",
            name: "title_en",
            label: "Title (English)",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category (Spanish)",
          },
          {
            type: "string",
            name: "category_en",
            label: "Category (English)",
          },
          {
            type: "string",
            name: "description",
            label: "Short Description (Spanish)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "description_en",
            label: "Short Description (English)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "fullDescription",
            label: "Full Description (Spanish)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "fullDescription_en",
            label: "Full Description (English)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Main Image",
          },
          {
            type: "image",
            name: "gallery",
            label: "Gallery Images",
            list: true,
          },
          {
            type: "string",
            name: "features",
            label: "Features (Spanish)",
            list: true,
          },
          {
            type: "string",
            name: "features_en",
            label: "Features (English)",
            list: true,
          },
          {
            type: "string",
            name: "price",
            label: "Price (Spanish)",
          },
          {
            type: "string",
            name: "price_en",
            label: "Price (English)",
          },
        ],
      },
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "number",
            name: "id",
            label: "ID",
          },
          {
            type: "string",
            name: "name",
            label: "Client Name",
            required: true,
          },
          {
            type: "string",
            name: "project",
            label: "Project",
          },
          {
            type: "string",
            name: "quote",
            label: "Quote (Spanish)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "quote_en",
            label: "Quote (English)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Photo",
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1-5)",
          },
        ],
      },
    ],
  },
});


